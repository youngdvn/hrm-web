"use client";

import { useState, useEffect, useCallback } from "react";

export interface GeolocationState {
  status: "idle" | "locating" | "success" | "error";
  displayText: string;
  latitude?: number;
  longitude?: number;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: "locating",
    displayText: "Đang định vị GPS...",
  });

  const refreshLocation = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setState({
        status: "error",
        displayText: "Thiết bị không hỗ trợ định vị GPS",
      });
      return;
    }

    setState((prev) => ({ ...prev, status: "locating", displayText: "Đang cập nhật vị trí..." }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setState({
          status: "success",
          displayText: `Văn phòng Chính (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
          latitude,
          longitude,
        });
      },
      (err) => {
        let msg = "Vui lòng bật định vị GPS để chấm công";
        if (err.code === 1) msg = "Đã từ chối quyền truy cập vị trí";
        if (err.code === 2) msg = "Không xác định được tọa độ";
        if (err.code === 3) msg = "Quá thời gian lấy vị trí GPS";
        setState({
          status: "error",
          displayText: msg,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  return {
    ...state,
    refreshLocation,
  };
}

