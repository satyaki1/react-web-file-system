import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import CreateNew from '../CreateNew';

const Add = (props) => {
  const [open, handleOpen] = useState(false);
  return (
    <Fragment>
      <Container data-testid="add-new" onClick={() => handleOpen(true)}>+</Container>
      {open ? (
        <CreateNew
          title="Create New"
          closeFn={() => handleOpen(false)}
          addEntry={value => props.saveEntry(value)}
        />
      ) : (
        ''
      )}
    </Fragment>
  );
}

export default Add;

const Container = styled.div`
  height: 117px;
  width: 96px;
  border: 3px dashed #dee0e4;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  font-size: 30px;
  color: #dee0e4;
  margin: 0px 21px;
  cursor: copy;
`;
