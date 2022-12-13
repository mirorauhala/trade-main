import { Heading } from "@/components";
import Image from "next/image";
import logo from "@/images/1x1logo.png";
import Head from "next/head";
import Layout from "@/components/Layout";
import { env } from "@/env/client.mjs";

type FoodProps = {
  food: any;
};

export const getServerSideProps = async () => {
  const food = await (
    await fetch(`${process.env.STRAPI_ENDPOINT_URL}/api/foods?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    })
  ).json();

  return {
    props: {
      food,
    } as FoodProps,
  };
};

const Food = ({ food }: FoodProps) => {
  return (
    <Layout>
      <Head>
        <title>Verpflegung - WeAssist</title>
      </Head>
      <Heading>Verpflegung</Heading>
      {food.data.map((foodItem) => {
        return (
          <div key={foodItem.id} className="m-2 rounded-xl bg-gray-200 p-2">
            <div className="flex flex-row">
              <div className="m-2 min-w-[80px]">
                <Image
                  src={
                    foodItem.attributes?.restaurant_image?.data?.attributes?.url
                      ? env.NEXT_PUBLIC_STRAPI_ENDPOINT_URL +
                        foodItem.attributes.restaurant_image.data.attributes.url
                      : logo
                  }
                  alt="img"
                  className="h-20 w-20 rounded-xl border-2 border-black object-cover"
                />
              </div>
              <div className="m-2">
                <a
                  className="underline"
                  href={foodItem.attributes?.restaurantUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {foodItem.attributes.name}
                </a>
                {foodItem.attributes.location && (
                  <p>Standort: {foodItem.attributes.location}</p>
                )}
              </div>
            </div>
            <div className="mr-2 mb-2 ml-2">
              {foodItem.attributes.description && (
                <p className="break-words text-sm">
                  {foodItem.attributes.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default Food;
