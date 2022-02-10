import type { GetServerSideProps, NextPage } from "next";
import client from "@client";
import { Header, Input, TextArea, Container, Button } from "@unit";
import {
  useUpdatePostMutation,
  usePostDetailQuery,
  PostDetailQueryResponse,
} from "./__generated__/post.generated";
import { useRouter } from "next/router";
import { styled } from "@styles";
import { useState } from "react";
import { dehydrate, QueryClient, useQueryClient } from "react-query";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const { getKey, fetcher } = usePostDetailQuery;

  await queryClient.prefetchQuery(
    getKey({ postId: id as string }),
    fetcher(client, { postId: id as string })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const MutationPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { post } = queryClient.getQueryData(
    usePostDetailQuery.getKey({ postId: router.query.id as string })
  ) as PostDetailQueryResponse;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");

  const { mutate, mutateAsync } = useUpdatePostMutation(client, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      alert("저장되었습니다!");
    },
    onError: () => {
      alert("error!");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async () => {
    mutate({
      input: {
        id: router.query.id as string,
        thumbnail: post?.thumbnail || "",
        title,
        description,
      },
    });
  };

  return (
    <>
      <Header title="mutate" back />
      <Container>
        <Label>Title</Label>
        <Input value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <Label>Description</Label>
        <TextArea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "저장중..." : "저장"}
        </Button>
      </Container>
    </>
  );
};

const Label = styled("div", {
  color: "$grey700",
  fontWeight: 700,
  margin: "16px 0",
});

export default MutationPage;
