"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Drawer, Form, Input, Select, DatePicker, Button, Space, Row, Col, Avatar, Upload } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { Employee, Department, Position, CreateEmployeeInput } from "@/types/employee.types";
import { useI18nStore } from "@/stores/i18n.store";
import { request, parseApiError, getMediaUrl } from "@/lib/api-client";
import { message } from "@/lib/antd-app";

const { Option } = Select;

const employeeFormSchema = z.object({
  employeeCode: z
    .string()
    .min(2, "Mã nhân viên tối thiểu 2 ký tự")
    .max(20, "Mã nhân viên tối đa 20 ký tự")
    .transform((val) => val.trim().toUpperCase()),
  firstName: z.string().min(1, "Vui lòng nhập tên").transform((val) => val.trim()),
  lastName: z.string().min(1, "Vui lòng nhập họ đệm").transform((val) => val.trim()),
  email: z.string().email("Email không hợp lệ").transform((val) => val.trim().toLowerCase()),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  status: z.enum(["PROBATION", "ACTIVE", "ON_LEAVE", "TERMINATED"]),
  dateOfBirth: z.custom<Dayjs | null>().optional(),
  hireDate: z.custom<Dayjs | null>().optional(),
  departmentId: z.string().optional(),
  positionId: z.string().optional(),
  address: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface EmployeeDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEmployeeInput) => Promise<void>;
  loading: boolean;
  initialData?: Employee | null;
  departments: Department[];
  positions: Position[];
}

export function EmployeeDrawer({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
  departments,
  positions,
}: EmployeeDrawerProps) {
  const { t } = useI18nStore();
  const isEdit = !!initialData;
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      avatarUrl: undefined,
      gender: "MALE",
      status: "ACTIVE",
      dateOfBirth: null,
      hireDate: null,
      departmentId: undefined,
      positionId: undefined,
      address: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setAvatarUrl(initialData.avatarUrl || undefined);
      reset({
        employeeCode: initialData.employeeCode,
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone || "",
        avatarUrl: initialData.avatarUrl || undefined,
        gender: initialData.gender,
        status: initialData.status,
        dateOfBirth: initialData.dateOfBirth ? dayjs(initialData.dateOfBirth) : null,
        hireDate: initialData.hireDate ? dayjs(initialData.hireDate) : dayjs(),
        departmentId: initialData.departmentId || undefined,
        positionId: initialData.positionId || undefined,
        address: initialData.address || "",
      });
    } else {
      setAvatarUrl(undefined);
      reset({
        employeeCode: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        avatarUrl: undefined,
        gender: "MALE",
        status: "ACTIVE",
        dateOfBirth: null,
        hireDate: dayjs(),
        departmentId: undefined,
        positionId: undefined,
        address: "",
      });
    }
  }, [initialData, reset, open]);

  const handleAvatarUpload = async (file: File) => {
    const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!isImage) {
      message.error("Chỉ chấp nhận file ảnh JPG, PNG hoặc WEBP");
      return false;
    }

    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error("Kích thước ảnh không được vượt quá 3MB");
      return false;
    }

    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);
      if (initialData?.id) {
        formData.append("employeeId", initialData.id);
      }

      const res = await request.upload<{ avatarUrl: string }>("upload/avatar", formData);
      if (res.success && res.data?.avatarUrl) {
        setAvatarUrl(res.data.avatarUrl);
        setValue("avatarUrl", res.data.avatarUrl);
        message.success("Tải ảnh đại diện thành công!");
      } else {
        message.error(res.message || "Tải ảnh thất bại");
      }
    } catch (err) {
      const msg = await parseApiError(err);
      message.error(msg);
    } finally {
      setIsUploadingAvatar(false);
    }

    return false;
  };

  const onValidSubmit = async (values: EmployeeFormValues) => {
    const payload: CreateEmployeeInput = {
      employeeCode: values.employeeCode,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone || undefined,
      avatarUrl: avatarUrl || undefined,
      gender: values.gender,
      status: values.status,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : undefined,
      hireDate: values.hireDate ? values.hireDate.toISOString() : new Date().toISOString(),
      departmentId: values.departmentId || undefined,
      positionId: values.positionId || undefined,
      address: values.address || undefined,
    };

    await onSubmit(payload);
    onClose();
  };

  return (
    <Drawer
      title={isEdit ? t.employee.editEmployee : t.employee.addNew}
      size={640}
      open={open}
      onClose={onClose}
      destroyOnHidden
      extra={
        <Space>
          <Button onClick={onClose}>{t.common.cancel}</Button>
          <Button type="primary" loading={loading} onClick={handleSubmit(onValidSubmit)}>
            {t.common.save}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onValidSubmit)}>
        {/* Khu vực tải ảnh đại diện */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
          <Avatar
            size={64}
            src={getMediaUrl(avatarUrl)}
            icon={!avatarUrl && <UserOutlined />}
            className="!bg-blue-600 font-bold text-xl border-2 border-white shadow-xs shrink-0"
          >
            {initialData?.firstName?.charAt(0) || "E"}
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-slate-700 mb-1">Ảnh đại diện nhân sự</div>
            <div className="flex items-center gap-2">
              <Upload
                showUploadList={false}
                beforeUpload={handleAvatarUpload}
                accept="image/jpeg,image/png,image/webp"
              >
                <Button size="small" icon={<UploadOutlined />} loading={isUploadingAvatar}>
                  {avatarUrl ? "Thay đổi ảnh" : "Tải ảnh lên"}
                </Button>
              </Upload>
              {avatarUrl && (
                <Button size="small" danger type="text" onClick={() => setAvatarUrl(undefined)}>
                  Xóa ảnh
                </Button>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Định dạng JPG, PNG, WEBP (tối đa 3MB)</div>
          </div>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t.employee.employeeCode}
              required
              validateStatus={errors.employeeCode ? "error" : ""}
              help={errors.employeeCode?.message}
            >
              <Controller
                name="employeeCode"
                control={control}
                render={({ field }) => (
                  <Input {...field} disabled={isEdit} placeholder="EMP001" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t.employee.status} required>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full">
                    <Option value="ACTIVE">{t.employee.statusActive}</Option>
                    <Option value="PROBATION">{t.employee.statusProbation}</Option>
                    <Option value="ON_LEAVE">{t.employee.statusOnLeave}</Option>
                    <Option value="TERMINATED">{t.employee.statusTerminated}</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t.employee.lastName}
              required
              validateStatus={errors.lastName ? "error" : ""}
              help={errors.lastName?.message}
            >
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nguyễn" />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t.employee.firstName}
              required
              validateStatus={errors.firstName ? "error" : ""}
              help={errors.firstName?.message}
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Văn A" />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t.employee.email}
              required
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="email" placeholder="vana@company.com" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t.employee.phone}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} placeholder="0912345678" />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t.employee.department}>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full"
                    placeholder={t.employee.selectDepartment}
                    allowClear
                  >
                    {departments.map((d) => (
                      <Option key={d.id} value={d.id}>
                        {d.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t.employee.position}>
              <Controller
                name="positionId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full"
                    placeholder={t.employee.selectPosition}
                    allowClear
                  >
                    {positions.map((p) => (
                      <Option key={p.id} value={p.id}>
                        {p.title}
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
            <Form.Item label={t.employee.gender}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full">
                    <Option value="MALE">{t.employee.male}</Option>
                    <Option value="FEMALE">{t.employee.female}</Option>
                    <Option value="OTHER">{t.employee.other}</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t.employee.hireDate}>
              <Controller
                name="hireDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} className="w-full" format="YYYY-MM-DD" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t.employee.dateOfBirth}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} className="w-full" format="YYYY-MM-DD" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t.employee.address}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Địa chỉ thường trú..." />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
