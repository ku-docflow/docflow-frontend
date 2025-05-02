// src/components/WikiInterface/Strip/DocumentBlock.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { Document } from "../../../../types/document";
import "../../../../styles/WikiInterface/DocumentListStrip/DocumentBlock.css";
import { setSelectedDocument } from "../../../../store/slices/uiSlice";

interface DocumentBlockProps {
  document: Document;
}

const DocumentBlock: React.FC<DocumentBlockProps> = ({ document }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSelectedDocument(document));
  };

  return (
    <div className="DocumentBlock" onClick={handleClick}>
      <span className="DocumentBlock__title">{document.text.split('\n')[0]}</span>
    </div>
  );
};

export default DocumentBlock;