import React from "react";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
};

export function ClienteNaVeiaLogo({ variant = "light", className = "h-8", style }: Props) {
  return (
    <div className="flex w-full items-center justify-center text-center">
      <img
        src="/__l5e/assets-v1/1fd3a225-8a60-432b-ae11-987226535a4b/cliente-na-veia.png"
        alt="Cliente na Veia"
        className={className}
        style={{
          display: "block",
          maxHeight: "100%",
          width: "auto",
          margin: "0 auto",
          objectFit: "contain",
          ...style,
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
