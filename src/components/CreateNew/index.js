import React, { useState } from "react";
import { FILE, FOLDER } from "../../utils/constants";
import { Container, Error, Top, Toggle, Form } from "./styles";
import { format } from "date-fns";
import Modal from "../../elements/Modal";

const FileInfo = ({ title, addEntry, closeFn }) => {
  const [type, handleType] = useState(FILE);
  const [item, setItem] = useState({
    name: "",
    creatorName: "",
    size: "",
    date: format(new Date(), "yyyy-MM-dd"),
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setItem({
      ...item,
      [field]: value,
    });
  };

  const validate = (values) => {
    let hasError = false;
    setErrors({});
    if (!values.name) {
      hasError = true;
      setErrors({ name: "Name is Required" });
    } else if (!values.creatorName) {
      hasError = true;
      setErrors({ creatorName: "Creator Name is Required" });
    } else if (!values.date) {
      hasError = true;
      setErrors({ date: "Date is Required" });
    }
    return hasError;
  };

  const handleSubmit = () => {
    if (!validate({ name: item.name, creatorName: item.creatorName, date: item.date })) {
      addEntry({
        type,
        name: item.name,
        size: item.size,
        date: item.date,
        creatorName: item.creatorName,
      });
      closeFn();
    }
    return null;
  };

  return (
    <Modal closeFn={closeFn} title={title}>
      <Container>
        <Top>
          <Toggle.Container>
            <Toggle.Option className={type === FILE ? "selected" : ""} onClick={() => handleType(FILE)}>
              File
            </Toggle.Option>
            <Toggle.Option className={type === FOLDER ? "selected" : ""} onClick={() => handleType(FOLDER)}>
              Folder
            </Toggle.Option>
          </Toggle.Container>
        </Top>
        <Form.Container>
          <div className="formField">
            <input
              placeholder="Name"
              onChange={(event) => handleChange("name", event.target.value)}
              name="name"
              className="field"
              value={item.name}
              autoComplete="off"
            />
            {errors.name ? <Error>{errors.name}</Error> : ""}
          </div>

          <div className="formField">
            <input
              placeholder="Creator"
              onChange={(event) => handleChange("creatorName", event.target.value)}
              name="size"
              className="field"
              value={item.creatorName}
              autoComplete="off"
            />
            {errors.creatorName ? <Error>{errors.creatorName}</Error> : ""}
          </div>

          <div className="formField">
            <input
              placeholder="Size"
              type="number"
              onChange={(event) => handleChange("size", event.target.value)}
              name="size"
              className="field"
              min="0"
              value={item.size}
            />
          </div>

          <div className="formField">
            <input
              placeholder="date"
              type="date"
              onChange={(event) => handleChange("date", event.target.value)}
              name="date"
              className="field"
              value={item.date}
            />
            {errors.date ? <Error>{errors.date}</Error> : ""}
          </div>

          <Form.Submit type="submit" onClick={handleSubmit}>
            Create
          </Form.Submit>
        </Form.Container>
      </Container>
    </Modal>
  );
};

export default FileInfo;
