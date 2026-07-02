import { useEffect, useRef } from 'react';
import { 
  Video, 
  Wand2, 
  MonitorPlay, 
  Sparkles, 
  Briefcase 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Video, label: 'Video Editing' },
  { icon: Wand2, label: 'Motion Graphics' },
  { icon: MonitorPlay, label: 'Promotional Videos' },
  { icon: Sparkles, label: 'AI-Assisted Creative' },
  { icon: Briefcase, label: 'Branding Content' }
];

const software = ['After Effects', 'Premiere Pro', 'Photoshop'];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Avatar fade up
      gsap.fromTo(avatarRef.current, {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: avatarRef.current,
          start: 'top 85%',
        }
      });

      // Content staggered fade up
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(children, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 sm:py-40 px-6 w-full max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32 items-center">
        
        {/* Avatar Side */}
        <div 
          ref={avatarRef}
          className="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden opacity-0"
        >
          {/* Subtle Image Masking / Background Frame */}
          <div className="absolute inset-0 bg-card rounded-sm flex items-center justify-center overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-background to-card-border/20 opacity-50" />
            <h2 className="text-[12rem] font-serif text-white/5 z-0 select-none tracking-tighter absolute">AJ</h2>
            <img 
              src="/Posters/Ajay.png" 
              alt="Ajay Tharendra" 
              className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className="flex flex-col">
          <div className="mb-10 opacity-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 font-mono mb-6 block">
              The Editor
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-foreground mb-6 leading-tight tracking-tight">
              Ajay Tharendra
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70 tracking-wide uppercase">
              <span>Creative Video Editor</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20 hidden sm:block" />
              <span>Motion Designer</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed mb-12 max-w-2xl font-light opacity-0">
            I'm Ajay Tharendra, a student freelancer with 3+ years of experience, over 500+ videos edited, and 10+ clients served. I am passionate about transforming ideas into cinematic visual experiences. I specialize in video editing, motion graphics, promotional films, AI-assisted creative workflows, and brand-focused content that captures attention and tells compelling stories. From concert promotions and cultural events to social media campaigns and title animations, I enjoy blending creativity with precision to create work that feels polished, engaging, and memorable.
          </p>

          {/* Grid Container for stats, expertise, and software */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-white/5 opacity-0">
            {/* Box 1: Experience & Stats */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-5 font-mono">Experience</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-foreground/80">
                  <Briefcase className="w-3.5 h-3.5 text-foreground/50 shrink-0" />
                  <span>3+ Years Exp</span>
                </div>
                <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-foreground/80">
                  <Video className="w-3.5 h-3.5 text-foreground/50 shrink-0" />
                  <span>500+ Edits</span>
                </div>
                <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-foreground/80">
                  <Sparkles className="w-3.5 h-3.5 text-foreground/50 shrink-0" />
                  <span>10+ Clients</span>
                </div>
              </div>
            </div>

            {/* Box 2: Expertise */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-5 font-mono">Expertise</h3>
              <div className="flex flex-col gap-3">
                {skills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs tracking-wider uppercase text-foreground/80">
                    <skill.icon className="w-3.5 h-3.5 text-foreground/50 shrink-0" />
                    <span>{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Software Stack */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-5 font-mono">Software</h3>
              <div className="flex flex-wrap gap-2">
                {software.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-[10px] tracking-wider uppercase text-foreground/70 bg-white/[0.02] border border-white/5 rounded-sm hover:border-white/20 hover:text-foreground transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
