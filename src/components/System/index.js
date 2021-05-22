import React, { useEffect } from "react";
import styled from "styled-components";
import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { addEntry, deleteEntry } from "../../actions/fileSystem";
import Icon from "../Icon";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { getFileSystemId} from "../../utils/common";

const System = () => {
  const history = useHistory();
  const location = useLocation();
  const fileSystem = useSelector((state) => state.fileSystem);
  const entry = showPathEntries(location.pathname, fileSystem);
  const pathId = getFileSystemId(location.pathname, fileSystem);

  useEffect(() => {
    if (!Object.keys(fileSystem).includes(pathId)) {
      history.push("/");
    }
  }, []);

  return (
    <Container>
      {entry.map((entry, _) => (
        <Icon
          entry={entry}
          index={_}
          key={`${entry.path}_${entry.type}`}
          deleteFn={() => {
            deleteEntry(getFileSystemId(location.pathname, fileSystem));
          }}
        />
      ))}
    </Container>
  );
};

export default System;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 40px 0;
`;
