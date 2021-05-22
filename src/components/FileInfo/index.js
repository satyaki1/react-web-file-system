import React from "react";
import { format } from "date-fns";
import Modal from "../../elements/Modal";
import FileIcon from "../../assets/img/file.png";
import FolderIcon from "../../assets/img/folder.png";
import { Icon, Logo, Img, Details } from "./styles";

const FileInfo = ({ entry, closeFn }) => {
  const style = {
    style: {
      position: "absolute",
      zIndex: 4000,
    },
  };

  let ext = entry.name.split(".").filter((el) => el);
  ext = ext[ext.length - 1];

  return (
    <Modal style={style} closeFn={closeFn}>
      <Icon>
        <Logo>
          <Img src={entry.type === "file" ? FileIcon : FolderIcon} />
          {entry.type === "file" ? <span>{`.${ext}`}</span> : ""}
        </Logo>
      </Icon>

      <Details.Container>
        <Details.Info>
          <Details.Label>Name:</Details.Label>
          <Details.Value>{entry.name}</Details.Value>
        </Details.Info>
        <Details.Info>
          <Details.Label>Size:</Details.Label>
          <Details.Value>{entry.size}kb</Details.Value>
        </Details.Info>
        <Details.Info>
          <Details.Label>Creator Name:</Details.Label>
          <Details.Value>{entry.creatorName}</Details.Value>
        </Details.Info>
        <Details.Info>
          <Details.Label>Created Date:</Details.Label>
          <Details.Value>{format(new Date(entry.date), "do MMM yyyy")}</Details.Value>
        </Details.Info>
      </Details.Container>
    </Modal>
  );
};

export default FileInfo;
