import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import OnboardingFlow from "@/components/OnboardingFlow";
import HomePage from "@/components/HomePage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"landing" | "onboarding" | "home">("landing");

  const handleGetStarted = () => {
    setCurrentPage("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setCurrentPage("landing");
  };

  if (currentPage === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <HomePage onLogout={handleLogout} />;
};

export default Index;
