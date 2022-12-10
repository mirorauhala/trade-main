import { Heading } from "@/components";
import { Grid } from "@/components/Grid";
import Layout from "@/components/Layout";
import { getProgram, type ProgramInterface } from "@/services";
import Head from "next/head";

type ProgramProps = {
  program: any;
};

export async function getServerSideProps() {
  const program = await getProgram();

  return {
    props: {
      program,
    } as ProgramProps,
  };
}

const Program = ({ program }: ProgramProps) => {
  return (
    <Layout>
      <Head>
        <title>Program - WeAssist</title>
      </Head>
      <Heading>Program</Heading>
      <Grid>
        {program.length > 0 &&
          program.map((item: ProgramInterface) => (
            <li key={item.id}>
              <div className="flex justify-start">
                <p className="text-lg font-bold">{item.startTime}</p>
                <p className="ml-6 text-lg">{item.name}</p>
              </div>
            </li>
          ))}
      </Grid>
    </Layout>
  );
};

export default Program;
