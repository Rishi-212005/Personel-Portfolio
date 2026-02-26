import ScrollReveal from "./ScrollReveal";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <ScrollReveal className="text-center mb-16">
    <div className="inline-flex items-center gap-2 mb-3">
      <span className="w-8 h-px gradient-bg-solid" />
      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium font-mono-code">{title}</span>
      <span className="w-8 h-px gradient-bg-solid" />
    </div>
    <h2 className="heading-display text-4xl md:text-5xl glow-text mb-3">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-lg mx-auto text-base">{subtitle}</p>}
  </ScrollReveal>
);

export default SectionHeading;
