import React from "react";
import { useDesignLogos, getCachedDesignLogosSync } from "@/hooks/useDesignLogos";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
  type?: "login" | "module";
};

export function VibraLogo({ variant = "light", className = "h-8", style, type = "module" }: Props) {
  const { data: logosQuery } = useDesignLogos();
  const cachedLogos = getCachedDesignLogosSync();
  const logos = logosQuery || cachedLogos;
  const fill = variant === "light" ? "#ffffff" : "#ff6900"; // Vibra Orange for dark background/variants or dark text

  const customLogoUrl = type === "login" ? logos?.login_logo : logos?.module_logo;
  const size = type === "login" ? logos?.login_logo_size : logos?.module_logo_size;

  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Logo"
        className={size ? "" : className}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          maxHeight: size ? undefined : "100%",
          height: size ? `${size}px` : undefined,
          width: "auto",
          objectFit: "contain",
          ...style,
        }}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70 24"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
    >
      <text
        x="0"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="18"
        letterSpacing="0.5"
        fill={fill}
      >
        VIBRA
      </text>
    </svg>
  );
}
