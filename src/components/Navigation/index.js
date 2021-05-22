import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Container, Path } from "./styles";
import GoBack from "./GoBack";

const showPath = (path) => {
  const pathArr = path.split("/").filter((p) => p);
  const len = pathArr.length;
  const arr = [<span key={0}>{` root `}</span>];

  pathArr.map((p, _) => {
    _ === len - 1
      ? arr.push(
          <span className="currentPath" key={_ + 1}>
            / {p}
          </span>
        )
      : arr.push(<span key={_ + 1}>{` / ${p} `}</span>);
  });
  return arr;
};

const goBack = (path) => {
  let newPath = path.split("/");
  newPath.splice(newPath.length - 1, 1);
  return newPath.join("/");
};

const updateRoute = (location, history) => {
  if (location.pathname === "/") {
    return null;
  } else {
    history.push(goBack(location.pathname));
  }
};

const Navigation = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <Container>
      <div style={{ marginTop: -2, cursor: "pointer" }} onClick={() => updateRoute(location, history)}>
        <GoBack fill={location.pathname === "/" ? "#acb9c3" : "#545B61"} />
      </div>
      <Path>{showPath(location.pathname)}</Path>
    </Container>
  );
};

export default Navigation;
