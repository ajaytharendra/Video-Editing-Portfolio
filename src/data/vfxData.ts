import { animations } from "framer-motion";

export type VFXItem = {
  id: number;
  title: string;
  category: string;
  type: '16:9';
  src?: string;       // e.g. '/videos/particle-storm.mp4'
  thumbnail?: string; // e.g. '/thumbnails/particle-storm.jpg'
  startTime?: number;
  endTime?: number;
  objectFit?: 'cover' | 'contain';
  rotate?: 'left' | 'right' | 'none';
  noAudio?: boolean;
};

export const vfxData: VFXItem[] = [
  { id: 1, title: 'World Built with VFX', category: 'VFX', type: '16:9', src: "/videos/VFX.mp4" },
  { id: 27, title: 'Cinematic VFX', category: 'VFX', type: '16:9', src: "/videos/Halloween.mp4" },
];
