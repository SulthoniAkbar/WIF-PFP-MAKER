import React from "react";
import Panel from "./Panel";
import { type UploadPanelProps } from "../types";

const UploadPanel: React.FC<UploadPanelProps> = ({ onUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <Panel title="upload" headerColor="#cccccc" width={520}>
      <input type="file" accept="image/*" onChange={handleChange} />
    </Panel>
  );
};

export default UploadPanel;
