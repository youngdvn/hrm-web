"use client";

import {
  Card,
  Descriptions,
  Tag,
  Avatar,
  Button,
  Typography,
  Divider,
  Upload,
  Spin,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  CameraOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { getMediaUrl } from "@/lib/api-client";
import { useI18nStore } from "@/stores/i18n.store";

const { Title, Text } = Typography;

interface ProfileOverviewCardProps {
  activeUser: any;
  currentAvatarUrl?: string | null;
  isUploadingAvatar: boolean;
  onUploadAvatar: (file: File) => Promise<boolean>;
}

export function ProfileOverviewCard({
  activeUser,
  currentAvatarUrl,
  isUploadingAvatar,
  onUploadAvatar,
}: ProfileOverviewCardProps) {
  const { t } = useI18nStore();

  return (
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
            beforeUpload={onUploadAvatar}
            accept="image/jpeg,image/png,image/webp"
          >
            <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer text-white">
              {isUploadingAvatar ? (
                <Spin indicator={<LoadingOutlined className="text-white text-lg" spin />} />
              ) : (
                <>
                  <CameraOutlined className="text-base" />
                  <span className="text-[10px] mt-0.5 font-medium">{t.profile.avatarChange}</span>
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
            {activeUser?.roles?.map((r: string) => (
              <Tag color="blue" key={r}>
                {r}
              </Tag>
            ))}
          </div>
          <div className="mt-2">
            <Upload
              showUploadList={false}
              beforeUpload={onUploadAvatar}
              accept="image/jpeg,image/png,image/webp"
            >
              <Button size="small" icon={<CameraOutlined />} loading={isUploadingAvatar}>
                {t.profile.avatarChange}
              </Button>
            </Upload>
          </div>
        </div>
      </div>

      <Divider />

      <Descriptions title={t.profile.personalInfo} bordered column={1} size="small">
        <Descriptions.Item label={t.employee.email}>
          <span className="flex items-center gap-1.5">
            <MailOutlined className="text-slate-400" /> {activeUser?.email}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t.employee.phone}>
          <span className="flex items-center gap-1.5">
            <PhoneOutlined className="text-slate-400" /> {activeUser?.phone || "---"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t.employee.employeeCode}>
          {activeUser?.employee?.employeeCode || "---"}
        </Descriptions.Item>
        <Descriptions.Item label={t.department.title}>
          {activeUser?.employee?.department?.name || "---"}
        </Descriptions.Item>
        <Descriptions.Item label={t.position.title}>
          {activeUser?.employee?.position?.title || "---"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

