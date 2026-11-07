import { AttendanceStatus } from "@/types/attendance.types";
import { TranslationContent } from "@/utils/i18n-dictionary";

export const ATTENDANCE_STATUS_COLORS: Record<AttendanceStatus, string> = {
  PRESENT: "success",
  LATE: "warning",
  EARLY_LEAVE: "orange",
  HALF_DAY: "processing",
  ABSENT: "error",
};

export const SHIFT_SCHEDULE = {
  startHour: 8,
  startMinute: 30,
  endHour: 17,
  endMinute: 30,
  displayLabel: "08:30 - 17:30",
};

export function getAttendanceStatusLabel(
  status: AttendanceStatus,
  t: TranslationContent
): string {
  switch (status) {
    case "PRESENT":
      return t.attendance.statusOnTime || "Đúng giờ";
    case "LATE":
      return t.attendance.statusLate || "Đi muộn";
    case "EARLY_LEAVE":
      return t.attendance.statusEarlyLeave || "Về sớm";
    case "HALF_DAY":
      return t.attendance.statusHalfDay || "Nửa ngày";
    case "ABSENT":
      return t.attendance.statusAbsent || "Vắng mặt";
    default:
      return status;
  }
}

export function getQuickNotePresets(t?: TranslationContent): string[] {
  return [
    "Tại văn phòng",
    "Gặp khách hàng",
    "Làm việc từ xa (WFH)",
    "Tăng ca dự án",
  ];
}

