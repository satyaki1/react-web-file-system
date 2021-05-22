import React, { useState } from 'react';
import { FILE, FOLDER } from '../../utils/constants';
import { Container, Error, Top, Toggle, Form } from './styles';

const TodayDate = () => {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

function FileInfo(_props) {
  const [type, handleType] = useState(FILE);
  return (
    <Container>
      <Top>
        <Toggle.Container>
          <Toggle.Option
            className={type === FILE ? 'selected' : ''}
            onClick={() => handleType(FILE)}
          >
            File
          </Toggle.Option>
          <Toggle.Option
            className={type === FOLDER ? 'selected' : ''}
            onClick={() => handleType(FOLDER)}
          >
            Folder
          </Toggle.Option>
        </Toggle.Container>
      </Top>

      
    </Container>
  );
}

export default FileInfo;
