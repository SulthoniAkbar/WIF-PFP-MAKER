import React from "react";
import { type PanelProps } from "../types";

const Panel: React.FC<PanelProps> = ({
  title,
  headerColor,
  width = 400,
  headerActions,
  children,
}) => (
  <div className="window" style={{ width: "100%", maxWidth: width }}>
    <div
      className="window-header"
      style={{
        backgroundColor: headerColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span className="window-title">{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className="window-controls">
          <span className="control-btn" />
          <span className="control-btn" />
          <span className="control-btn" />
        </div>
        {headerActions && (
          <div className="panel-header-actions">{headerActions}</div>
        )}
      </div>
    </div>
    <div className="window-body">{children}</div>
  </div>
);

export default Panel;
