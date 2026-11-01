"use client";

import { Modal, Button } from "antd";
import { AuditLog } from "@/types/audit.types";
import { useI18nStore } from "@/stores/i18n.store";

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
  const { t } = useI18nStore();

  return (
    <Modal
      open={open}
      title={t.audit.details}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          {t.common.close}
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
            <span className="font-semibold text-slate-600">{t.audit.detailsPayload}</span>
            <pre className="mt-1 p-3 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto text-[11px]">
              {JSON.stringify(log.details || {}, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </Modal>
  );
}

