import { Heading } from "@/components";
import Image from "next/image";
import logo from "@/images/logo.png";
import Head from "next/head";
import Layout from "@/components/Layout";

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
        <title>Food - WeAssist</title>
      </Head>
      <Heading>Food</Heading>
      <pre>
        {food.data.map((foodItem) => {
          return (
            <div key={foodItem.id} className="m-2 rounded-xl bg-gray-200 p-2">
              <div className="flex flex-row">
                <div className="m-2 min-w-[80px]">
                  <Image
                    src={
                      foodItem.attributes?.restaurant_image?.data?.attributes
                        ?.url
                        ? process.env.STRAPI_ENDPOINT_URL +
                          foodItem.attributes.restaurant_image.data.attributes
                            .url
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
                    <p>location: {foodItem.attributes.location}</p>
                  )}
                </div>
              </div>
              <div className=" mb-2 ml-2 mr-2">
                {foodItem.attributes.description && (
                  <p>{foodItem.attributes.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </pre>
    </Layout>
  );
};

export default Food;
