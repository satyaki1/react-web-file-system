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
  const nodeRef = useRef();
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
              ...context,
              showInfo: true,
            });
      },
    },
    {
      info: "Get Info",
      onClick: () =>
        setContext({
          ...context,
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
  ]
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
    console.log("path", path)
    console.log("noderef", nodeRef.current)
    const wasOutside = !path.includes(nodeRef.current) || false;
    console.log(wasOutside)


    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = nodeRef.current.offsetWidth;
    const rootH = nodeRef.current.offsetHeight;

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
      ...context,
      style,
      visible: true,
      prevStyle,
    });
  };

  const _handleMouseLeave = (event) => {
    const wasOutside = !(event.target.contains === nodeRef.current);

    if (wasOutside && context.visible)
      setContext({
        ...context,
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
    <Container ref={nodeRef}>
      <Logo onClick={() => enterFolder()}>
        <Img src={entry.type === FILE ? FileIcon : FolderIcon} />
        {entry.type === FILE ? <span>{`.${ext}`}</span> : ""}
      </Logo>
      <Name>{entry.name}</Name>
      {context.visible && (
        <Menu
          style={context.style}
          content={menuItems}
        />
      )}
      {context.showInfo ? (
        <FileInfo
          title="File Info"
          style={context.prevStyle}
          closeFn={() =>
            setContext({
              ...context,
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
