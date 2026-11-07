"use client";

import { useRouter } from "next/navigation";
import { Card, Tag, Button } from "antd";
import {
  FileExclamationOutlined,
  ArrowRightOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { ExpiringContractItem } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface ExpiringContractsListProps {
  contracts: ExpiringContractItem[];
}

export function ExpiringContractsList({ contracts }: ExpiringContractsListProps) {
  const router = useRouter();
  const { t } = useI18nStore();

  if (!contracts || contracts.length === 0) return null;

  return (
    <Card
      title={
        <div className="flex items-center justify-between flex-wrap gap-2 py-1">
          <span className="font-semibold text-rose-600 flex items-center gap-2 text-sm md:text-base">
            <FileExclamationOutlined /> {t.dashboard.expiringContractsTitle}
          </span>
          <Button
            type="link"
            size="small"
            className="!px-0 text-rose-600 hover:text-rose-700 font-medium text-xs flex items-center gap-1"
            onClick={() => router.push("/contracts")}
          >
            {t.common.contracts} <ArrowRightOutlined className="text-[11px]" />
          </Button>
        </div>
      }
      className="shadow-xs border-rose-100 bg-rose-50/20"
    >
      <div className="divide-y divide-rose-100/60 max-h-64 overflow-y-auto pr-1">
        {contracts.map((item) => {
          const endDate = dayjs(item.endDate);
          const daysLeft = endDate.diff(dayjs(), "day");
          const isUrgent = daysLeft <= 7;

          return (
            <div
              key={item.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-800 text-sm flex items-center gap-2 flex-wrap">
                  <span>
                    {item.employee?.lastName} {item.employee?.firstName}
                  </span>
                  {item.employee?.employeeCode && (
                    <span className="text-xs text-slate-400">({item.employee.employeeCode})</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 truncate mt-1">
                  {t.contract.title}: <span className="font-medium">{item.contractNumber}</span> •{" "}
                  {t.contract.contractType}: {item.contractType} • {t.employee.department}:{" "}
                  {item.employee?.department?.name || t.common.unassigned}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Tag color={isUrgent ? "error" : "warning"} className="font-medium !mr-0">
                  {daysLeft >= 0 ? `Còn ${daysLeft} ngày (${endDate.format("DD/MM/YYYY")})` : `Đã hết hạn (${endDate.format("DD/MM/YYYY")})`}
                </Tag>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  className="text-xs"
                  onClick={() => router.push("/contracts")}
                >
                  {t.dashboard.manageNow}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
