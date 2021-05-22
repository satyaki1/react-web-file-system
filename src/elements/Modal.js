import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Modal = ({ children, isDraggable, style, title, closeFn, ...props }) => {
  const _ref = useRef();
  const [position, setPosition] = useState({
    isDragging: false,
    originalX: 0,
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
  });

  useEffect(() => {
    const nodeRef = _ref.current;
    return () => {
      nodeRef.removeEventListener("mousemove", handleMouseMove);
      nodeRef.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = ({ clientX, clientY }) => {
    if (isDraggable) {
      return;
    }
    _ref.current.addEventListener("mousemove", handleMouseMove);
    _ref.current.addEventListener("mouseup", handleMouseUp);
    setPosition({ ...position, originalX: clientX, originalY: clientY, isDragging: true });
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    if (!position.isDragging) {
      return;
    }
    setPosition({
      ...position,
      translateX: clientX - position.originalX + position.lastTranslateX,
      translateY: clientY - position.originalY + position.lastTranslateY,
    });
  };

  const handleMouseUp = () => {
    _ref.current.removeEventListener("mousemove", handleMouseMove);
    _ref.current.removeEventListener("mouseup", handleMouseUp);

    setPosition({
      ...position,
      originalX: 0,
      originalY: 0,
      lastTranslateX: position.translateX,
      lastTranslateY: position.translateY,
      isDragging: false,
    });
  };

  const { translateX, translateY } = position;
  style = style ? style : {};
  return (
    <Container
      style={{
        ...style,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
      onMouseDown={handleMouseDown}
      onmouseup={handleMouseUp}
      className="draggable"
      ref={_ref}
    >
      <Heading>
        <Title>{title}</Title>
        <Close onClick={closeFn}>
          <Icon name="close" size={15} color="#82878B" />
        </Close>
      </Heading>
      {children}
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  width: 316px;
  position: relative;
  z-index: 4000;
  padding: 20px 0 44px;
  background: #ffffff;
  border: 1px solid rgba(221, 224, 228, 0.7);
  box-shadow: 0 16px 64px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const Title = styled.div`
  font-family: Lato, sans-serif;
  font-size: 18px;
  color: #2f363f;
  letter-spacing: 0;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 24px;
  padding: 13px;
  cursor: pointer;
`;
