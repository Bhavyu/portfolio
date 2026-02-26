const MarqueeText = () => {
  const text = "CREATIVE • DEVELOPER • DESIGNER • INNOVATOR • ";
  const repeated = text.repeat(4);

  return (
    <div className="overflow-hidden py-8 border-y border-border/50">
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-display text-6xl md:text-8xl font-bold text-muted-foreground/10 uppercase tracking-wider">
          {repeated}
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;
