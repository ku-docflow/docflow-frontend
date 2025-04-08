import React, { useState } from "react";
import '../styles/WikiInterface/Layout/WikiLayout.css';
import OrganizationStrip from "../components/WikiInterface/Strip/OrganizationStrip/OrganizationStrip";
import DocumentListStrip from "../components/WikiInterface/Strip/DocumentListStrip";
import MarkdownStrip from "../components/WikiInterface/Strip/MarkdownStrip";

const WikiLayout: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <div className="wiki-layout">
      <div className="wiki-org-strip">
        <OrganizationStrip onOrganizationSelect={setSelectedOrg} />
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