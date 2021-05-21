import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";
import { generateTreeFromList } from "../../utils/fileSystem";

import { SideBarContainer, Root, ShowMenu } from "./styles";

const Sidebar = () => {
  const fileStructure = useSelector((state) => state.fileSystem);
  const [toggle, handleToggle] = useState(true);
  return (
    <SideBarContainer toggle={toggle}>
      <ShowMenu onClick={() => handleToggle(!toggle)} />
      <Link to="/" className="rootLink">
        <Root />
      </Link>
      <SideMenu fileStructure={fileStructure} />
    </SideBarContainer>
  );
};

export default Sidebar;
