"use client";

import { App } from "antd";

type UseAppType = ReturnType<typeof App.useApp>;
type MessageType = UseAppType["message"];
type NotificationType = UseAppType["notification"];
type ModalType = UseAppType["modal"];

let messageInstance: MessageType | undefined;
let notificationInstance: NotificationType | undefined;
let modalInstance: ModalType | undefined;

export function AntdStaticBridge() {
  const app = App.useApp();
  messageInstance = app.message;
  notificationInstance = app.notification;
  modalInstance = app.modal;
  return null;
}

export const message = {
  success: (...args: Parameters<MessageType["success"]>) =>
    messageInstance?.success(...args),
  error: (...args: Parameters<MessageType["error"]>) =>
    messageInstance?.error(...args),
  info: (...args: Parameters<MessageType["info"]>) =>
    messageInstance?.info(...args),
  warning: (...args: Parameters<MessageType["warning"]>) =>
    messageInstance?.warning(...args),
  loading: (...args: Parameters<MessageType["loading"]>) =>
    messageInstance?.loading(...args),
};

export const notification = {
  success: (...args: Parameters<NotificationType["success"]>) =>
    notificationInstance?.success(...args),
  error: (...args: Parameters<NotificationType["error"]>) =>
    notificationInstance?.error(...args),
  info: (...args: Parameters<NotificationType["info"]>) =>
    notificationInstance?.info(...args),
  warning: (...args: Parameters<NotificationType["warning"]>) =>
    notificationInstance?.warning(...args),
  open: (...args: Parameters<NotificationType["open"]>) =>
    notificationInstance?.open(...args),
};

export const modal = {
  confirm: (...args: Parameters<ModalType["confirm"]>) =>
    modalInstance?.confirm(...args),
  info: (...args: Parameters<ModalType["info"]>) =>
    modalInstance?.info(...args),
  success: (...args: Parameters<ModalType["success"]>) =>
    modalInstance?.success(...args),
  error: (...args: Parameters<ModalType["error"]>) =>
    modalInstance?.error(...args),
  warning: (...args: Parameters<ModalType["warning"]>) =>
    modalInstance?.warning(...args),
};
