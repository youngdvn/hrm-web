"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEmployees } from "@/hooks/useEmployees";
import { Contract, CreateContractInput } from "@/types/contract.types";
import { contractFormSchema, ContractFormValues } from "@/schemas";
import { useI18nStore } from "@/stores/i18n.store";

const { Option } = Select;

export type { ContractFormValues };

interface ContractModalProps {
  open: boolean;
  contract: Contract | null;
  onClose: () => void;
  onSubmit: (values: CreateContractInput) => Promise<void>;
  isLoading: boolean;
}

export default function ContractModal({
  open,
  contract,
  onClose,
  onSubmit,
  isLoading,
}: ContractModalProps) {
  const { t } = useI18nStore();
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
      contractType: "DEFINITE_TERM",
      startDate: dayjs(),
      endDate: dayjs().add(1, "year"),
      baseSalary: 10000000,
      allowance: 1000000,
      status: "ACTIVE",
      notes: "",
    },
  });

  useEffect(() => {
    if (contract) {
      reset({
        contractNumber: contract.contractNumber,
        employeeId: contract.employeeId,
        contractType: contract.contractType,
        startDate: dayjs(contract.startDate),
        endDate: contract.endDate ? dayjs(contract.endDate) : undefined,
        baseSalary: contract.baseSalary,
        allowance: contract.allowance || 0,
        status: contract.status,
        notes: contract.notes || "",
      });
    } else {
      reset({
        contractNumber: "",
        employeeId: "",
        contractType: "DEFINITE_TERM",
        startDate: dayjs(),
        endDate: dayjs().add(1, "year"),
        baseSalary: 10000000,
        allowance: 1000000,
        status: "ACTIVE",
        notes: "",
      });
    }
  }, [contract, reset, open]);

  const handleFormSubmit = async (values: ContractFormValues) => {
    await onSubmit({
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate ? values.endDate.toISOString() : undefined,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      title={contract ? t.contract.editContract : t.contract.createContract}
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isLoading}
      width={680}
      destroyOnClose
      okText={t.common.save}
      cancelText={t.common.cancel}
    >
      <Form layout="vertical" className="pt-3">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t.contract.contractNumber}
              required
              validateStatus={errors.contractNumber ? "error" : ""}
              help={errors.contractNumber?.message}
            >
              <Controller
                name="contractNumber"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="HDLD-2026-001" disabled={!!contract} />
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
  );
}

