"use client";

import { useState } from "react";
import { Modal, Input } from "antd";

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
  const [rejectionReason, setRejectionReason] = useState("");

  const handleOk = async () => {
    await onConfirmReject(rejectionReason);
    setRejectionReason("");
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Từ chối đơn xin nghỉ phép"
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={isReviewing}
      okButtonProps={{ danger: true }}
      okText="Xác nhận từ chối"
      destroyOnClose
    >
      <div className="py-2">
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          Lý do từ chối (tùy chọn)
        </label>
        <Input.TextArea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          rows={3}
          placeholder="Nhập lý do không phê duyệt..."
        />
      </div>
    </Modal>
  );
}

