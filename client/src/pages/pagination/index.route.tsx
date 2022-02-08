import type { NextPage } from "next";
import { Container, Header, Button } from "@unit";
import client from "../../lib/client";
import {
  usePostsQuery,
  useInfinitePostsQuery,
} from "./__generated__/posts.generated";
import Card from "./components/Card";

const Pagination: NextPage = () => {
  const { data, fetchNextPage, isLoading } = useInfinitePostsQuery(
    "input",
    client,
    { input: { offset: 0, limit: 5 } },
    {
      getNextPageParam: (lastPage, pages) => {
        const offset = pages.reduce((acc, cur) => acc + cur.posts.length, 0);
        return { input: { offset, limit: 5 } };
      },
    }
  );

  const posts = data?.pages.flatMap(({ posts }) => {
    return posts;
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Header title="Pagination" back />
      <Container>
        {posts?.map((post) => (
          <Card key={post.id} {...post} />
        ))}
        <Button css={{ marginTop: "16px" }} onClick={() => fetchNextPage()}>
          more
        </Button>
      </Container>
    </>
  );
};

export default Pagination;
