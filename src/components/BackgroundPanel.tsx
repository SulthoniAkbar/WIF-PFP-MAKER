import React from "react";
import Panel from "./Panel";
import { type BackgroundPanelProps } from "../types";

const BackgroundPanel: React.FC<BackgroundPanelProps> = ({
  images,
  onSelectImage,
  onSelectColor,
  selectedColor,
  onReset,
}) => (
  <Panel
    title="backgrounds"
    headerColor="#c8c0ff"
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
        alignItems: "center",
        gap: 12,
        padding: 16,
        backgroundColor: "#ffffff",
      }}
    >
      {images.map((src) => (
        <div
          key={src}
          onClick={() => onSelectImage(src)}
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
            alt="Background option"
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
              objectFit: "contain",
            }}
          />
        </div>
      ))}

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
          gap: 4,
          width: 80,
          height: 80,
          backgroundColor: "#dddddd",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        Pick Color
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onSelectColor(e.target.value)}
          style={{
            width: 32,
            height: 32,
            padding: 0,
            border: "none",
            cursor: "pointer",
          }}
        />
      </label>
    </div>
  </Panel>
);

export default BackgroundPanel;
