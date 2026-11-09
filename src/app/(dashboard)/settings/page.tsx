"use client";

import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  Typography,
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Tag,
  Divider,
  Alert,
  Select,
} from "antd";
import {
  SaveOutlined,
  SettingOutlined,
  ShopOutlined,
  FieldTimeOutlined,
  DollarCircleOutlined,
  BellOutlined,
  EnvironmentOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { useAuthStore } from "@/stores/auth.store";

const { Title, Text } = Typography;

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { hasRole } = useAuthStore();
  const isAdmin = hasRole(["ADMIN"]);

  // Fetch Current Settings
  const { data: settings, isLoading } = useQuery<Record<string, string>>({
    queryKey: ["system-settings"],
    queryFn: async () => {
      const res = await request.get<Record<string, string>>("settings");
      return res.data || {};
    },
  });

  useEffect(() => {
    if (settings) {
      form.setFieldsValue(settings);
    }
  }, [settings, form]);

  // Save Settings Mutation
  const saveMutation = useMutation({
    mutationFn: async (values: Record<string, any>) => {
      return request.put("settings", values);
    },
    onSuccess: () => {
      message.success("Cập nhật cấu hình hệ thống thành công!");
      queryClient.invalidateQueries({ queryKey: ["system-settings"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const tabItems = [
    {
      key: "company",
      label: (
        <span className="flex items-center gap-1.5 font-medium">
          <ShopOutlined />
          Thông Tin Doanh Nghiệp
        </span>
      ),
      children: (
        <div className="space-y-4 pt-2">
          <Alert
            message="Thông tin pháp nhân & Thương hiệu doanh nghiệp"
            description="Các thông tin dưới đây sẽ được sử dụng trên Bảng lương, Hóa đơn tài chính, Hợp đồng lao động và Tiêu đề hệ thống."
            type="info"
            showIcon
            className="mb-4 text-xs"
          />

          <Row gutter={16}>
            <Col xs={24} md={16}>
              <Form.Item
                label="Tên Doanh Nghiệp / Công Ty"
                name="companyName"
                rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
              >
                <Input placeholder="Tập Đoàn Công Nghệ HRM Enterprise..." disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Mã Số Thuế (MST)" name="companyTaxId">
                <Input placeholder="0109887766" disabled={!isAdmin} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="Email Liên Hệ Chính Thức" name="companyEmail">
                <Input placeholder="contact@company.com" disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Số Điện Thoại Hotline" name="companyPhone">
                <Input placeholder="024.3999.8888" disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Đơn Vị Tiền Tệ Mặc Định" name="currency">
                <Select
                  disabled={!isAdmin}
                  options={[
                    { value: "VND", label: "VNĐ (Việt Nam Đồng)" },
                    { value: "USD", label: "USD (Đô la Mỹ)" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Địa Chỉ Trụ Sở Chính" name="companyAddress">
            <Input placeholder="Tầng 18, Tòa nhà Landmark..." disabled={!isAdmin} />
          </Form.Item>

          <Form.Item label="Website Chính Thức" name="companyWebsite">
            <Input placeholder="https://company.vn" disabled={!isAdmin} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: "attendance",
      label: (
        <span className="flex items-center gap-1.5 font-medium">
          <FieldTimeOutlined />
          Chấm Công & Ca Làm Việc
        </span>
      ),
      children: (
        <div className="space-y-4 pt-2">
          <Alert
            message="Quy chế thời gian làm việc & Bán kính chấm công GPS"
            description="Hệ thống tự động so khớp giờ check-in thực tế với cấu hình dưới đây để đánh dấu trạng thái Đúng giờ, Đi muộn hoặc Về sớm."
            type="info"
            showIcon
            className="mb-4 text-xs"
          />

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Giờ Bắt Đầu Ca Sáng"
                name="workStartTime"
                tooltip="Mặc định: 08:30"
              >
                <Input placeholder="08:30" disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Giờ Kết Thúc Ca Chiều"
                name="workEndTime"
                tooltip="Mặc định: 17:30"
              >
                <Input placeholder="17:30" disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Cho Phép Đi Muộn Tối Đa (Phút)"
                name="allowedLateMinutes"
                tooltip="Không tính phạt nếu check-in trong khoảng này"
              >
                <InputNumber min={0} max={60} className="w-full" disabled={!isAdmin} />
              </Form.Item>
            </Col>
          </Row>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider my-3 pb-1 border-b border-slate-100">
            ĐỊNH VỊ GPS VĂN PHÒNG
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Vĩ Độ Trụ Sở (Latitude)"
                name="companyLatitude"
                tooltip="Tọa độ văn phòng chính thức"
              >
                <Input placeholder="21.0168" disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Kinh Độ Trụ Sở (Longitude)"
                name="companyLongitude"
                tooltip="Tọa độ văn phòng chính thức"
              >
                <Input placeholder="105.7838" disabled={!isAdmin} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Bán Kính Chấm Công Cho Phép (Mét)"
                name="gpsRadiusMeters"
                tooltip="Khoảng cách tối đa từ vị trí nhân viên đến văn phòng"
              >
                <InputNumber min={50} max={5000} className="w-full" disabled={!isAdmin} addonAfter="mét" />
              </Form.Item>
            </Col>
          </Row>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider my-3 pb-1 border-b border-slate-100">
            HỆ SỐ LƯƠNG LÀM THÊM GIỜ (OT MULTIPLIERS)
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="Làm Thêm Ngày Thường (OT)" name="otNormalRate">
                <InputNumber min={1} max={5} step={0.1} className="w-full" disabled={!isAdmin} addonAfter="x" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Làm Thêm Ngày Cuối Tuần (T7/CN)" name="otWeekendRate">
                <InputNumber min={1} max={5} step={0.1} className="w-full" disabled={!isAdmin} addonAfter="x" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Làm Thêm Ngày Nghỉ Lễ Tết" name="otHolidayRate">
                <InputNumber min={1} max={5} step={0.1} className="w-full" disabled={!isAdmin} addonAfter="x" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "payroll",
      label: (
        <span className="flex items-center gap-1.5 font-medium">
          <DollarCircleOutlined />
          Nghỉ Phép & Lương - Thuế
        </span>
      ),
      children: (
        <div className="space-y-4 pt-2">
          <Alert
            message="Tham số tính lương & Thuế TNCN / BHXH"
            description="Các tỷ lệ và định mức theo Luật Lao Động để công thức tự động tính lương Gross sang Net."
            type="info"
            showIcon
            className="mb-4 text-xs"
          />

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phép Năm Tiêu Chuẩn (Ngày/Năm)"
                name="annualLeaveDefault"
                tooltip="Số ngày phép mặc định cho nhân sự làm đủ 12 tháng"
              >
                <InputNumber min={0} max={30} className="w-full" disabled={!isAdmin} addonAfter="ngày" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số Ngày Công Chuẩn Trong Tháng"
                name="standardWorkDays"
                tooltip="Thường là 22 ngày (nghỉ T7, CN) hoặc 26 ngày (nghỉ CN)"
              >
                <InputNumber min={20} max={28} className="w-full" disabled={!isAdmin} addonAfter="công" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Tỷ Lệ Đóng BHXH Nhân Viên Chịu"
                name="insuranceRatePercent"
                tooltip="BHXH (8%) + BHYT (1.5%) + BHTN (1%) = 10.5%"
              >
                <InputNumber min={0} max={30} step={0.1} className="w-full" disabled={!isAdmin} addonAfter="%" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Giảm Trừ Bản Thân (VNĐ/Tháng)"
                name="personalTaxDeduction"
                tooltip="Mức hiện hành theo quy định: 11.000.000 VNĐ"
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  disabled={!isAdmin}
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Giảm Trừ Người Phụ Thuộc (VNĐ/Người)"
                name="dependentTaxDeduction"
                tooltip="Mức hiện hành: 4.400.000 VNĐ / người / tháng"
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  disabled={!isAdmin}
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "alerts",
      label: (
        <span className="flex items-center gap-1.5 font-medium">
          <BellOutlined />
          Cảnh Báo & Tự Động Hóa
        </span>
      ),
      children: (
        <div className="space-y-4 pt-2">
          <Alert
            message="Chính sách kích hoạt cảnh báo thông minh"
            description="Hệ thống tự động quét và gắn cờ cảnh báo trên Bảng điều khiển (Dashboard)."
            type="info"
            showIcon
            className="mb-4 text-xs"
          />

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Cảnh Báo Hợp Đồng Sắp Hết Hạn Trước"
                name="contractAlertDays"
                tooltip="Số ngày trước khi hợp đồng hết hạn để hiển thị cờ cảnh báo cho HR"
              >
                <InputNumber min={7} max={90} className="w-full" disabled={!isAdmin} addonAfter="ngày" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={4} className="!mb-1 font-bold text-slate-800 flex items-center gap-2">
            <SettingOutlined className="text-blue-600" />
            Cấu Hình Hệ Thống Cơ Bản
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Thiết lập thông tin pháp nhân doanh nghiệp, quy chế chấm công GPS, chính sách tính lương và các định mức tự động.
          </Text>
        </div>

        {isAdmin ? (
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            loading={saveMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 font-medium h-9 px-5 rounded-lg self-start sm:self-auto shadow-sm"
          >
            Lưu Cấu Hình
          </Button>
        ) : (
          <Tag color="orange" className="py-1 px-3 flex items-center gap-1 text-xs font-medium self-start sm:self-auto">
            <LockOutlined />
            Chỉ Quản trị viên (Admin) mới có quyền chỉnh sửa cấu hình
          </Tag>
        )}
      </div>

      {/* Main Settings Card */}
      <Card className="rounded-xl border border-slate-200 shadow-xs" loading={isLoading}>
        <Form form={form} layout="vertical" onFinish={(vals) => saveMutation.mutate(vals)}>
          <Tabs defaultActiveKey="company" items={tabItems} className="font-sans" />
        </Form>
      </Card>
    </div>
  );
}
