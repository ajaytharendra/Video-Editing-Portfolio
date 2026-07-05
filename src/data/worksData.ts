export type WorkItem = {
  id: number;
  title: string;
  category: string;
  type: '9:16' | '16:9';
  src?: string;       // Path to your video file, e.g. '/videos/my-reel.mp4'
  thumbnail?: string; // Optional thumbnail image, e.g. '/thumbnails/my-reel.jpg'
  startTime?: number;
  endTime?: number;
  objectFit?: 'cover' | 'contain';
  rotate?: 'left' | 'right' | 'none';
  noAudio?: boolean;
  youtubeId?: string;
};

export const worksData: Record<string, WorkItem[]> = {
  REELS: [
    { id: 1, title: 'After Video', category: 'Reel', type: '9:16', src: "/videos/Irizz_final.mp4" },
    { id: 2, title: 'Celebration Videos', category: 'Reel', type: '9:16', src: "/videos/Pongal_2k25.mp4", youtubeId: "pzo8_dhGe2c" },
    { id: 3, title: 'Moments to remember', category: 'Reel', type: '9:16', src: "/videos/nalangu.mp4" },
    { id: 22, title: 'Marketing Reels', category: 'Reel', type: '9:16', src: "/videos/V_square_developers.mp4", youtubeId: "J1Hiv5MfUCk" },
    { id: 26, title: 'Food Vlogs', category: 'Reel', type: '9:16', src: "/videos/The_dessert_company_f.mp4", youtubeId: "rG1Ore1mTQ8" },
  ],
  'PROMOTIONAL VIDEOS': [
    { id: 4, title: 'After Videos', category: 'Promo', type: '9:16', src: "/videos/Halloween_Aftervideo.mp4" },
    { id: 5, title: 'Face Videos', category: 'Promo', type: '9:16', src: "/videos/Face Video.mp4" },
    { id: 6, title: 'Movie Campaigns', category: 'Promo', type: '9:16', src: "/videos/youth.mp4", youtubeId: "CQT3T9zkCdU" },
    { id: 17, title: 'Marketing Videos', category: 'Promo', type: '9:16', src: "/videos/VSR_1.mp4", youtubeId: "01fE4IqCbDM" },
    { id: 23, title: 'Visual Storytelling', category: 'Promo', type: '9:16', src: "/videos/Node js.mp4" },
    { id: 24, title: 'Guest Videos', category: 'Promo', type: '9:16', src: "/videos/Karthik_devaraj_.mp4" },
    { id: 25, title: 'Guest Videos', category: 'Promo', type: '9:16', src: "/videos/VAIZAG_1.mp4", youtubeId: "-oVR6vvIaf8" },
    { id: 31, title: 'Sunita Williams', category: 'Promo', type: '9:16', src: "/videos/Sunita_williams_1.mp4", youtubeId: "qib4uU4uVGg" },
  ],
  'CONCERT EDITS': [
    { id: 7, title: 'Sana-The One', category: 'Concert', type: '16:9', src: "/videos/Sana 1.mp4", youtubeId: "dO28skTa-rI" },
    { id: 8, title: 'Jonita Gandhi', category: 'Concert', type: '9:16', src: "/videos/Jonita_NIT.mp4" },
    { id: 9, title: 'Rare Piece Vanjaram', category: 'Concert', type: '9:16', src: "/videos/Rare Piece Vanjaram .mp4", youtubeId: "jgC9-2-QmDE" },
    { id: 32, title: 'Sana - Day 2', category: 'Concert', type: '16:9', src: "/videos/Sana_Day 2.mp4", youtubeId: "EucwAc2bt9g" },
  ],
  'CULTURAL PROMOS': [
    { id: 10, title: 'Concert Promo', category: 'Cultural', type: '9:16', src: "/videos/Sana_Pranesh.mp4", youtubeId: "gr6k_xlT5SY" },
    { id: 12, title: 'Cinematic Promo', category: 'Cultural', type: '16:9', src: "/videos/Halloween.mp4" },
  ],
  'MASHUPS':[
    { id: 13, title: 'Atharva Murali', category: 'Mashup', type: '16:9', src: "/videos/Mashup 1.mp4"},
    { id: 14, title: 'Chinna Kuyil Chitra', category: 'Mashup', type: '16:9', src: "/videos/Mashup 2.mp4"},
    { id: 21, title: 'Guest Reveal', category: 'Mashup', type: '16:9', src: "/videos/VJ.mp4", youtubeId: "PWkusk98VIU" },
  ],
  'LYRICAL VIDEO':[
    { id: 16, title: 'Thoorigai-Short film', category: 'Lyric Video', type: '16:9', src: "/videos/Lyrical Video.mp4"}
  ]
};
