import type { NextPage } from "next";
import client from "@client";
import { Header, Container } from "@unit";
import { getSdkWithHooks } from "./__generated__/books.generated";
import BookCard from "@components/BookCard";
import { useRouter } from "next/router";

const Query: NextPage = () => {
  const router = useRouter();
  const { data, error } = getSdkWithHooks(client).useBooks({
    input: { offset: 0, limit: 20 },
  });

  if (!data) return <div>loading...</div>;
  return (
    <>
      <Header title="Query" back />
      <Container>
        {data.books.map((book, i) => (
          <div
            key={book.id}
            onClick={() => router.push(`/swr/query/${book.id}`)}
          >
            <BookCard key={book.id} {...book} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default Query;
