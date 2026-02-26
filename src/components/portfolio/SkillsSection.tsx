import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Smartphone, Zap, Globe, Layers } from "lucide-react";

const skills = [
  { icon: Code2, title: "Frontend Dev", description: "React, TypeScript, Next.js, and modern CSS frameworks." },
  { icon: Palette, title: "UI/UX Design", description: "Figma, prototyping, design systems, and user research." },
  { icon: Smartphone, title: "Responsive", description: "Mobile-first design with fluid layouts and adaptive UIs." },
  { icon: Zap, title: "Performance", description: "Core Web Vitals optimization, lazy loading, and caching." },
  { icon: Globe, title: "Full Stack", description: "Node.js, databases, REST APIs, and cloud deployment." },
  { icon: Layers, title: "Animation", description: "Framer Motion, GSAP, CSS animations, and micro-interactions." },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="divider-accent mb-16" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4"
        >
          Expertise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-lg mb-16"
        >
          What I{" "}
          <span className="text-gradient">do best</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: "hsl(12 80% 62%)" }}
              className="bg-card border border-border rounded-xl p-8 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <skill.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-3">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
