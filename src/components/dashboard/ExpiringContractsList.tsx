"use client";

import { Card, List, Tag } from "antd";
import { FileExclamationOutlined } from "@ant-design/icons";
import { ExpiringContractItem } from "@/types/dashboard.types";

interface ExpiringContractsListProps {
  contracts: ExpiringContractItem[];
}

export function ExpiringContractsList({ contracts }: ExpiringContractsListProps) {
  if (!contracts || contracts.length === 0) return null;

  return (
    <Card
      title={
        <span className="font-semibold text-rose-600 flex items-center gap-2">
          <FileExclamationOutlined /> Hợp đồng lao động cần gia hạn (30 ngày tới)
        </span>
      }
      className="shadow-xs border-rose-100 bg-rose-50/20"
    >
      <List
        size="small"
        dataSource={contracts}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Tag key="date" color="error">
                Hết hạn: {new Date(item.endDate).toLocaleDateString("vi-VN")}
              </Tag>,
            ]}
          >
            <List.Item.Meta
              title={
                <span className="font-medium text-slate-800">
                  {item.employee?.lastName} {item.employee?.firstName} ({item.employee?.employeeCode})
                </span>
              }
              description={`Hợp đồng: ${item.contractNumber} • Loại: ${item.contractType} • Phòng: ${item.employee?.department?.name || "Chưa rõ"
                }`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

