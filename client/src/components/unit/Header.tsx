import { styled } from "@styles";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";

type HeaderProps = {
  title: string;
  back?: boolean;
};

function Header({ title, back }: HeaderProps) {
  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <Block>
      <div className="icon-wrapper">
        {back && (
          <FiChevronLeft size={"28px"} className="icon" onClick={handleBack} />
        )}
      </div>
      <div className="title">{title}</div>
      <div></div>
    </Block>
  );
}

const Block = styled("header", {
  display: "flex",
  alignItems: "center",
  backgroundColor: "$white",
  borderBottom: "1px solid $grey200",
  padding: "16px",
  "& .icon": {
    cursor: "pointer",
  },
  "& .title": {
    flex: 1,
    fontWeight: "700",
    fontSize: "20px",
    textAlign: "center",
  },
});

export default Header;
