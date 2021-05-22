import React, { useEffect } from "react";
import styled from "styled-components";
import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { addEntry, deleteEntry } from "../../actions/fileSystem";
import Icon from "../Icon";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getFileSystemId } from "../../utils/common";
import Add from "../Add";

const System = () => {
  const history = useHistory();
  const location = useLocation();
  const fileSystem = useSelector((state) => state.fileSystem);
  const entry = showPathEntries(location.pathname, fileSystem);
  const pathId = getFileSystemId(location.pathname, fileSystem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(fileSystem).includes(pathId)) {
      history.push("/");
    }
  }, []);

  const deleteEntryFromSystem = (entry) => {
    dispatch(deleteEntry(getFileSystemId(entry.path, fileSystem)));
  };

  const saveNewlyAddedDetails = (value) => {
    dispatch(
      addEntry({
        ...value,
        parentID: pathId,
        parentPath: location.pathname,
      })
    );
  };

  return (
    <Container>
      {entry.map((entry, _) => (
        <Icon entry={entry} index={_} key={`${entry.path}_${entry.type}`} deleteFn={() => deleteEntryFromSystem(entry)} />
      ))}
      <Add saveEntry={(value) => saveNewlyAddedDetails(value)} />
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
