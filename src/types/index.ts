import React from "react";

export interface Layer {
  id: string;
  src: string;
  width?: number;
  height?: number;
  rotation?: number;
  x?: number;
  y?: number;
}

export interface CanvasAreaProps {
  backgroundImage: string;
  backgroundColor: string;
  layers: Layer[];
  selectedId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (id: string, props: Partial<Layer>) => void;
  onDeleteLayer: (id: string) => void;
  onResetAll: () => void;

  // Tambahkan ini:
  width: number;
  height: number;
}

export interface PanelProps {
  title: string;
  headerColor: string;
  width?: number;
  children: React.ReactNode;

  headerActions?: React.ReactNode;
}

export interface BackgroundPanelProps {
  images: string[];
  onSelectImage: (src: string) => void;
  onSelectColor: (hex: string) => void;
  selectedColor: string;
  onReset: () => void;
}

export interface ItemPanelProps {
  images: string[];
  onSelect: (src: string) => void;
  onReset: () => void;
}

export interface UploadPanelProps {
  onUpload: (src: string) => void;
}
