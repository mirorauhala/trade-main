"use client";

import Image from "next/image";
import Heart from "@/components/Heart";
import SearchBar from "@/components/SearchBar";
import SortBar from "@/components/SortBar";
import logo from "@/images/1x1logo.png";
import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks";
import { env } from "@/env/client.mjs";

interface ExhibitorsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exhibitors: any[];
}

const ExhPage = (props: ExhibitorsProps) => {
  const { exhibitors } = props;
  const [showFavourites, setShowFavourites] = useState(false);
  const [query, setQuery] = useState("");
  const [orderType, setOrderType] = useState<"alphabet" | "industry">(
    "alphabet"
  );
  const [liked, setLiked] = useLocalStorage<number[]>("liked", []);

  const handleLiked = (isChecked: boolean, value: number | undefined) => {
    if (!value) return;

    if (isChecked) {
      setLiked((prev) => prev.filter((item) => item !== value));
    } else {
      setLiked((prev) => [...prev, value]);
    }
  };

  const queriedExhibitors = useMemo(() => {
    return exhibitors.filter((exhibitor) => {
      return (
        exhibitor.attributes.name.toLowerCase().includes(query.toLowerCase()) ||
        (exhibitor.attributes.industry_type &&
          exhibitor.attributes.industry_type
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (exhibitor.attributes.location &&
          exhibitor.attributes.location
            .toLowerCase()
            .includes(query.toLowerCase()))
      );
    });
  }, [exhibitors, query]);

  const filteredExhibitors = useMemo(() => {
    if (showFavourites) {
      return queriedExhibitors.filter((item) => liked.includes(item.id));
    }

    return queriedExhibitors;
  }, [showFavourites, queriedExhibitors, liked]);

  const orderedExhibitors = useMemo(() => {
    let tempArray = filteredExhibitors;
    if (orderType === "alphabet") {
      tempArray = filteredExhibitors.sort((a, b) => {
        if (a.attributes.name > b.attributes.name) {
          return 1;
        }
        if (a.attributes.name < b.attributes.name) {
          return -1;
        }

        return 0;
      });
    } else if (orderType === "industry") {
      tempArray = filteredExhibitors.sort((a, b) => {
        if (a.attributes.industry_type < b.attributes.industry_type) {
          return -1;
        }
        if (a.attributes.industry_type > b.attributes.industry_type) {
          return 1;
        }

        return 0;
      });
    }
    return tempArray;
  }, [orderType, filteredExhibitors]);

  return (
    <>
      <div className="flex w-auto flex-row justify-between">
        <div className="w-1/2">
          <SearchBar handleChange={(value) => setQuery(value)} />
        </div>
        <div className="w-1/2">
          <SortBar onSort={(type) => setOrderType(type)} />
        </div>
      </div>

      <button
        className="flex w-full flex-row justify-center gap-1 py-2 text-center"
        onClick={() => setShowFavourites(!showFavourites)}
      >
        Meine Favoriten anzeigen
        <Heart isChecked={showFavourites} />
      </button>

      <div className="min-w-min">
        {orderedExhibitors &&
          orderedExhibitors.map((exhibitor) => {
            return (
              <div key={exhibitor.id} className="flex flex-row">
                <div className="m-2 min-w-[80px]">
                  <Image
                    src={
                      exhibitor.attributes?.logo?.data?.attributes?.url
                        ? env.NEXT_PUBLIC_STRAPI_ENDPOINT_URL +
                          exhibitor.attributes.logo.data.attributes.url
                        : logo
                    }
                    alt=""
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-xl border-2 border-black object-cover"
                  />
                </div>

                <div className="m-2 flex-1">
                  <div className="flex flex-row justify-between">
                    <a
                      className="underline"
                      href={exhibitor.attributes?.exhibitor_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {exhibitor.attributes.name}
                    </a>
                    <button
                      onClick={() => {
                        handleLiked(
                          !!liked.find((id) => id === exhibitor.id),
                          exhibitor.id
                        );
                      }}
                    >
                      <Heart
                        isChecked={!!liked.find((id) => id === exhibitor.id)}
                      />
                    </button>
                  </div>

                  {exhibitor.attributes?.industry_type && (
                    <p>#{exhibitor.attributes.industry_type}</p>
                  )}

                  {exhibitor.attributes?.location && (
                    <p className=" mr-2 inline-flex">
                      Standort: {exhibitor.attributes.location}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ExhPage;
