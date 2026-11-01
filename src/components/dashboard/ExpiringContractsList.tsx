"use client";

import { Card, Tag } from "antd";
import { FileExclamationOutlined } from "@ant-design/icons";
import { ExpiringContractItem } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface ExpiringContractsListProps {
  contracts: ExpiringContractItem[];
}

export function ExpiringContractsList({ contracts }: ExpiringContractsListProps) {
  const { t } = useI18nStore();
  if (!contracts || contracts.length === 0) return null;

  return (
    <Card
      title={
        <span className="font-semibold text-rose-600 flex items-center gap-2">
          <FileExclamationOutlined /> {t.dashboard.expiringContractsTitle}
        </span>
      }
      className="shadow-xs border-rose-100 bg-rose-50/20"
    >
      <div className="divide-y divide-rose-100/60">
        {contracts.map((item) => (
          <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <div className="font-medium text-slate-800 text-sm">
                {item.employee?.lastName} {item.employee?.firstName} ({item.employee?.employeeCode})
              </div>
              <div className="text-xs text-slate-500 truncate mt-0.5">
                Hợp đồng: {item.contractNumber} • Loại: {item.contractType} • Phòng: {item.employee?.department?.name || "Chưa rõ"}
              </div>
            </div>
            <Tag color="error" className="shrink-0">
              Hết hạn: {new Date(item.endDate).toLocaleDateString("vi-VN")}
            </Tag>
          </div>
        ))}
      </div>
    </Card>
  );
}

