export type AnimationItem = {
  id: number;
  title: string;
  category: string;
  type: '9:16' | '16:9' | '1:1';
  src?: string;       // e.g. '/videos/morphic-dreamscape.mp4'
  thumbnail?: string; // e.g. '/thumbnails/morphic-dreamscape.jpg'
  startTime?: number;
  endTime?: number;
  objectFit?: 'cover' | 'contain';
  rotate?: 'left' | 'right' | 'none';
  noAudio?: boolean;
};

export const twoDAnimations: AnimationItem[] = [
  { id: 1, title: 'Recreations', category: '2D Animation', type: '16:9', src: "/videos/2d Animation 1.mp4"},
  { id: 2, title: 'Smooth Loops', category: '2D Animation', type: '1:1', src:"/videos/2d Animation.mp4"},
  { id: 3, title: 'Invitations', category: '2D Animation', type: '16:9', src:"/videos/Invitation-1.mp4"},
];

export const titleAnimations: AnimationItem[] = [
  { id: 18, title: 'Movie title recreation', category: 'Title Animation', type: '16:9', src: "/videos/Title.mp4" },
  { id: 19, title: 'Motion Titles', category: 'Title Animation', type: '16:9', src: "/videos/Halloween.mp4", startTime: -20, endTime: -0.1 },
  { id: 30, title: 'Recreations', category: 'Title Animation', type: '16:9', src: "/videos/Diw.mp4" },
];

export const Motionposter: AnimationItem[] = [
  { id: 4, title: 'Trophy Event', category: 'Motion Poster', type: '9:16', src: "/videos/CCL.mp4" },
  { id: 5, title: 'After Video', category: 'Motion Poster', type: '9:16', src:"/videos/Motion.mp4"},
  { id: 6, title: 'Event Promo Poster', category: 'Motion Poster', type: '16:9', src: "/videos/Comp 1.mp4" },
  { id: 20, title: 'Cinematic Posters', category: 'Motion Poster', type: '16:9', src: "/videos/Suriya.mp4", noAudio: true },
];
