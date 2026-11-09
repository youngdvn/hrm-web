import { ReactNode } from "react";

export interface DeliverableCategory {
  category: string;
  iconName: string;
  items: string[];
}

export interface Milestone {
  step: string;
  phase: string;
  duration: string;
  description: string;
}

export interface FreeGift {
  name: string;
  value: string;
  desc: string;
}

export interface PackageFaq {
  q: string;
  a: string;
}

export interface WebPackage {
  id: string;
  code: string;
  name: string;
  badge: string;
  badgeColor: string;
  price: number;
  priceStr: string;
  timeline: string;
  target: string;
  icon: ReactNode;
  features: string[];
  border: string;
  popular: boolean;

  // Rich Detail Fields
  tagline?: string;
  fullDescription?: string;
  suitableFor?: string[];
  deliverables?: DeliverableCategory[];
  milestones?: Milestone[];
  techStack?: { name: string; desc: string }[];
  freeGifts?: FreeGift[];
  packageFaqs?: PackageFaq[];
}

export interface AdvantageItem {
  icon: ReactNode;
  bg: string;
  title: string;
  desc: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface PortfolioProject {
  title: string;
  category: string;
  desc: string;
  badge: string;
  color: string;
}
