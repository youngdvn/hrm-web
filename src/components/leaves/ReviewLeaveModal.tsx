"use client";

import { useState } from "react";
import { Modal, Input } from "antd";
import { useI18nStore } from "@/stores/i18n.store";

interface ReviewLeaveModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmReject: (reason: string) => Promise<void>;
  isReviewing: boolean;
}

export default function ReviewLeaveModal({
  open,
  onClose,
  onConfirmReject,
  isReviewing,
}: ReviewLeaveModalProps) {
  const { t } = useI18nStore();
  const [rejectionReason, setRejectionReason] = useState("");

  const handleOk = async () => {
    await onConfirmReject(rejectionReason);
    setRejectionReason("");
    onClose();
  };

  return (
    <Modal
      open={open}
      title={t.leave.reject}
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={isReviewing}
      okButtonProps={{ danger: true }}
      okText={t.leave.reject}
      cancelText={t.common.cancel}
      destroyOnClose
    >
      <div className="py-2">
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          {t.leave.rejectReason}
        </label>
        <Input.TextArea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          rows={3}
          placeholder={t.leave.rejectReason}
        />
      </div>
    </Modal>
  );
}
