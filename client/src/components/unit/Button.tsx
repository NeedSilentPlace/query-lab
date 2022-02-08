import { styled } from "@styles";

export default styled("button", {
  all: "unset",

  cursor: "pointer",
  padding: "16px",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",

  fontSize: "16px",
  color: "$grey100",
  backgroundColor: "$purple400",
  boxSizing: "border-box",

  variants: {
    outline: {
      true: {
        color: "$grey800",
        backgroundColor: "$white",
        border: "1px solid $grey200",
      },
    },
  },
});
