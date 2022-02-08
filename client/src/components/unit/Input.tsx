import { styled } from "@styles";

export default styled("input", {
  all: "unset",
  borderBottom: "1px solid $grey500",
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  color: "$grey500",
  boxSizing: "border-box",
  "&::placeholder": {
    color: "$grey300",
    fontSize: "16px",
    opacity: 1,
  },
  "&::-webkit-input-placeholder": {
    color: "$grey300",
  },
  "&:-mos-input-placeholder": {
    color: "$grey300",
  },
  "&:-ms-input-placeholder": {
    color: "$grey300",
  },
});
