"use client";

import { useState } from "react";
import { Row, Col, Typography } from "antd";
import { message } from "@/lib/antd-app";
import { useAuth } from "@/hooks/useAuth";
import { useI18nStore } from "@/stores/i18n.store";
import { request, parseApiError } from "@/lib/api-client";
import { ProfileOverviewCard } from "@/components/profile/ProfileOverviewCard";
import { ChangePasswordCard } from "@/components/profile/ChangePasswordCard";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { user, currentUser } = useAuth();
  const { t } = useI18nStore();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(null);

  const activeUser = currentUser || user;
  const currentAvatarUrl = uploadedAvatarUrl || activeUser?.employee?.avatarUrl;

  const handleUploadAvatar = async (file: File) => {
    const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!isImage) {
      message.error(t.profile.avatarFormatError);
      return false;
    }

    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error(t.profile.avatarSizeError);
      return false;
    }

    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await request.upload<{ avatarUrl: string }>("upload/avatar", formData);
      if (res.success && res.data?.avatarUrl) {
        setUploadedAvatarUrl(res.data.avatarUrl);
        message.success(t.profile.avatarUploadSuccess);
      } else {
        message.error(res.message || t.common.error);
      }
    } catch (err) {
      const msg = await parseApiError(err);
      message.error(msg);
    } finally {
      setIsUploadingAvatar(false);
    }

    return false;
  };

  return (
    <div className="space-y-6">
      <div>
        <Title level={3} className="!mb-1">
          {t.profile.title}
        </Title>
        <Text type="secondary">{t.profile.subtitle}</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <ProfileOverviewCard
            activeUser={activeUser}
            currentAvatarUrl={currentAvatarUrl}
            isUploadingAvatar={isUploadingAvatar}
            onUploadAvatar={handleUploadAvatar}
          />
        </Col>

        <Col xs={24} lg={10}>
          <ChangePasswordCard />
        </Col>
      </Row>
    </div>
  );
}
