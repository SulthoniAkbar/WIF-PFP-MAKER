import React, { useRef } from "react";
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
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const size = isMobile ? window.innerWidth - 24 : 500;

  return (
    <div>
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
          ref={canvasRef}
          id="canvas-area"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onSelectLayer(null);
            }
          }}
          style={{
            position: "relative",
            width: size,
            height: size,
            margin: "0 auto",
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
            const width = layer.width ?? size;
            const height = layer.height ?? size;
            const x = layer.x ?? 0;
            const y = layer.y ?? 0;

            return (
              <Rnd
                key={layer.id}
                bounds="parent"
                size={{ width, height }}
                position={{ x, y }}
                enableResizing={isSelected}
                disableDragging={!isSelected}
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
                  touchAction: "none",
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
