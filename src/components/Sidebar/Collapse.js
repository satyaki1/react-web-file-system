import React, { useState } from "react";
import { CollapseContainer } from "./styles";

const Collapse = (props) => {
  const [visible, handleVisible] = useState(false);
  return <CollapseContainer>{props.children(visible, () => handleVisible(!visible))}</CollapseContainer>;
};

export default Collapse;
