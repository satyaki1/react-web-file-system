import React, { useEffect, useRef, useState } from "react";
import MagnifyIcon from "./MagnifyIcon";
import SearchResults from "./SearchResults";
import Filter from "./Filter";
import { Container, Line, Input } from "./styles";
import { showPathEntries } from "../../utils/fileSystem";
import { LOCAL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const SearchBar = () => {
  const fileSystem = useSelector((state) => state.fileSystem);
  const location = useLocation();
  const entry = showPathEntries(location.pathname, fileSystem);
  const _ref = useRef();

  const [search, setSearch] = useState({
    term: "",
    width: 0,
    mode: LOCAL,
    data: null,
  });

  useEffect(() => {
    setSearch({ ...search, width: getComputedStyle(_ref.current) });
  }, []);

  const handleMode = (mode) => {
    setSearch({ ...search, mode });
  };

  return (
    <Input placeholder="Search your file system" ref={_ref} data-testid="searchbar">
      <MagnifyIcon
        fill="#545B61"
        style={{
          position: "absolute",
          pointerEvents: "none",
          left: 9,
          marginTop: 5,
        }}
        size={15}
      />
      <input
        placeholder="Search your file system"
        value={search.term}
        onChange={(event) => setSearch({ ...search, term: event.target.value })}
      />
      {search.term.length > 0 ? (
        <Container style={{ width: search.width }}>
          <Filter mode={search.mode} handleMode={handleMode} />
          <Line />
          <SearchResults
            term={search.term}
            isDraggable={false}
            data={search.mode === LOCAL ? entry : Object.keys(fileSystem).map((id) => fileSystem[id])}
            closeResult={() => setSearch({ ...search, term: "" })}
          />
        </Container>
      ) : (
        ""
      )}
    </Input>
  );
};

export default SearchBar;
