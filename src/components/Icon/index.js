import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FILE, FOLDER } from "../../utils/constants";
import FileIcon from "../../assets/img/file.png";
import FolderIcon from "../../assets/img/folder.png";
import { Container, Logo, Img, Name } from "./styles";
import Menu from "../Menu";
import FileInfo from "../FileInfo";

const Icon = ({ entry, deleteFn }) => {
  const history = useHistory();
  const _ref = useRef();
  const [context, setContext] = useState({
    visible: false,
    showInfo: false,
    style: {
      right: 0,
      left: 0,
    },
  });

  const menuItems = [
    {
      info: "Open",
      onClick: () => {
        entry.type === FOLDER
          ? history.push(entry.path)
          : setContext({
              showInfo: true,
            });
      },
    },
    {
      info: "Get Info",
      onClick: () =>
        setContext({
          showInfo: true,
        }),
    },
    {
      info: "Delete",
      style: { color: "red" },
      onClick: () => {
        handleDelete();
      },
    },
  ];
  let ext = entry.name.split(".").filter((el) => el);
  ext = ext.length >= 2 ? ext[ext.length - 1] : "";

  useEffect(() => {
    document.addEventListener("contextmenu", _handleContextMenu);
    document.addEventListener("click", _handleMouseLeave);

    return () => {
      document.removeEventListener("contextmenu", _handleContextMenu);
      document.removeEventListener("click", _handleMouseLeave);
    };
  }, []);

  const _handleContextMenu = (event) => {
    event.preventDefault();
    const path = event.composedPath();
    const wasOutside = !path.includes(_ref.current) || false;

    if (wasOutside) {
      setContext({
        visible: false,
        style: {
          right: 0,
          left: 0,
        },
        previousValue: {
          right: 0,
          left: 0,
        },
      });
      return;
    }

    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = _ref.current.offsetWidth;
    const rootH = _ref.current.offsetHeight;

    const right = screenW - clickX > rootW;
    const left = !right;
    const top = screenH - clickY > rootH;
    const bottom = !top;

    const style = {
      left: 0,
      top: 0,
    };

    if (right) {
      style.left = `${clickX + 5}px`;
    }

    if (left) {
      style.left = `${clickX - rootW - 5}px`;
    }

    if (top) {
      style.top = `${clickY + 5}px`;
    }

    if (bottom) {
      style.top = `${clickY - rootH - 5}px`;
    }

    const prevStyle = {
      top: style.top,
      left: style.left,
    };

    setContext({
      style,
      visible: true,
      prevStyle,
    });
  };

  const _handleMouseLeave = (event) => {
    const { visible } = context;
    const wasOutside = !(event.target.contains === _ref.current);

    if (wasOutside && visible)
      setContext({
        visible: false,
        style: {
          right: 0,
          left: 0,
        },
      });
  };

  const handleDelete = () => {
    deleteFn();
  };

  const enterFolder = () => {
    if (entry.type === FOLDER) {
      history.push(entry.path);
    }
  };

  return (
    <Container ref={_ref}>
      <Logo onClick={() => enterFolder()}>
        <Img src={entry.type === FILE ? FileIcon : FolderIcon} />
        {entry.type === FILE ? <span>{`.${ext}`}</span> : ""}
      </Logo>
      <Name>{entry.name}</Name>
      {context.visible && <Menu style={context.style} content={menuItems} />}
      {context.showInfo ? (
        <FileInfo
          title="File Info"
          style={context.prevStyle}
          closeFn={() =>
            setContext({
              showInfo: false,
            })
          }
          entry={{
            type: entry.type,
            name: entry.name,
            path: "/",
            ext: ext,
            size: entry.size,
            date: entry.date,
            creatorName: entry.creatorName,
          }}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Icon;
