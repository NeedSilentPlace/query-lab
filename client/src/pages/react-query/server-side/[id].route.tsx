import type { NextPage, GetServerSideProps } from "next";
import { Container, Header, Button } from "@unit";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import { styled } from "@styles";
import client from "@client";
import {
  usePostDetailQuery,
  PostDetailQueryResponse,
} from "./__generated__/post.generated";
import { useRouter } from "next/router";
import Image from "next/image";

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

const DetailPage: NextPage = () => {
  const router = useRouter();
  const { data } = usePostDetailQuery(
    client,
    { postId: router.query.id as string },
    { enabled: false }
  );
  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData(
  //   usePostDetailQuery.getKey({ postId: router.query.id as string })
  // ) as PostDetailQueryResponse;

  if (!data?.post) return null;

  const { id, title, thumbnail, description } = data.post;

  return (
    <>
      <Header title="Detail Page" back />
      <Container>
        <ImageWrapper>
          <Image
            src={thumbnail}
            width={1024}
            height={512}
            objectFit="cover"
            alt={`${title}-thumbnail`}
          />
        </ImageWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Button onClick={() => router.push(`/react-query/mutation/${id}`)}>
          편집
        </Button>
      </Container>
    </>
  );
};

const ImageWrapper = styled("div", {
  marginTop: "16px",
});
const Title = styled("h3", {
  fontWeight: 600,
  fontSize: "20px",
});
const Description = styled("p", {
  fontWeight: 400,
  fontSize: "16px",
});

export default DetailPage;
