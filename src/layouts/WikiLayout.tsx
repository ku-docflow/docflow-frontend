import React, { useState } from "react";
import '../styles/WikiInterface/Layout/WikiLayout.css';
import OrganizationStrip from "../components/WikiInterface/Strip/OrganizationStrip/OrganizationStrip";
import DocumentListStrip from "../components/WikiInterface/Strip/DocumentListStrip";
import MarkdownStrip from "../components/WikiInterface/Strip/MarkdownStrip";

interface WikiInterfaceProps {
  children?: React.ReactNode;
}

const WikiLayout: React.FC<WikiInterfaceProps> = () => {
  const [selectedOrg] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <div className="wiki-layout">
      <div className="wiki-org-strip">
        <OrganizationStrip />
      </div>
      <div className="wiki-doclist-strip">
        {selectedOrg && (
          <DocumentListStrip orgId={selectedOrg} onSelectDocument={setSelectedDoc} />
        )}
      </div>
      <div className="wiki-markdown-strip">
        {selectedDoc ? (
          <MarkdownStrip documentId={selectedDoc} />
        ) : (
          <div className="wiki-placeholder">Select a document to view it</div>
        )}
      </div>
    </div>
  );
};

export default WikiLayout;