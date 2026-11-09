"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import {
  HrmHeader,
  HrmMobileDrawer,
  HrmHero,
  HrmMetrics,
  HrmFeatures,
  HrmRoles,
  HrmWorkflow,
  HrmSecurity,
  HrmCta,
  HrmFooter,
  HrmDemoModal,
  HrmScrollToTop,
  getDemoAccounts,
  getHrmFeatures,
  getRoleExperiences,
  RoleKey,
} from "@/components/hrm-landing";
import { LoginModal } from "@/components/landing/LoginModal";

export default function HrmLandingPage() {
  const { isAuthenticated } = useAuthStore();
  const { locale } = useI18nStore();
  const [mounted, setMounted] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isVi = locale === "vi";

  // Memoized landing content data based on current locale
  const demoAccounts = useMemo(() => getDemoAccounts(isVi), [isVi]);
  const features = useMemo(() => getHrmFeatures(isVi), [isVi]);
  const roleExperiences = useMemo(() => getRoleExperiences(isVi), [isVi]);

  const handleSelectRole = (role: RoleKey) => {
    // Open demo modal or login modal for testing
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* 1. Header with RBAC Profile Dropdown & Navigation */}
      <HrmHeader
        isVi={isVi}
        mounted={mounted}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* 2. Responsive Mobile Drawer */}
      <HrmMobileDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        isVi={isVi}
        mounted={mounted}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* 3. Hero Section with Live Mockup Dashboard */}
      <HrmHero
        isVi={isVi}
        mounted={mounted}
        isAuthenticated={isAuthenticated}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* 4. Operational Metrics Counter */}
      <HrmMetrics isVi={isVi} />

      {/* 5. Core Capabilities Bento Grid */}
      <HrmFeatures
        isVi={isVi}
        features={features}
        onFeatureClick={() => setDemoModalOpen(true)}
      />

      {/* 6. Role-Based Experiences (Admin, Manager, HR, Employee) */}
      <HrmRoles
        isVi={isVi}
        roleExperiences={roleExperiences}
        onSelectRole={handleSelectRole}
      />

      {/* 7. 3-Step Setup & Daily Operations Workflow */}
      <HrmWorkflow isVi={isVi} />

      {/* 8. Enterprise Security & Audit Trail */}
      <HrmSecurity
        isVi={isVi}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* 10. High-Impact Call to Action */}
      <HrmCta
        isVi={isVi}
        mounted={mounted}
        isAuthenticated={isAuthenticated}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* 11. Footer */}
      <HrmFooter
        isVi={isVi}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* Demo Credentials Modal with 1-click copy */}
      <HrmDemoModal
        open={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        isVi={isVi}
        demoAccounts={demoAccounts}
        onOpenLogin={() => {
          setDemoModalOpen(false);
          setLoginModalOpen(true);
        }}
      />

      {/* Clean In-page Login Modal (keeps user on home page after login) */}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        isVi={isVi}
      />

      {/* Floating Scroll To Top Button with Circular Progress & Framer Motion */}
      <HrmScrollToTop isVi={isVi} threshold={250} />
    </div>
  );
}
