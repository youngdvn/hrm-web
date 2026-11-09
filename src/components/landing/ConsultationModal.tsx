"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import { request } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { WebPackage } from "./types";

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  isVi: boolean;
  selectedPkg?: WebPackage | null;
}

export function ConsultationModal({
  open,
  onClose,
  isVi,
  selectedPkg,
}: ConsultationModalProps) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        packageCode: selectedPkg ? selectedPkg.name : "Gói Doanh Nghiệp Tiêu Chuẩn",
      });
    }
  }, [open, selectedPkg, form]);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      await request.post("sales/customers", {
        name: values.fullName,
        phone: values.phone,
        email: values.email,
        company: values.company,
        status: "LEAD",
        notes: `Khách hàng đăng ký gói: ${selectedPkg?.name || values.packageCode}. Yêu cầu: ${values.notes || "Không có"}`,
      });
      message.success(
        isVi
          ? "Đã gửi thông tin thành công! Chuyên viên tư vấn sẽ liên hệ lại với bạn trong vòng 15 phút."
          : "Consultation request received! Our specialist will reach out within 15 minutes."
      );
      onClose();
      form.resetFields();
    } catch {
      message.success(
        isVi
          ? "Cảm ơn bạn! Chúng tôi đã ghi nhận yêu cầu và sẽ liên hệ hỗ trợ bạn sớm nhất."
          : "Thank you! We have received your request and will contact you shortly."
      );
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <RocketOutlined className="text-blue-600" />
          <span className="font-bold text-slate-900">
            {isVi
              ? "Đăng Ký Tư Vấn & Nhận Báo Giá Website Miễn Phí"
              : "Request Free Website Quote & Consultation"}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={submitting}
      width={580}
      okText={isVi ? "Gửi Yêu Cầu Tư Vấn" : "Submit Request"}
      cancelText={isVi ? "Hủy" : "Cancel"}
    >
      <div className="mb-4 p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
        <div>
          <div className="text-xs text-blue-600 font-medium">
            {isVi ? "Gói dịch vụ quan tâm:" : "Interested Plan:"}
          </div>
          <div className="text-base font-bold text-slate-900">
            {selectedPkg?.name || "Gói Tiêu Chuẩn"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">
            {isVi ? "Mức giá trọn gói:" : "Package Price:"}
          </div>
          <div className="text-lg font-black text-blue-700">
            {selectedPkg?.priceStr || "18.500.000 ₫"}
          </div>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={isVi ? "Họ Và Tên Của Bạn" : "Your Full Name"}
          name="fullName"
          rules={[
            {
              required: true,
              message: isVi ? "Vui lòng nhập họ tên" : "Please enter your name",
            },
          ]}
        >
          <Input placeholder={isVi ? "Nguyễn Văn A" : "John Doe"} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={isVi ? "Số Điện Thoại Zalo / Hotline" : "Phone Number"}
              name="phone"
              rules={[
                {
                  required: true,
                  message: isVi ? "Vui lòng nhập số điện thoại" : "Please enter your phone",
                },
              ]}
            >
              <Input placeholder="0901234567" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={isVi ? "Email Nhận Bản Báo Giá" : "Email Address"}
              name="email"
              rules={[
                {
                  type: "email",
                  message: isVi ? "Email không hợp lệ" : "Invalid email",
                },
              ]}
            >
              <Input placeholder="contact@company.vn" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={isVi ? "Tên Công Ty / Doanh Nghiệp (Nếu có)" : "Company Name (Optional)"}
          name="company"
        >
          <Input placeholder={isVi ? "Công ty CP / TNHH..." : "Acme Corp"} />
        </Form.Item>

        <Form.Item
          label={isVi ? "Mô Tả Nhu Cầu / Ghi Chú Đặc Biệt" : "Project Requirements & Notes"}
          name="notes"
        >
          <Input.TextArea
            rows={3}
            placeholder={
              isVi
                ? "Ví dụ: Cần website giới thiệu công ty bất động sản, tích hợp thanh toán VietQR, cần bàn giao trước ngày 20..."
                : "E.g., Need real estate corporate portal with VietQR and VR 360 virtual tour..."
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

