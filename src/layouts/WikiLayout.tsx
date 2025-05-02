import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/WikiInterface/Layout/WikiLayout.css';
import OrganizationStrip from "../components/WikiInterface/Strip/OrganizationStrip/OrganizationStrip";
import DocumentListStrip from "../components/WikiInterface/Strip/DocumentListStrip/DocumentListStrip";
import MarkdownStrip from "../components/WikiInterface/Strip/MarkdownStrip";

interface WikiInterfaceProps {
  children?: React.ReactNode;
}

const WikiLayout: React.FC<WikiInterfaceProps> = () => {
  const focusedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const focusedDoc = useSelector((state: RootState) => state.ui.selectedDocument);

  return (
    <div className="wiki-layout">
      <div className="wiki-org-strip">
        <OrganizationStrip />
      </div>
      <div className="wiki-doclist-strip">
        {focusedOrg ? (
          <DocumentListStrip />
        ) :
          <div className="wiki-placeholder">Select an organization to view documents</div>
       }
      </div>
      <div className="wiki-markdown-strip">
        {focusedDoc ? (
          <MarkdownStrip />
        ) : (
          <div className="wiki-placeholder">Select a document to view it</div>
        )}
      </div>
    </div>
  );
};

export default WikiLayout;