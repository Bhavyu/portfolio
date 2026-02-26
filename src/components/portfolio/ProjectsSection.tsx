import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    title: "Dashboard Analytics",
    category: "Web Application",
    description: "A modern analytics dashboard with real-time data visualization and dark mode interface.",
    image: project1,
    tags: ["React", "TypeScript", "D3.js"],
  },
  {
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Complete e-commerce solution with payment integration, inventory management and CMS.",
    image: project2,
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Brand Identity System",
    category: "Design & Development",
    description: "Comprehensive brand identity including logo, guidelines, and digital assets.",
    image: project3,
    tags: ["Figma", "Motion", "Branding"],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border hover-lift">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ArrowUpRight className="text-primary-foreground" size={24} />
            </motion.div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-6">
          <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2 font-display">
            {project.category}
          </p>
          <h3 className="heading-md mb-3">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="divider-accent mb-16" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-lg mb-16"
        >
          Projects that{" "}
          <span className="text-gradient">speak</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
