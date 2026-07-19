import { ClienteNaVeiaLogo } from "./ClienteNaVeiaLogo";
import { useDesignLogos, getCachedDesignLogosSync } from "@/hooks/useDesignLogos";

export function LoadingScreen({ message = "Carregando o ambiente..." }: { message?: string }) {
  const { data: logosQuery } = useDesignLogos();
  const cachedLogos = getCachedDesignLogosSync();
  const logos = logosQuery || cachedLogos;
  const customLoadingLogo = logos?.loading_logo;
  const loadingSize = logos?.loading_logo_size;

  return (
    <div className="vibra-loading-screen">
      <div className="vibra-grid-layer" />
      <div className="vibra-loading-content">
        <div className="vibra-pulse vibra-loading-logo-wrap">
          {customLoadingLogo ? (
            <img
              src={customLoadingLogo}
              alt="Logo Carregando"
              className={loadingSize ? "" : "h-12 w-auto object-contain"}
              style={
                loadingSize
                  ? { height: `${loadingSize}px`, width: "auto", objectFit: "contain" }
                  : undefined
              }
              referrerPolicy="no-referrer"
            />
          ) : (
            <ClienteNaVeiaLogo className="h-12 w-auto" />
          )}
        </div>
        <div className="vibra-loading-track">
          <div className="vibra-loading-bar" />
        </div>
        <p className="vibra-loading-message">{message}</p>
      </div>
    </div>
  );
}
