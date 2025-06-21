import React from "react";
import Panel from "./Panel";
import { type ItemPanelProps } from "../types";

const AvatarPanel: React.FC<ItemPanelProps> = ({
  images,
  onSelect,
  onReset,
}) => (
  <Panel
    title="avatars"
    headerColor="#99ff99"
    width={520}
    headerActions={
      <button
        style={{
          background: "none",
          border: "none",
          color: "black",
          fontWeight: "bold",
          fontSize: 13,
          cursor: "pointer",
          padding: "4px 8px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
      >
        Reset
      </button>
    }
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px",
        padding: "16px",
        backgroundColor: "#ffffff",
      }}
    >
      {images.map((src) => (
        <div
          key={src}
          onClick={() => onSelect(src)}
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#dddddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          <img
            src={src}
            alt="Avatar option"
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
              objectFit: "contain",
            }}
          />
        </div>
      ))}
    </div>
  </Panel>
);

export default AvatarPanel;
