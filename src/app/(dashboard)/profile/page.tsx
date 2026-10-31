"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  Row,
  Col,
  Descriptions,
  Tag,
  Avatar,
  Input,
  Button,
  Typography,
  Divider,
  Upload,
  Spin,
} from "antd";
import { message } from "@/lib/antd-app";
import {
  UserOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  CameraOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
import { useI18nStore } from "@/stores/i18n.store";
import { request, parseApiError, getMediaUrl } from "@/lib/api-client";

const { Title, Text } = Typography;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu hiện tại tối thiểu 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu mới tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { user, currentUser } = useAuth();
  const { t } = useI18nStore();
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(null);

  const activeUser = currentUser || user;
  const currentAvatarUrl = uploadedAvatarUrl || activeUser?.employee?.avatarUrl;

  const handleUploadAvatar = async (file: File) => {
    const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!isImage) {
      message.error("Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc WEBP");
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

      const res = await request.upload<{ avatarUrl: string }>("upload/avatar", formData);
      if (res.success && res.data?.avatarUrl) {
        setUploadedAvatarUrl(res.data.avatarUrl);
        message.success("Cập nhật ảnh đại diện thành công!");
      } else {
        message.error(res.message || "Tải ảnh lên thất bại");
      }
    } catch (err) {
      const msg = await parseApiError(err);
      message.error(msg);
    } finally {
      setIsUploadingAvatar(false);
    }

    return false;
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = async (data: PasswordFormData) => {
    try {
      setIsChangingPass(true);
      const res = await request.post("auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (res.success) {
        message.success("Đổi mật khẩu thành công!");
        reset();
      } else {
        message.error(res.message || "Đổi mật khẩu thất bại");
      }
    } catch (err) {
      const msg = await parseApiError(err);
      message.error(msg);
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Title level={3} className="!mb-1">
          {t.common.profile}
        </Title>
        <Text type="secondary">Xem thông tin tài khoản và cập nhật bảo mật</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center gap-5 mb-6">
              <div className="relative group shrink-0">
                <Avatar
                  size={76}
                  src={getMediaUrl(currentAvatarUrl)}
                  className="!bg-blue-600 font-bold text-2xl shadow-sm border-2 border-white ring-2 ring-slate-100"
                >
                  {activeUser?.fullName?.charAt(0) || "U"}
                </Avatar>
                <Upload
                  showUploadList={false}
                  beforeUpload={handleUploadAvatar}
                  accept="image/jpeg,image/png,image/webp"
                >
                  <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer text-white">
                    {isUploadingAvatar ? (
                      <Spin indicator={<LoadingOutlined className="text-white text-lg" spin />} />
                    ) : (
                      <>
                        <CameraOutlined className="text-base" />
                        <span className="text-[10px] mt-0.5 font-medium">Đổi ảnh</span>
                      </>
                    )}
                  </div>
                </Upload>
              </div>

              <div>
                <Title level={4} className="!mb-0">
                  {activeUser?.fullName}
                </Title>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Text type="secondary">{activeUser?.email}</Text>
                  {activeUser?.roles?.map((r) => (
                    <Tag color="blue" key={r}>
                      {r}
                    </Tag>
                  ))}
                </div>
                <div className="mt-2">
                  <Upload
                    showUploadList={false}
                    beforeUpload={handleUploadAvatar}
                    accept="image/jpeg,image/png,image/webp"
                  >
                    <Button size="small" icon={<CameraOutlined />} loading={isUploadingAvatar}>
                      Tải ảnh đại diện mới
                    </Button>
                  </Upload>
                </div>
              </div>
            </div>

            <Divider />

            <Descriptions title="Chi tiết tài khoản" bordered column={1} size="small">
              <Descriptions.Item label="Email">
                <span className="flex items-center gap-1.5">
                  <MailOutlined className="text-slate-400" /> {activeUser?.email}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                <span className="flex items-center gap-1.5">
                  <PhoneOutlined className="text-slate-400" /> {activeUser?.phone || "Chưa cập nhật"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Mã nhân viên">
                {activeUser?.employee?.employeeCode || "Không liên kết hồ sơ nhân viên"}
              </Descriptions.Item>
              <Descriptions.Item label="Phòng ban">
                {activeUser?.employee?.department?.name || "Chưa phân bổ"}
              </Descriptions.Item>
              <Descriptions.Item label="Chức vụ">
                {activeUser?.employee?.position?.title || "Chưa phân bổ"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <span className="flex items-center gap-2 font-semibold">
                <KeyOutlined /> Đổi mật khẩu
              </span>
            }
            className="shadow-xs border-slate-200"
          >
            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Mật khẩu hiện tại *
                </label>
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="••••••••"
                      status={errors.currentPassword ? "error" : ""}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <span className="text-xs text-rose-500">{errors.currentPassword.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Mật khẩu mới *
                </label>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="••••••••"
                      status={errors.newPassword ? "error" : ""}
                    />
                  )}
                />
                {errors.newPassword && (
                  <span className="text-xs text-rose-500">{errors.newPassword.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Xác nhận mật khẩu mới *
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="••••••••"
                      status={errors.confirmPassword ? "error" : ""}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-rose-500">{errors.confirmPassword.message}</span>
                )}
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={isChangingPass}
                block
                className="!mt-4"
              >
                Cập nhật mật khẩu
              </Button>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

