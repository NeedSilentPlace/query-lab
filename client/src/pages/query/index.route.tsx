import type { NextPage } from "next";
import client from "@client";
import { Header, Container } from "@unit";
import { useBooksQuery } from "./__generated__/books.generated";
import Card from "./components/Card";

const Query: NextPage = () => {
  const { data, isLoading, error } = useBooksQuery(client, {
    input: { offset: 0, limit: 20 },
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Header title="Query" back />
      <Container>
        {data?.books?.map((book, i) => (
          <Card key={book.id} {...book} />
        ))}
      </Container>
    </>
  );
};

export default Query;
