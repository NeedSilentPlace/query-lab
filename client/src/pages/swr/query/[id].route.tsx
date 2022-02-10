import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import client from "@client";
import { Header, Container, Button } from "@unit";
import { getSdkWithHooks, getSdk } from "./__generated__/books.generated";
import Image from "next/image";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { useRouter } from "next/router";
import { styled } from "@styles";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { book } = await getSdk(client).Book({ bookId: id as string });

  return {
    props: {
      fallback: {
        [unstable_serialize(["bookDetail", id])]: book,
      },
    },
  };
};

const DetailPage: NextPage = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Header title="Query" back />
      <Container>
        <Detail />
      </Container>
    </SWRConfig>
  );
};

const Detail = () => {
  const router = useRouter();
  const { data: book } = useSWR(["bookDetail", router.query.id]);

  if (!book) return <div>loading..</div>;
  const { id, title, description, thumbnail } = book;
  return (
    <>
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
      <Button onClick={() => router.push(`/swr/mutation/${id}`)}>EDIT</Button>
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
