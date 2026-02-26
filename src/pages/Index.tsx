import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { AdminBar } from "@/components/AuthModal";
import AIChatbot from "@/components/AIChatbot";
import EditModeToggle from "@/components/EditModeToggle";
import AdminInbox from "@/components/AdminInbox";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ExploreMoreSection />
      <ContactSection />
    </main>
    <Footer />
    <BackToTop />
    <AdminBar />
    <EditModeToggle />
    <AdminInbox />
    <AIChatbot />
  </div>
);

export default Index;
