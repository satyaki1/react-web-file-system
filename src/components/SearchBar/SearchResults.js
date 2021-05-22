import React, { Fragment } from "react";
import { useHistory } from "react-router";
import FileIcon from "../../assets/img/file.png";
import FolderIcon from "../../assets/img/folder.png";
import { FILE } from "../../utils/constants";
import { Result, NoResult, Img, Path } from "./styles";

const SearchResults = ({ data, term, closeResult }) => {
  const history = useHistory();

  const handleClick = (arr) => {
    const path = arr.type === FILE ? arr.parentPath : arr.path;
    history.push(path);
    closeResult();
  };

  data = data.filter((arr) => arr.name.match(term) !== null);
  return (
    <Fragment>
      {data.length > 0 ? (
        data.map((arr) => (
          <Result key={arr.path} onClick={() => handleClick(arr)}>
            <div>
              <Img src={arr.type === FILE ? FileIcon : FolderIcon} />
              {arr.name}
            </div>

            <Path>{arr.path}</Path>
          </Result>
        ))
      ) : (
        <NoResult>No Result</NoResult>
      )}
    </Fragment>
  );
};

export default SearchResults;
