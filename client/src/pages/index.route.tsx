import type { NextPage } from "next";
import Head from "next/head";
import { Button, Header, Container } from "@unit";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const routes = ["/query", "/pagination", "/mutation"];

  return (
    <div>
      <Head>
        <title>Query.Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Query Lab" />
      <main>
        <Container>
          {routes.map((route) => (
            <Button
              outline
              css={{ marginTop: "16px" }}
              key={route}
              onClick={() => router.push(route)}
            >
              {route}
            </Button>
          ))}
        </Container>
      </main>
    </div>
  );
};

export default Home;
