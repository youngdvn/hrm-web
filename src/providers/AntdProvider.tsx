"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App as AntdApp } from "antd";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import { ReactNode, useEffect, useState } from "react";
import { useI18nStore } from "@/stores/i18n.store";
import { AntdStaticBridge } from "@/lib/antd-app";

export function AntdProvider({ children }: { children: ReactNode }) {
  const { locale } = useI18nStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLocale = mounted ? (locale === "vi" ? viVN : enUS) : viVN;

  return (
    <AntdRegistry>
      <ConfigProvider
        locale={currentLocale}
        theme={{
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 8,
            fontFamily:
              "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          },
          components: {
            Button: {
              controlHeight: 38,
              borderRadius: 6,
            },
            Input: {
              controlHeight: 38,
              borderRadius: 6,
            },
            Select: {
              controlHeight: 38,
              borderRadius: 6,
            },
            Table: {
              borderRadiusLG: 8,
            },
            Card: {
              borderRadiusLG: 10,
            },
          },
        }}
      >
        <AntdApp>
          <AntdStaticBridge />
          {children}
        </AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  );
}
