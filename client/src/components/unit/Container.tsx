import React from "react";
import { styled, css } from "@styles";

const _Container = styled("div", {
  margin: "0 auto",
});
type ContainerProps = {
  width?: number;
  children?: React.ReactNode;
};

function Container({ width = 614, children }: ContainerProps) {
  return <_Container css={{ maxWidth: width }}>{children}</_Container>;
}

export default Container;
