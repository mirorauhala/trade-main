import { Heading } from "@/components";
import ExhPage from "@/components/Exhibitors/ExhPage";
import Layout from "@/components/Layout";
import { getExhibitors } from "@/services";
import Head from "next/head";

type ExhibitorsProps = {
  exhibitors: any;
};

export async function getServerSideProps() {
  const exhibitors = await getExhibitors();
  exhibitors.sort((a, b) => {
    return a.attributes.name.localeCompare(b.attributes.name);
  });

  return {
    props: {
      exhibitors,
    } as ExhibitorsProps,
  };
}

const Exhibitors = ({ exhibitors }: ExhibitorsProps) => {
  return (
    <Layout>
      <Head>
        <title>Aussteller - WeAssist</title>
      </Head>
      <Heading>Aussteller</Heading>
      <ExhPage exhibitors={exhibitors} />
    </Layout>
  );
};

export default Exhibitors;
