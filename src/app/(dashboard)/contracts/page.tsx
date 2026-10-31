"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  Table,
  Button,
  Tag,
  Typography,
  Modal,
  Input,
  Select,
  DatePicker,
  Popconfirm,
  Space,
  Form,
  Row,
  Col,
  InputNumber,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useContracts } from "@/hooks/useContracts";
import { useEmployees } from "@/hooks/useEmployees";
import { useAuthStore } from "@/stores/auth.store";
import { RoleGuard } from "@/components/common/RoleGuard";
import { getMediaUrl } from "@/lib/api-client";
import {
  Contract,
  ContractType,
  ContractStatus,
  CreateContractInput,
} from "@/types/contract.types";

const { Title, Text } = Typography;
const { Option } = Select;

const contractFormSchema = z.object({
  contractNumber: z.string().min(3, "Số hợp đồng tối thiểu 3 ký tự"),
  employeeId: z.string().min(1, "Vui lòng chọn nhân viên"),
  contractType: z.enum([
    "PROBATION",
    "DEFINITE_TERM",
    "INDEFINITE_TERM",
    "SEASONAL",
    "INTERNSHIP",
  ]),
  startDate: z.custom<Dayjs>((val) => !!val, "Vui lòng chọn ngày bắt đầu"),
  endDate: z.custom<Dayjs | null>().optional(),
  baseSalary: z.number().positive("Lương cơ bản phải lớn hơn 0"),
  allowance: z.number().nonnegative("Phụ cấp phải >= 0"),
  status: z.enum(["DRAFT", "ACTIVE", "EXPIRED", "TERMINATED"]),
  notes: z.string().optional(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

export default function ContractsPage() {
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const isAdmin = hasRole(["ADMIN"]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const {
    contracts,
    isLoading,
    createContract,
    isCreating,
    updateContract,
    isUpdating,
    deleteContract,
    uploadContractFile,
  } = useContracts();

  const { employees } = useEmployees({ limit: 100 });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      contractNumber: "",
      employeeId: "",
      contractType: "PROBATION",
      startDate: dayjs(),
      endDate: null,
      baseSalary: 10000000,
      allowance: 1000000,
      status: "ACTIVE",
      notes: "",
    },
  });

  const handleOpenCreate = () => {
    setEditingContract(null);
    reset({
      contractNumber: `HDLD-${dayjs().format("YYYYMM")}-${Math.floor(100 + Math.random() * 900)}`,
      employeeId: "",
      contractType: "PROBATION",
      startDate: dayjs(),
      endDate: dayjs().add(2, "month"),
      baseSalary: 10000000,
      allowance: 1000000,
      status: "ACTIVE",
      notes: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Contract) => {
    setEditingContract(c);
    reset({
      contractNumber: c.contractNumber,
      employeeId: c.employeeId,
      contractType: c.contractType,
      startDate: dayjs(c.startDate),
      endDate: c.endDate ? dayjs(c.endDate) : null,
      baseSalary: Number(c.baseSalary),
      allowance: Number(c.allowance || 0),
      status: c.status,
      notes: c.notes || "",
    });
    setModalOpen(true);
  };

  const onSubmit = async (values: ContractFormValues) => {
    const payload: CreateContractInput = {
      contractNumber: values.contractNumber,
      employeeId: values.employeeId,
      contractType: values.contractType,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate ? values.endDate.toISOString() : undefined,
      baseSalary: values.baseSalary,
      allowance: values.allowance,
      status: values.status,
      notes: values.notes,
    };

    if (editingContract) {
      await updateContract({ id: editingContract.id, data: payload });
    } else {
      await createContract(payload);
    }
    setModalOpen(false);
  };

  const contractTypeLabel: Record<ContractType, string> = {
    PROBATION: "Thử việc",
    DEFINITE_TERM: "Xác định thời hạn",
    INDEFINITE_TERM: "Không xác định thời hạn",
    SEASONAL: "Thời vụ",
    INTERNSHIP: "Thực tập",
  };

  const statusColorMap: Record<ContractStatus, string> = {
    DRAFT: "default",
    ACTIVE: "green",
    EXPIRED: "red",
    TERMINATED: "magenta",
  };

  const statusLabelMap: Record<ContractStatus, string> = {
    DRAFT: "Bản nháp",
    ACTIVE: "Đang hiệu lực",
    EXPIRED: "Hết hạn",
    TERMINATED: "Đã chấm dứt",
  };

  const columns: ColumnsType<Contract> = [
    {
      title: "Số Hợp đồng",
      dataIndex: "contractNumber",
      key: "contractNumber",
      render: (num) => <span className="font-semibold text-blue-600">{num}</span>,
    },
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, r) => (
        <div>
          <div className="font-semibold text-slate-800">
            {r.employee?.lastName} {r.employee?.firstName}
          </div>
          <div className="text-xs text-slate-400">
            {r.employee?.employeeCode} • {r.employee?.department?.name || "Chưa rõ phòng"}
          </div>
        </div>
      ),
    },
    {
      title: "Loại hợp đồng",
      dataIndex: "contractType",
      key: "contractType",
      render: (type: ContractType) => <Tag color="blue">{contractTypeLabel[type] || type}</Tag>,
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (s) => (
        <span className="font-semibold text-slate-800">
          {Number(s).toLocaleString("vi-VN")} đ
        </span>
      ),
    },
    {
      title: "Phụ cấp",
      dataIndex: "allowance",
      key: "allowance",
      render: (a) => `${Number(a || 0).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Thời hạn",
      key: "period",
      render: (_, r) => (
        <div className="text-xs">
          <div>Từ: {dayjs(r.startDate).format("DD/MM/YYYY")}</div>
          <div className="text-slate-400">
            Đến: {r.endDate ? dayjs(r.endDate).format("DD/MM/YYYY") : "Vô thời hạn"}
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (st: ContractStatus) => (
        <Tag color={statusColorMap[st] || "default"}>{statusLabelMap[st] || st}</Tag>
      ),
    },
    {
      title: "Tệp hợp đồng",
      key: "contractFile",
      render: (_: unknown, r: Contract) => {
        const file = r.fileUrl || r.documentUrl;
        return (
          <div className="flex items-center gap-2">
            {file ? (
              <a
                href={getMediaUrl(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200/60 font-medium"
              >
                <FilePdfOutlined className="text-red-500" /> Xem tệp
              </a>
            ) : (
              <span className="text-xs text-slate-400 italic">Chưa có tệp</span>
            )}

            {isHrOrAdmin && (
              <Upload
                showUploadList={false}
                accept="application/pdf,image/jpeg,image/png"
                beforeUpload={async (f) => {
                  await uploadContractFile({ contractId: r.id, file: f });
                  return false;
                }}
              >
                <Button size="small" type="text" icon={<UploadOutlined />} className="text-xs text-slate-500 hover:text-blue-600">
                  {file ? "Đổi" : "Tải lên"}
                </Button>
              </Upload>
            )}
          </div>
        );
      },
    },
    ...(isHrOrAdmin
      ? [
          {
            title: "Thao tác",
            key: "actions",
            render: (_: unknown, record: Contract) => (
              <Space>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleOpenEdit(record)}
                />
                {isAdmin && (
                  <Popconfirm
                    title="Xóa hợp đồng lao động này?"
                    onConfirm={() => deleteContract(record.id)}
                    okButtonProps={{ danger: true }}
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN", "HR", "MANAGER"]}>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={3} className="!mb-1">
            Quản lý Hợp đồng Lao động
          </Title>
          <Text type="secondary">Theo dõi các loại hợp đồng, mức lương và thời hạn hiệu lực</Text>
        </div>

        {isHrOrAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleOpenCreate}
            className="!shadow-md !shadow-blue-500/20"
          >
            Tạo hợp đồng mới
          </Button>
        )}
      </div>

      <Card className="shadow-xs border-slate-200">
        <Table
          columns={columns}
          dataSource={contracts}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Contract Modal Form */}
      <Modal
        open={modalOpen}
        title={editingContract ? "Chỉnh sửa hợp đồng" : "Tạo hợp đồng lao động mới"}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit(onSubmit)}
        confirmLoading={isCreating || isUpdating}
        width={680}
        destroyOnClose
      >
        <Form layout="vertical" className="pt-3">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số Hợp đồng"
                required
                validateStatus={errors.contractNumber ? "error" : ""}
                help={errors.contractNumber?.message}
              >
                <Controller
                  name="contractNumber"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="HDLD-2026-001" disabled={!!editingContract} />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Nhân viên"
                required
                validateStatus={errors.employeeId ? "error" : ""}
                help={errors.employeeId?.message}
              >
                <Controller
                  name="employeeId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Chọn nhân viên"
                      showSearch
                      optionFilterProp="children"
                    >
                      {employees.map((e) => (
                        <Option key={e.id} value={e.id}>
                          {e.lastName} {e.firstName} ({e.employeeCode})
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại hợp đồng" required>
                <Controller
                  name="contractType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} className="w-full">
                      <Option value="PROBATION">Hợp đồng thử việc</Option>
                      <Option value="DEFINITE_TERM">Xác định thời hạn (1 - 3 năm)</Option>
                      <Option value="INDEFINITE_TERM">Không xác định thời hạn</Option>
                      <Option value="SEASONAL">Hợp đồng thời vụ</Option>
                      <Option value="INTERNSHIP">Hợp đồng thực tập</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Trạng thái" required>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} className="w-full">
                      <Option value="ACTIVE">Đang hiệu lực</Option>
                      <Option value="DRAFT">Bản nháp</Option>
                      <Option value="EXPIRED">Hết hạn</Option>
                      <Option value="TERMINATED">Chấm dứt trước hạn</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Lương cơ bản (VND)"
                required
                validateStatus={errors.baseSalary ? "error" : ""}
                help={errors.baseSalary?.message}
              >
                <Controller
                  name="baseSalary"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, "") || 0)}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Phụ cấp cố định (VND)">
                <Controller
                  name="allowance"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, "") || 0)}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày bắt đầu"
                required
                validateStatus={errors.startDate ? "error" : ""}
                help={errors.startDate?.message}
              >
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker {...field} className="w-full" format="YYYY-MM-DD" />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Ngày kết thúc (Bỏ trống nếu vô thời hạn)">
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="w-full"
                      format="YYYY-MM-DD"
                      allowClear
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Ghi chú">
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder="Ghi chú điều khoản bổ sung..." rows={2} />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  </RoleGuard>
  );
}
