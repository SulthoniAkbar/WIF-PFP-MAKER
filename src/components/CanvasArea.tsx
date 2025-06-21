import React from "react";
import { Rnd } from "react-rnd";
import Panel from "./Panel";
import { type CanvasAreaProps } from "../types";

const CanvasArea: React.FC<CanvasAreaProps> = ({
  backgroundImage,
  backgroundColor,
  layers,
  selectedId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  onResetAll,
}) => {
  const handleDeselect = () => onSelectLayer(null);

  return (
    <div onClick={handleDeselect}>
      <Panel
        title="canvas"
        headerColor="#fadb14"
        width={520}
        headerActions={
          <>
            <button onClick={onResetAll}>Reset Canvas</button>
            {selectedId && (
              <button
                style={{ marginLeft: 8, color: "red" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLayer(selectedId);
                  onSelectLayer(null);
                }}
              >
                Delete
              </button>
            )}
          </>
        }
      >
        <div
          id="canvas-area"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: 500,
            height: 500,
            backgroundColor,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        >
          {layers.map((layer) => {
            const isSelected = layer.id === selectedId;
            return (
              <Rnd
                key={layer.id}
                size={{
                  width: layer.width || 100,
                  height: layer.height || 100,
                }}
                position={{ x: layer.x || 10, y: layer.y || 10 }}
                enableResizing={isSelected}
                onDragStop={(_, d) =>
                  onUpdateLayer(layer.id, { x: d.x, y: d.y })
                }
                onResizeStop={(_, __, ref, ___, position) => {
                  onUpdateLayer(layer.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    x: position.x,
                    y: position.y,
                  });
                }}
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  onSelectLayer(layer.id);
                }}
                style={{
                  zIndex: isSelected ? 2 : 1,
                  border: isSelected ? "1px dashed #00f" : "none",
                }}
              >
                <img
                  src={layer.src}
                  alt="Layer"
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `rotate(${layer.rotation || 0}deg)`,
                    pointerEvents: "none",
                  }}
                />
              </Rnd>
            );
          })}
        </div>
      </Panel>
    </div>
  );
};

export default CanvasArea;
