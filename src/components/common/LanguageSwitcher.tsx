"use client";

import { Button, Dropdown, MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useI18nStore } from "@/stores/i18n.store";
import { Locale } from "@/utils/i18n-dictionary";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18nStore();

  const items: MenuProps["items"] = [
    {
      key: "vi",
      label: "🇻🇳 Tiếng Việt",
      onClick: () => setLocale("vi"),
    },
    {
      key: "en",
      label: "🇺🇸 English",
      onClick: () => setLocale("en"),
    },
  ];

  return (
    <Dropdown menu={{ items, selectedKeys: [locale] }} trigger={["click"]}>
      <Button icon={<GlobalOutlined />} className="flex items-center text-xs font-medium">
        {locale === "vi" ? "VI" : "EN"}
      </Button>
    </Dropdown>
  );
}

