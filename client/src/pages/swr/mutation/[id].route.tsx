import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import client from "@client";
import { Header, Input, TextArea, Container, Button } from "@unit";
import { styled } from "@styles";
import { useState } from "react";
import { getSdkWithHooks, getSdk } from "./__generated__/book.generated";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { book } = await getSdk(client).Book({ bookId: id as string });

  return {
    props: {
      book,
    },
  };
};

const MutationPage: NextPage = ({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { UpdateBook } = getSdkWithHooks(client);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await UpdateBook({
        input: {
          ...book,
          title,
          description,
        },
      });
      alert("저장 성공!");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
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
