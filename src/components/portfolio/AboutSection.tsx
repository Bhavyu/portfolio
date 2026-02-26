import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "10+", label: "Awards Won" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="divider-accent mb-16" />

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-primary font-display text-sm uppercase tracking-[0.3em] mb-4"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-lg mb-8"
            >
              Passion meets{" "}
              <span className="text-gradient">precision</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-md text-muted-foreground mb-6"
            >
              I'm a creative developer who bridges the gap between design and
              technology. With a keen eye for aesthetics and a deep understanding
              of modern web technologies, I create experiences that are both
              beautiful and functional.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="body-md text-muted-foreground"
            >
              Every project is an opportunity to push boundaries, explore new
              techniques, and deliver something truly remarkable. I believe in
              the power of thoughtful design and clean, maintainable code.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover-lift text-center"
              >
                <span className="heading-lg text-gradient block mb-2">
                  {stat.number}
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
