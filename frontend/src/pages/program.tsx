import { Heading } from "@/components";
import { Grid } from "@/components/Grid";
import Layout from "@/components/Layout";
import { getProgram, ProgramInterface, ProgramsByDateInterface } from "@/services";
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
          program.map((item: ProgramsByDateInterface) => (
          <div key={item.id}>
            {item.programs?.length > 0 &&
            <li key={item.id}>
              <p className="text-2xl font-bold mb-3">{item.date}</p>
              {item.programs.map((item: ProgramInterface) => (
                  <div key={item.id}>
                    <div className="flex justify-start m-1 ml-2">
                      <p className="text-lg font-bold">{item.startTime}</p>
                      <p className="ml-6 text-lg">{item.name}</p>
                    </div>
                  </div>
                ))}
            </li>
            }
          </div>
          ))}
      </Grid>
    </Layout>
  );
};

export default Program;
