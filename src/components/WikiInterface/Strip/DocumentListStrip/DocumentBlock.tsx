// src/components/WikiInterface/Strip/DocumentListStrip/DocumentBlock.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document } from "../../../../types/document";
import "../../../../styles/WikiInterface/DocumentListStrip/DocumentBlock.css";
import { setSelectedDocument } from "../../../../store/slices/uiSlice";
import { RootState } from "../../../../store";

interface DocumentBlockProps {
  document: Document;
}

const DocumentBlock: React.FC<DocumentBlockProps> = ({ document }) => {
  const dispatch = useDispatch();
  const selectedDocument = useSelector((state: RootState) => state.ui.selectedDocument);

  const handleClick = () => {
    dispatch(setSelectedDocument(document));
  };

  return (
    <div 
      className={`DocumentBlock ${selectedDocument?.id === document.id ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      <span className="DocumentBlock__title">{document.text.split('\n')[0]}</span>
    </div>
  );
};

export default DocumentBlock;