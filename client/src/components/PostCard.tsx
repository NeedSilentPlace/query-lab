import Link from "next/link";
import { styled } from "@styles";
import Image from "next/image";

type PostCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  to: string;
};

function PostCard({ id, title, description, thumbnail, to }: PostCardProps) {
  return (
    <Link href={to} passHref>
      <Block>
        <div className="thumbnail">
          <Image
            src={thumbnail}
            width={614}
            height={614}
            objectFit="cover"
            alt={`${title}-thumbnail`}
          />
        </div>
        <div className="info">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
      </Block>
    </Link>
  );
}

const Block = styled("div", {
  display: "block",
  border: "1px solid $grey200",
  wordBreak: "break-all",
  marginTop: "16px",
  cursor: "pointer",

  "& .info": {
    backgroundColor: "$white",
    display: "grid",
    gap: "8px",
    padding: "16px",
  },
  "& .title": {
    fontWeight: 600,
    fontSize: "14px",
  },
  "& .description": {
    fontWeight: 400,
    fontSize: "14px",
  },
});

export default PostCard;
