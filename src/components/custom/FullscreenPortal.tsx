"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface FullscreenPortalProps {
  children: React.ReactNode;
  isFullscreen: boolean;
}

export function FullscreenPortal({ children, isFullscreen }: FullscreenPortalProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const cleanup = useCallback(() => {
    if (portalContainer && document.body.contains(portalContainer)) {
      document.body.removeChild(portalContainer);
      setPortalContainer(null);
    }
  }, [portalContainer]);

  useEffect(() => {
    if (isFullscreen) {
      const container = document.createElement("div");
      container.className = "fullscreen-portal";
      document.body.appendChild(container);
      setPortalContainer(container);

      return cleanup;
    } else {
      cleanup();
    }
  }, [isFullscreen, cleanup]);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  if (!isFullscreen || !portalContainer) {
    return <>{children}</>;
  }

  return createPortal(children, portalContainer);
}
