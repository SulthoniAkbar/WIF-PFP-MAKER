import React, { useState, useEffect } from "react";
import { BACKGROUNDS, AVATARS, ACCESSORY_CATEGORIES } from "./constant/assets";
import CanvasArea from "./components/CanvasArea";
import BackgroundPanel from "./components/BackgroundPanel";
import AvatarPanel from "./components/AvatarPanel";
import AccessoryPanel from "./components/AccessoryPanel";
import UploadPanel from "./components/UploadPanel";
import DownloadButton from "./components/DownloadButton";
import type { Layer } from "./types";

const App: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(500);

  const layerMargin = 20;

  // Dynamically update canvas size based on screen width
  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth <= 768;
      const size = isMobile ? window.innerWidth - 24 : 500;
      setCanvasSize(size);
    };

    updateCanvasSize(); // Initial call
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const handleBackgroundImageSelect = (src: string) => {
    setBackgroundImage(src);
    setSelectedId(null);
  };

  const handleBackgroundColorSelect = (hex: string) => {
    setBackgroundColor(hex);
    setSelectedId(null);
  };

  const addLayer = (src: string) => {
    setLayers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        src,
        width: canvasSize - layerMargin * 2,
        height: canvasSize - layerMargin * 2,
        rotation: 0,
        x: layerMargin,
        y: layerMargin,
      },
    ]);
  };

  const resetCanvas = () => {
    setLayers([]);
    setBackgroundImage("");
    setBackgroundColor("#ffffff");
    setSelectedId(null);
  };

  const resetBackground = () => {
    setBackgroundImage("");
    setBackgroundColor("#ffffff");
  };

  const resetAvatars = () =>
    setLayers((prev) => prev.filter((l) => !AVATARS.includes(l.src)));

  const resetAccessories = () => {
    const allAccessorySrcs = Object.values(ACCESSORY_CATEGORIES).flat();
    setLayers((prev) => prev.filter((l) => !allAccessorySrcs.includes(l.src)));
  };

  const updateLayer = (id: string, props: Partial<Layer>) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...props } : l))
    );
  };

  const deleteLayer = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: 40, marginBottom: 16 }}>
        WIF PFP MAKER
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <CanvasArea
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
          layers={layers}
          selectedId={selectedId}
          onSelectLayer={setSelectedId}
          onUpdateLayer={updateLayer}
          onDeleteLayer={deleteLayer}
          onResetAll={resetCanvas}
          width={canvasSize}
          height={canvasSize}
        />
        <div style={{ flex: 1 }}>
          <BackgroundPanel
            images={BACKGROUNDS}
            onSelectImage={handleBackgroundImageSelect}
            onSelectColor={handleBackgroundColorSelect}
            selectedColor={backgroundColor}
            onReset={resetBackground}
          />
          <AvatarPanel
            images={AVATARS}
            onSelect={addLayer}
            onReset={resetAvatars}
          />
          <AccessoryPanel onSelect={addLayer} onReset={resetAccessories} />
          <UploadPanel onUpload={addLayer} />

          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <DownloadButton />
            {selectedId && (
              <div style={{ textAlign: "center" }}>
                <label>
                  Width:
                  <input
                    type="range"
                    min={20}
                    max={canvasSize}
                    value={
                      layers.find((l) => l.id === selectedId)?.width || 100
                    }
                    onChange={(e) =>
                      updateLayer(selectedId, {
                        width: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  Height:
                  <input
                    type="range"
                    min={20}
                    max={canvasSize}
                    value={
                      layers.find((l) => l.id === selectedId)?.height || 100
                    }
                    onChange={(e) =>
                      updateLayer(selectedId, {
                        height: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  Rotate:
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={
                      layers.find((l) => l.id === selectedId)?.rotation || 0
                    }
                    onChange={(e) =>
                      updateLayer(selectedId, {
                        rotation: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
