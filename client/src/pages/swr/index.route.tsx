import type { NextPage } from "next";
import { Button, Header, Container } from "@unit";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const routes = ["query"];

  return (
    <div>
      <Header title="SWR" back />
      <main>
        <Container>
          {routes.map((route) => (
            <Button
              outline
              css={{ marginTop: "16px" }}
              key={route}
              onClick={() => router.push(`/swr/${route}`)}
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
