import { Heading, MapItem } from "@/components";
import { getMaps } from "@/services";
import Image from "next/image";
import { DownloadIcon } from "@/components/Map";
import Head from "next/head";
import Layout from "@/components/Layout";
import { clientEnv } from "@/env/schema.mjs";

type MapProps = {
  maps: any;
};

export async function getServerSideProps() {
  const maps = await getMaps();

  return {
    props: {
      maps,
    } as MapProps,
  };
}
const Map = ({ maps }: MapProps) => {
  return (
    <Layout>
      <Head>
        <title>Map - WeAssist</title>
      </Head>
      <Heading>Map</Heading>
      {maps.length > 0 &&
        maps.map((mapitem) => (
          <MapItem key={mapitem.id}>
            <div className="flex flex-row justify-between">
              <p className="text-2xl">{mapitem.attributes.name}</p>
              {mapitem.attributes.pdf_url && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    process.env.STRAPI_ENDPOINT_URL +
                    mapitem.attributes.pdf_url.data.attributes.url
                  }
                >
                  <DownloadIcon />
                </a>
              )}
            </div>
            {mapitem.attributes.image_url && (
              <div className="mt-4">
                <Image
                  src={
                    clientEnv.NEXT_PUBLIC_STRAPI_ENDPOINT_URL +
                    mapitem.attributes.image_url.data.attributes.url
                  }
                  alt={mapitem.attributes.image_url.data.attributes.name}
                  width={800}
                  height={380}
                />
              </div>
            )}
            {mapitem.attributes.map_links.data.length > 0 && (
              <div className="mt-8 flex w-full flex-col justify-start px-2 text-lg">
                {mapitem.attributes.map_links.data.map((maplink) => (
                  <div key={maplink.id}>
                    {maplink.attributes.location}{" "}
                    <a
                      href={maplink.attributes.name_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-1"
                    >
                      {maplink.attributes.name}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </MapItem>
        ))}
    </Layout>
  );
};

export default Map;
