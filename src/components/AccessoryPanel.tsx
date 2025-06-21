import React, { useState } from "react";
import Panel from "./Panel";
import { type ItemPanelProps } from "../types";
import { ACCESSORY_CATEGORIES } from "../constant/assets";

const categories = Object.keys(ACCESSORY_CATEGORIES);

const AccessoryPanel: React.FC<Omit<ItemPanelProps, "images">> = ({
  onSelect,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]);

  return (
    <Panel
      title="accessories"
      headerColor="#ff0044"
      width={520}
      headerActions={
        <button
          style={{ color: "black", fontWeight: "bold" }}
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
        >
          Reset
        </button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            padding: "12px",
            backgroundColor: "#ffffff",
            borderBottom: "2px solid black",
          }}
        >
          {categories.map((cat) => (
            <span
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                cursor: "pointer",
                fontWeight: cat === activeTab ? "bold" : "normal",
                color: cat === activeTab ? "red" : "black",
                margin: "0 8px",
                fontSize: 14,
                textTransform: "lowercase",
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "16px",
            gap: "12px",
            backgroundColor: "#ffffff",
          }}
        >
          {ACCESSORY_CATEGORIES[activeTab].map((src) => (
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
                alt={`${activeTab} option`}
                style={{
                  maxWidth: "90%",
                  maxHeight: "70%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};

export default AccessoryPanel;
