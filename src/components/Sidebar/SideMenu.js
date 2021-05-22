import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router";
import { FILE } from "../../utils/constants";
import { generateTreeFromList } from "../../utils/fileSystem";
import Collapse from "./Collapse";
import { LinkContainer, DropDownIcon } from "./styles";

const SideMenu = ({ fileStructure }) => {
  const history = useHistory();
  const location = useLocation();
  const fileStructureTree = generateTreeFromList(fileStructure);
  const children = fileStructureTree[0].children;

  const handler = (children, value) => {
    let i = value + 1;
    return children && children.length > 0
      ? children.map((entry) => {
          entry = fileStructure[entry];
          if (entry) {
            if (entry?.type === FILE) return null;
            const flag = entry?.children?.length ? true : false;

            if (!flag) {
              return (
                <LinkContainer
                  key={entry.path}
                  onClick={() => history.push(entry.path)}
                  className={location.pathname === entry.path ? "selected" : ""}
                >
                  <div className="link" style={{ marginLeft: `${10 * i}px` }}>
                    {entry.name}
                  </div>
                </LinkContainer>
              );
            }

            return (
              <Collapse index={i} key={entry.path}>
                {(visible, handleVisible) => {
                  return (
                    <Fragment>
                      <LinkContainer key={entry.path} className={location.pathname === entry.path ? "selected" : ""}>
                        <div
                          className="link"
                          style={{
                            marginLeft: `${10 * i}px`,
                            width: "100%",
                          }}
                          onClick={() => history.push(entry.path)}
                        >
                          {entry.name}
                        </div>
                        <div className="dropdown" onClick={() => handleVisible()}>
                          <DropDownIcon className={visible ? "" : "clicked"} />
                        </div>
                      </LinkContainer>
                      <div style={{ position: "relative" }}>{visible ? handler(entry.children, i) : ""}</div>
                    </Fragment>
                  );
                }}
              </Collapse>
            );
          }
          return null;
        })
      : "";
  };

  return <Fragment>{handler(children, 0)}</Fragment>;
};

export default SideMenu;
