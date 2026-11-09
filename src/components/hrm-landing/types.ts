import React from "react";

export interface DemoAccount {
  role: string;
  email: string;
  pass: string;
  desc: string;
  badge: string;
  color: string;
}

export interface HrmFeatureItem {
  icon: React.ReactNode;
  bg: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface RoleExperience {
  title: string;
  desc: string;
  points: string[];
  icon: React.ReactNode;
  tag: string;
}

export type RoleKey = "admin" | "manager" | "hr" | "employee";

