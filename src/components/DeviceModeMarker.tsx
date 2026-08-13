"use client";

import { useEffect } from "react";

type DeviceMode = "mobile" | "tablet" | "desktop" | "full-hd" | "2k";

function getDeviceMode(width: number): DeviceMode {
  if (width >= 2560) {
    return "2k";
  }

  if (width >= 1920) {
    return "full-hd";
  }

  if (width >= 1200) {
    return "desktop";
  }

  if (width >= 768) {
    return "tablet";
  }

  return "mobile";
}

export function DeviceModeMarker() {
  useEffect(() => {
    const root = document.documentElement;

    const updateDeviceMode = () => {
      root.dataset.deviceMode = getDeviceMode(window.innerWidth);
    };

    updateDeviceMode();
    window.addEventListener("resize", updateDeviceMode);

    return () => {
      window.removeEventListener("resize", updateDeviceMode);
    };
  }, []);

  return null;
}
