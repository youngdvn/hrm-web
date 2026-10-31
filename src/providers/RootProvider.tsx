"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AntdProvider } from "./AntdProvider";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AntdProvider>{children}</AntdProvider>
    </QueryProvider>
  );
}

