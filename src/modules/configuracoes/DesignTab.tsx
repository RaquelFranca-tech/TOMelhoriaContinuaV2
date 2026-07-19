import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Upload, Trash2, Image, Sparkles, RefreshCw, Eye } from "lucide-react";
import { useDesignLogos, useUpdateDesignLogos } from "@/hooks/useDesignLogos";

const inputCls =
  "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[12.5px] outline-none transition focus:border-vibra-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white";

export function DesignTab() {
  const { data: logos, isLoading } = useDesignLogos();
  const updateLogos = useUpdateDesignLogos();

  const [loginLogo, setLoginLogo] = useState<string>("");
  const [loadingLogo, setLoadingLogo] = useState<string>("");
  const [moduleLogo, setModuleLogo] = useState<string>("");
  const [footerLogo, setFooterLogo] = useState<string>("");
  const [loginLogoSize, setLoginLogoSize] = useState<number>(64);
  const [loadingLogoSize, setLoadingLogoSize] = useState<number>(48);
  const [moduleLogoSize, setModuleLogoSize] = useState<number>(32);
  const [footerLogoSize, setFooterLogoSize] = useState<number>(32);
  const [saving, setSaving] = useState(false);

  // Sync state once when loaded
  useEffect(() => {
    if (logos) {
      setLoginLogo(logos.login_logo ?? "");
      setLoadingLogo(logos.loading_logo ?? "");
      setModuleLogo(logos.module_logo ?? "");
      setFooterLogo(logos.footer_logo ?? "");
      setLoginLogoSize(logos.login_logo_size ?? 64);
      setLoadingLogoSize(logos.loading_logo_size ?? 48);
      setModuleLogoSize(logos.module_logo_size ?? 32);
      setFooterLogoSize(logos.footer_logo_size ?? 32);
    }
  }, [logos]);

  const fileInputLoginRef = useRef<HTMLInputElement>(null);
  const fileInputLoadingRef = useRef<HTMLInputElement>(null);
  const fileInputModuleRef = useRef<HTMLInputElement>(null);
  const fileInputFooterRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState<{ [key: string]: boolean }>({});

  const handleDrag = (e: DragEvent<HTMLDivElement>, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [field]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [field]: false }));
    }
  };

  const compressImage = (file: File, maxWidth = 450, maxHeight = 450): Promise<string> => {
    return new Promise((resolve, reject) => {
      // If it is an SVG, do not compress or rasterize it to preserve vector details and small size
      if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Only resize if it exceeds max dimensions
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // For PNGs or standard transparent files, we use image/png
          // For other types, jpeg with 0.8 quality works perfectly
          const exportType = file.type === "image/png" ? "image/png" : "image/jpeg";
          const quality = exportType === "image/jpeg" ? 0.8 : undefined;

          try {
            const compressedBase64 = canvas.toDataURL(exportType, quality);
            resolve(compressedBase64);
          } catch (err) {
            resolve(event.target?.result as string); // fallback to original
          }
        };
        img.onerror = () => {
          reject(new Error("Erro ao carregar a imagem para processamento."));
        };
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const processFile = async (file: File, field: string) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    const toastId = toast.loading("Otimizando e comprimindo logotipo...");
    try {
      // Compress and resize the logo to preserve storage quota
      const base64 = await compressImage(file, 450, 450);

      // Verify the final size of the base64 string
      const approxSizeBytes = Math.round((base64.length * 3) / 4);
      if (approxSizeBytes > 400 * 1024) {
        // 400KB limit
        toast.dismiss(toastId);
        toast.error(
          "A imagem processada ainda é muito grande. Tente usar uma imagem menor ou SVG.",
        );
        return;
      }

      if (field === "login") setLoginLogo(base64);
      if (field === "loading") setLoadingLogo(base64);
      if (field === "module") setModuleLogo(base64);
      if (field === "footer") setFooterLogo(base64);

      toast.dismiss(toastId);
      toast.success("Imagem carregada e otimizada!");
    } catch (err: any) {
      toast.dismiss(toastId);
      console.error("Erro ao otimizar imagem:", err);
      toast.error("Não foi possível otimizar o logotipo.");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [field]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], field);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], field);
    }
  };

  async function handleSave() {
    setSaving(true);
    const success = await updateLogos({
      login_logo: loginLogo.trim() || undefined,
      loading_logo: loadingLogo.trim() || undefined,
      module_logo: moduleLogo.trim() || undefined,
      footer_logo: footerLogo.trim() || undefined,
      login_logo_size: loginLogoSize,
      loading_logo_size: loadingLogoSize,
      module_logo_size: moduleLogoSize,
      footer_logo_size: footerLogoSize,
    });
    setSaving(false);
  }

  function handleReset(field: "login" | "loading" | "module" | "footer" | "all") {
    if (field === "login" || field === "all") {
      setLoginLogo("");
      setLoginLogoSize(64);
    }
    if (field === "loading" || field === "all") {
      setLoadingLogo("");
      setLoadingLogoSize(48);
    }
    if (field === "module" || field === "all") {
      setModuleLogo("");
      setModuleLogoSize(32);
    }
    if (field === "footer" || field === "all") {
      setFooterLogo("");
      setFooterLogoSize(32);
    }
    toast.success("Campos redefinidos. Lembre-se de salvar para aplicar.");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-6 w-6 animate-spin text-vibra-600" />
        <span className="ml-2 text-sm text-muted-foreground">
          Carregando configurações visuais...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[18px] font-bold text-vibra-800 dark:text-white">
          Design & Identidade Visual
        </h1>
        <p className="text-[12px] text-muted-foreground">
          Gerencie e personalize a identidade visual das telas do sistema. Faça upload de arquivos
          (PNG, SVG, JPG) ou insira links externos de hospedagem.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {/* LOGIN LOGO */}
        <section className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm dark:border-neutral-700 dark:bg-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-vibra-50 text-vibra-700 font-bold text-xs dark:bg-vibra-900/50 dark:text-vibra-400">
              1
            </span>
            <h2 className="text-[13.5px] font-bold text-vibra-800 dark:text-white">
              Logotipo de Login
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Exibido no formulário de autenticação. Recomenda-se logotipo com fundo transparente.
          </p>

          {/* Drag & Drop Area */}
          <div
            className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition ${
              dragActive["login"]
                ? "border-vibra-600 bg-vibra-50/50"
                : "border-neutral-200 hover:border-vibra-500 hover:bg-neutral-50/40 dark:border-neutral-700"
            }`}
            onDragEnter={(e) => handleDrag(e, "login")}
            onDragLeave={(e) => handleDrag(e, "login")}
            onDragOver={(e) => handleDrag(e, "login")}
            onDrop={(e) => handleDrop(e, "login")}
            onClick={() => fileInputLoginRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputLoginRef}
              onChange={(e) => handleFileChange(e, "login")}
              className="hidden"
              accept="image/*"
            />
            {loginLogo ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={loginLogo}
                  alt="Login Logo Preview"
                  className="max-h-16 max-w-full object-contain rounded"
                />
                <span className="text-[10px] font-medium text-vibra-700 dark:text-vibra-400">
                  Clique para substituir
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-1.5">
                <Upload className="h-5 w-5 text-neutral-400" />
                <p className="text-[11.5px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Arraste ou clique para enviar
                </p>
                <p className="text-[10px] text-neutral-400">PNG, SVG ou JPG (máx. 2MB)</p>
              </div>
            )}
          </div>

          {/* URL Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              Ou use uma URL externa:
            </label>
            <input
              className={inputCls}
              placeholder="https://exemplo.com/logo-login.png"
              value={loginLogo.startsWith("data:") ? "" : loginLogo}
              onChange={(e) => setLoginLogo(e.target.value)}
            />
          </div>

          {/* Size Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              <span>Altura do Logotipo (px):</span>
              <span className="text-vibra-600 font-bold">{loginLogoSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              value={loginLogoSize}
              onChange={(e) => setLoginLogoSize(Number(e.target.value))}
              className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-vibra-600"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => handleReset("login")}
              className="flex-1 inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <Trash2 className="h-3 w-3" /> Limpar
            </button>
          </div>
        </section>

        {/* LOADING LOGO */}
        <section className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm dark:border-neutral-700 dark:bg-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-vibra-50 text-vibra-700 font-bold text-xs dark:bg-vibra-900/50 dark:text-vibra-400">
              2
            </span>
            <h2 className="text-[13.5px] font-bold text-vibra-800 dark:text-white">
              Logotipo de Carregamento
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Exibido na tela de abertura (Splash/Loading). Ideal para logo vibrante ou com fundo
            escuro.
          </p>

          {/* Drag & Drop Area */}
          <div
            className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition ${
              dragActive["loading"]
                ? "border-vibra-600 bg-vibra-50/50"
                : "border-neutral-200 hover:border-vibra-500 hover:bg-neutral-50/40 dark:border-neutral-700"
            }`}
            onDragEnter={(e) => handleDrag(e, "loading")}
            onDragLeave={(e) => handleDrag(e, "loading")}
            onDragOver={(e) => handleDrag(e, "loading")}
            onDrop={(e) => handleDrop(e, "loading")}
            onClick={() => fileInputLoadingRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputLoadingRef}
              onChange={(e) => handleFileChange(e, "loading")}
              className="hidden"
              accept="image/*"
            />
            {loadingLogo ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={loadingLogo}
                  alt="Loading Logo Preview"
                  className="max-h-16 max-w-full object-contain rounded"
                />
                <span className="text-[10px] font-medium text-vibra-700 dark:text-vibra-400">
                  Clique para substituir
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-1.5">
                <Upload className="h-5 w-5 text-neutral-400" />
                <p className="text-[11.5px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Arraste ou clique para enviar
                </p>
                <p className="text-[10px] text-neutral-400">PNG, SVG ou JPG (máx. 2MB)</p>
              </div>
            )}
          </div>

          {/* URL Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              Ou use uma URL externa:
            </label>
            <input
              className={inputCls}
              placeholder="https://exemplo.com/logo-loading.png"
              value={loadingLogo.startsWith("data:") ? "" : loadingLogo}
              onChange={(e) => setLoadingLogo(e.target.value)}
            />
          </div>

          {/* Size Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              <span>Altura do Logotipo (px):</span>
              <span className="text-vibra-600 font-bold">{loadingLogoSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              value={loadingLogoSize}
              onChange={(e) => setLoadingLogoSize(Number(e.target.value))}
              className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-vibra-600"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => handleReset("loading")}
              className="flex-1 inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <Trash2 className="h-3 w-3" /> Limpar
            </button>
          </div>
        </section>

        {/* MODULE LOGO */}
        <section className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm dark:border-neutral-700 dark:bg-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-vibra-50 text-vibra-700 font-bold text-xs dark:bg-vibra-900/50 dark:text-vibra-400">
              3
            </span>
            <h2 className="text-[13.5px] font-bold text-vibra-800 dark:text-white">
              Logotipo dos Módulos
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Exibido no canto esquerdo da barra superior (App Header). Recomenda-se imagem horizontal
            ou ícone minimalista.
          </p>

          {/* Drag & Drop Area */}
          <div
            className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition ${
              dragActive["module"]
                ? "border-vibra-600 bg-vibra-50/50"
                : "border-neutral-200 hover:border-vibra-500 hover:bg-neutral-50/40 dark:border-neutral-700"
            }`}
            onDragEnter={(e) => handleDrag(e, "module")}
            onDragLeave={(e) => handleDrag(e, "module")}
            onDragOver={(e) => handleDrag(e, "module")}
            onDrop={(e) => handleDrop(e, "module")}
            onClick={() => fileInputModuleRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputModuleRef}
              onChange={(e) => handleFileChange(e, "module")}
              className="hidden"
              accept="image/*"
            />
            {moduleLogo ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={moduleLogo}
                  alt="Module Logo Preview"
                  className="max-h-16 max-w-full object-contain rounded"
                />
                <span className="text-[10px] font-medium text-vibra-700 dark:text-vibra-400">
                  Clique para substituir
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-1.5">
                <Upload className="h-5 w-5 text-neutral-400" />
                <p className="text-[11.5px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Arraste ou clique para enviar
                </p>
                <p className="text-[10px] text-neutral-400">PNG, SVG ou JPG (máx. 2MB)</p>
              </div>
            )}
          </div>

          {/* URL Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              Ou use uma URL externa:
            </label>
            <input
              className={inputCls}
              placeholder="https://exemplo.com/logo-modulo.png"
              value={moduleLogo.startsWith("data:") ? "" : moduleLogo}
              onChange={(e) => setModuleLogo(e.target.value)}
            />
          </div>

          {/* Size Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              <span>Altura do Logotipo (px):</span>
              <span className="text-vibra-600 font-bold">{moduleLogoSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="120"
              value={moduleLogoSize}
              onChange={(e) => setModuleLogoSize(Number(e.target.value))}
              className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-vibra-600"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => handleReset("module")}
              className="flex-1 inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <Trash2 className="h-3 w-3" /> Limpar
            </button>
          </div>
        </section>

        {/* FOOTER LOGO */}
        <section className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm dark:border-neutral-700 dark:bg-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-vibra-50 text-vibra-700 font-bold text-xs dark:bg-vibra-900/50 dark:text-vibra-400">
              4
            </span>
            <h2 className="text-[13.5px] font-bold text-vibra-800 dark:text-white">
              Logotipo do Rodapé
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Exibido no lado direito do rodapé da página (Footer). Recomenda-se logotipo com fundo
            transparente.
          </p>

          {/* Drag & Drop Area */}
          <div
            className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition ${
              dragActive["footer"]
                ? "border-vibra-600 bg-vibra-50/50"
                : "border-neutral-200 hover:border-vibra-500 hover:bg-neutral-50/40 dark:border-neutral-700"
            }`}
            onDragEnter={(e) => handleDrag(e, "footer")}
            onDragLeave={(e) => handleDrag(e, "footer")}
            onDragOver={(e) => handleDrag(e, "footer")}
            onDrop={(e) => handleDrop(e, "footer")}
            onClick={() => fileInputFooterRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputFooterRef}
              onChange={(e) => handleFileChange(e, "footer")}
              className="hidden"
              accept="image/*"
            />
            {footerLogo ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={footerLogo}
                  alt="Footer Logo Preview"
                  className="max-h-16 max-w-full object-contain rounded"
                />
                <span className="text-[10px] font-medium text-vibra-700 dark:text-vibra-400">
                  Clique para substituir
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-1.5">
                <Upload className="h-5 w-5 text-neutral-400" />
                <p className="text-[11.5px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Arraste ou clique para enviar
                </p>
                <p className="text-[10px] text-neutral-400">PNG, SVG ou JPG (máx. 2MB)</p>
              </div>
            )}
          </div>

          {/* URL Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              Ou use uma URL externa:
            </label>
            <input
              className={inputCls}
              placeholder="https://exemplo.com/logo-rodape.png"
              value={footerLogo.startsWith("data:") ? "" : footerLogo}
              onChange={(e) => setFooterLogo(e.target.value)}
            />
          </div>

          {/* Size Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[11px] font-semibold text-vibra-800 dark:text-neutral-300">
              <span>Altura do Logotipo (px):</span>
              <span className="text-vibra-600 font-bold">{footerLogoSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="120"
              value={footerLogoSize}
              onChange={(e) => setFooterLogoSize(Number(e.target.value))}
              className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-vibra-600"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => handleReset("footer")}
              className="flex-1 inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <Trash2 className="h-3 w-3" /> Limpar
            </button>
          </div>
        </section>
      </div>

      {/* FOOTER & GLOBAL ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-vibra-600 shrink-0" />
          <p className="text-[12px] text-muted-foreground leading-snug">
            {loginLogo || loadingLogo || moduleLogo || footerLogo
              ? "✓ Há modificações de design prontas para serem aplicadas."
              : "Usando as marcas e logotipos padrão do sistema."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleReset("all")}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-4 text-[12px] font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Redefinir Tudo
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-vibra-700 px-5 text-[12px] font-semibold text-white hover:bg-vibra-800 disabled:opacity-50 transition"
          >
            {saving ? "Salvando..." : "Salvar Configurações Visuais"}
          </button>
        </div>
      </div>
    </div>
  );
}
