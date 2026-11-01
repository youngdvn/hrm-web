"use client";

import { Modal, Button } from "antd";
import { AuditLog } from "@/types/audit.types";

interface JsonDetailModalProps {
  open: boolean;
  log: AuditLog | null;
  onClose: () => void;
}

export default function JsonDetailModal({
  open,
  log,
  onClose,
}: JsonDetailModalProps) {
  return (
    <Modal
      open={open}
      title="Chi tiết Nhật ký Kiểm toán"
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={650}
      destroyOnClose
    >
      {log && (
        <div className="space-y-3 py-2 text-xs">
          <div>
            <span className="font-semibold text-slate-600">User Agent:</span>{" "}
            <span className="text-slate-500 break-all">{log.userAgent || "---"}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-600">Dữ liệu chi tiết (Payload):</span>
            <pre className="mt-1 p-3 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-[11px]">
              {JSON.stringify(log.details || {}, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </Modal>
  );
}

