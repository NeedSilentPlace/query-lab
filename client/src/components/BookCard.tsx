import Link from "next/link";
import { styled } from "@styles";
import Image from "next/image";

type BookCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
};

function BookCard({
  id,
  title,
  description,
  thumbnail,
  author,
}: BookCardProps) {
  return (
    <Block>
      <Image
        src={thumbnail}
        width={160}
        height={160}
        layout="fixed"
        objectFit="cover"
        alt={`${title}-thumbnail`}
      />

      <div className="info">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <div className="author">{author}</div>
      </div>
    </Block>
  );
}

const Block = styled("div", {
  display: "flex",
  alignItems: "center",
  border: "1px solid $grey200",
  marginTop: "16px",
  cursor: "pointer",
  backgroundColor: "$white",
  "& .info": {
    flex: 1,
    display: "grid",
    gap: "8px",
    padding: "8px 16px",
    wordBreak: "break-all",
  },
  "& .title": {
    fontWeight: 600,
    fontSize: "16px",
  },
  "& .description": {
    fontWeight: 400,
    fontSize: "12px",
  },
  "& .author": {
    fontWeight: 400,
    fontSize: "12px",
  },
});

export default BookCard;
