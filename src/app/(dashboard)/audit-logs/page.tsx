"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Typography,
  Input,
  Select,
  DatePicker,
  Button,
  Modal,
  Space,
} from "antd";
import {
  SafetyCertificateOutlined,
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAuditLogs } from "@/hooks/useAuditLogs";
import { RoleGuard } from "@/components/common/RoleGuard";
import { AuditLog } from "@/types/audit.types";

const { Title, Text } = Typography;

export default function AuditLogsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [action, setAction] = useState<string | undefined>(undefined);
  const [entity, setEntity] = useState<string | undefined>(undefined);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { logs, meta, isLoading, isFetching, refetch } = useAuditLogs({
    page,
    limit,
    action,
    entity,
  });

  const getActionColor = (act: string) => {
    if (act.includes("LOGIN")) return "blue";
    if (act.includes("CREATE")) return "green";
    if (act.includes("UPDATE")) return "gold";
    if (act.includes("DELETE")) return "red";
    if (act.includes("PASSWORD")) return "purple";
    return "cyan";
  };

  const columns: ColumnsType<AuditLog> = [
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 170,
      render: (d) => (
        <span className="font-mono text-xs text-slate-600">
          {dayjs(d).format("DD/MM/YYYY HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "Người thực hiện",
      key: "user",
      render: (_, r) => (
        <div>
          <div className="font-medium text-slate-800">{r.user?.fullName || "Hệ thống"}</div>
          <div className="text-xs text-slate-400">{r.user?.email || "System"}</div>
        </div>
      ),
    },
    {
      title: "Hành động (Action)",
      dataIndex: "action",
      key: "action",
      render: (act) => <Tag color={getActionColor(act)}>{act}</Tag>,
    },
    {
      title: "Đối tượng (Entity)",
      dataIndex: "entity",
      key: "entity",
      render: (ent, r) => (
        <span className="text-xs font-semibold text-slate-700">
          {ent} {r.entityId ? `(#${r.entityId.slice(0, 8)}...)` : ""}
        </span>
      ),
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      render: (ip) => <span className="font-mono text-xs">{ip || "---"}</span>,
    },
    {
      title: "Chi tiết",
      key: "details",
      width: 90,
      render: (_, r) => (
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedLog(r);
            setDetailModalOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div>
          <Title level={3} className="!mb-1 flex items-center gap-2">
            <SafetyCertificateOutlined className="text-blue-600" /> Nhật ký Kiểm toán Hệ thống
          </Title>
          <Text type="secondary">
            Ghi nhận toàn bộ thao tác bảo mật, đăng nhập và thay đổi dữ liệu của người dùng
          </Text>
        </div>

        <Card className="shadow-xs border-slate-200">
          <div className="flex flex-wrap gap-3 mb-4">
            <Input
              placeholder="Lọc theo hành động (VD: AUTH_LOGIN)..."
              value={action}
              onChange={(e) => {
                setAction(e.target.value || undefined);
                setPage(1);
              }}
              allowClear
              className="w-64"
            />

            <Input
              placeholder="Lọc theo thực thể (VD: Employee)..."
              value={entity}
              onChange={(e) => {
                setEntity(e.target.value || undefined);
                setPage(1);
              }}
              allowClear
              className="w-56"
            />

            <Button
              icon={<ReloadOutlined spin={isFetching} />}
              onClick={() => refetch()}
            >
              Làm mới
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={logs}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: meta?.page || page,
              pageSize: meta?.limit || limit,
              total: meta?.total || 0,
              showSizeChanger: true,
              pageSizeOptions: ["20", "50", "100"],
              onChange: (p, l) => {
                setPage(p);
                setLimit(l);
              },
            }}
          />
        </Card>

        {/* Modal View Audit Log JSON Details */}
        <Modal
          open={detailModalOpen}
          title="Chi tiết Nhật ký Kiểm toán"
          onCancel={() => setDetailModalOpen(false)}
          footer={[
            <Button key="close" type="primary" onClick={() => setDetailModalOpen(false)}>
              Đóng
            </Button>,
          ]}
          width={650}
        >
          {selectedLog && (
            <div className="space-y-3 py-2 text-xs">
              <div>
                <span className="font-semibold text-slate-600">User Agent:</span>{" "}
                <span className="text-slate-500 break-all">{selectedLog.userAgent || "---"}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600">Dữ liệu chi tiết (Payload):</span>
                <pre className="mt-1 p-3 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-[11px]">
                  {JSON.stringify(selectedLog.details || {}, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </RoleGuard>
  );
}

