import React, { Component } from "react";
import { GLOBAL, LOCAL } from "../../utils/constants";
import { FilterContainer } from "./styles";

const Filter = ({ mode, handleMode }) => {
  return (
    <FilterContainer>
      Search:
      <FilterContainer.Options>
        <span className={mode === LOCAL ? "selected" : ""} onClick={() => handleMode(LOCAL)}>
          Local
        </span>
        <span className={mode === GLOBAL ? "selected" : ""} onClick={() => handleMode(GLOBAL)}>
          Global
        </span>
      </FilterContainer.Options>
    </FilterContainer>
  );
};

export default Filter;
