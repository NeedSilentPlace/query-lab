import { styled } from "@styles";

export default styled("textarea", {
  all: "unset",
  border: "1px solid $grey200",
  width: "100%",
  minHeight: "350px",
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
