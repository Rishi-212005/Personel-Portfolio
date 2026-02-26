import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./AnimationEffects";
import { FiUser, FiCpu, FiShoppingCart, FiShield, FiTrendingUp, FiBox } from "react-icons/fi";

const workingOnItems = [
  {
    icon: FiUser,
    title: "Online Portfolio Maker",
    description: "1-click portfolio generator — just enter your details and get a stunning portfolio instantly.",
    tag: "Web App",
  },
  {
    icon: FiTrendingUp,
    title: "AI Smart Pricing (ML)",
    description: "Machine learning-based dynamic pricing engine that predicts optimal prices using market data.",
    tag: "ML / AI",
  },
  {
    icon: FiShoppingCart,
    title: "AI-Powered Shopkeeper",
    description: "Intelligent inventory and sales management system powered by AI for small businesses.",
    tag: "AI / Full Stack",
  },
  {
    icon: FiBox,
    title: "Vendor Management System",
    description: "End-to-end vendor management platform with AI-driven insights and automation.",
    tag: "Full Stack",
  },
  {
    icon: FiShield,
    title: "SOC Analyst Course",
    description: "Currently pursuing SOC Analyst certification from Savory Minds to deepen cybersecurity expertise.",
    tag: "Cybersecurity",
  },
  {
    icon: FiCpu,
    title: "More ML Projects",
    description: "Exploring advanced machine learning applications — more exciting projects on the way!",
    tag: "Coming Soon",
  },
];

const ExploreMoreSection = () => {
  return (
    <section id="explore" className="section-padding-sm relative overflow-hidden">
      <div className="absolute inset-0 animated-bg opacity-15" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Working On" subtitle="Projects & learning currently in progress" />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workingOnItems.map((item, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card p-6 h-full flex flex-col items-center text-center group cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))",
                  }}
                />

                <motion.div
                  className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon size={26} />
                </motion.div>

                <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                  {item.tag}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ExploreMoreSection;
