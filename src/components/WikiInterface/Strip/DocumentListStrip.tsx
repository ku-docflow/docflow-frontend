import React from "react";
import '../../../styles/WikiInterface/DocumentListStrip/DocumentListStrip.css';

interface DocumentListStripProps {
  orgId: string;
  onSelectDocument: (docId: string) => void;
}

const dummyDocsByOrg: { [key: string]: { id: string; title: string }[] } = {
  "org1": [
    { id: "doc1", title: "API Spec" },
    { id: "doc2", title: "DB Schema" }
  ],
  "org2": [
    { id: "doc3", title: "Auth Flow" }
  ],
  "org3": []
};

const DocumentListStrip: React.FC<DocumentListStripProps> = ({ orgId, onSelectDocument }) => {
  const docs = dummyDocsByOrg[orgId] || [];

  return (
    <div className="document-list-strip">
      <h3>{orgId} Docs</h3>
      <ul>
        {docs.length > 0 ? (
          docs.map((doc) => (
            <li key={doc.id} onClick={() => onSelectDocument(doc.id)}>
              {doc.title}
            </li>
          ))
        ) : (
          <li>No documents available</li>
        )}
      </ul>
    </div>
  );
};

export default DocumentListStrip;