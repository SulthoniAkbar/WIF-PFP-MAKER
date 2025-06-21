import React from 'react';
import html2canvas from 'html2canvas';
import Panel from './Panel';

const DownloadButton: React.FC = () => {
  const handleDownload = async () => {
    const el = document.getElementById('canvas-area');
    if (!el) return;
    const canvas = await html2canvas(el);
    const link = document.createElement('a');
    link.download = 'pfp.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Panel title="download" headerColor="#ffccff" width={300}>
      <div style={{ textAlign: 'center' }}>
        <p>download this image?</p>
        <button onClick={handleDownload}>YES</button>
        <button style={{ marginLeft: 8 }}>NO</button>
      </div>
    </Panel>
  );
};

export default DownloadButton;