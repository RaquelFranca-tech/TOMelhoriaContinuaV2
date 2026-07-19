import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import {
  Image,
  Upload,
  Trash2,
  Eye,
  Plus,
  X,
  Maximize2,
  CheckCircle,
  AlertTriangle,
  AspectRatio,
  Compass,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";

export function MuralImagensTab() {
  const { projetoId } = useHierarchy();

  if (!projetoId) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <Image className="h-12 w-12 text-slate-400 mb-4 animate-pulse" />
        <h3 className="text-base font-bold text-slate-800">Selecione um Projeto</h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1">
          Por favor, selecione um projeto no seletor do topo para gerenciar o mural de imagens
          estratégicas.
        </p>
      </div>
    );
  }

  return <MuralImagensInner projetoId={projetoId} />;
}

function MuralImagensInner({ projetoId }: { projetoId: string }) {
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<"16:9" | "9:16">("16:9");
  const [legend, setLegend] = useState("");

  // Selected Image for Large Full Screen Modal
  const [activeViewerImage, setActiveViewerImage] = useState<any | null>(null);

  // Load project images
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["projeto_imagens", projetoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projeto_imagens")
        .select("*")
        .eq("projeto_id", projetoId)
        .is("deleted_at", null)
        .order("created_at", { ascending: true });
      if (error) {
        console.error(error);
        return [];
      }
      return data ?? [];
    },
  });

  // Convert File to Base64/DataURL
  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle File Upload/Drop
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Max 8 images constraint check
    if (images.length >= 8) {
      toast.error("Limite máximo de 8 imagens estratégicas por projeto atingido!");
      return;
    }

    setUploading(true);
    try {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("O arquivo selecionado não é uma imagem válida.");
        return;
      }

      // Max size limit to prevent huge base64 strings in Firestore (e.g. 1.2MB max payload size)
      if (file.size > 1.5 * 1024 * 1024) {
        toast.error(
          "A imagem excede 1.5MB de tamanho. Por favor, utilize uma imagem mais leve ou otimizada.",
        );
        return;
      }

      const dataUrl = await fileToDataURL(file);

      const { error } = await supabase.from("projeto_imagens").insert({
        projeto_id: projetoId,
        url: dataUrl,
        legenda: legend.trim() || file.name.split(".")[0],
        aspect_ratio: selectedRatio,
      });

      if (error) {
        toast.error("Erro ao salvar imagem: " + error.message);
      } else {
        toast.success("Imagem enviada com sucesso!");
        setLegend("");
        qc.invalidateQueries({ queryKey: ["projeto_imagens", projetoId] });
      }
    } catch (e: any) {
      toast.error("Falha ao ler o arquivo: " + e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  // Delete Image
  const handleDeleteImage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Tem certeza que deseja remover esta imagem estratégica do mural?")) return;

    const { error } = await supabase
      .from("projeto_imagens")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao remover imagem: " + error.message);
    } else {
      toast.success("Imagem removida com sucesso.");
      qc.invalidateQueries({ queryKey: ["projeto_imagens", projetoId] });
      if (activeViewerImage?.id === id) {
        setActiveViewerImage(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Mural Banner */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-slate-900 to-blue-950 p-5 text-white shadow-vibra-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold bg-white/10 px-2 py-0.5 rounded">
              Módulo Executivo & Comunicação
            </span>
            <h2 className="text-[18px] font-black tracking-tight mt-1.5">
              Mural Estratégico do Projeto
            </h2>
            <p className="text-xs text-blue-100/80 mt-1">
              Faça upload das até 8 imagens mais importantes e de maior impacto (fluxos As Is,
              diagramas, fotos da operação ou protótipos To Be) para visualização em tamanho grande
              no Dashboard Executivo.
            </p>
          </div>
          <span className="self-start sm:self-center rounded-xl bg-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-300 border border-blue-500/30">
            {images.length}/8 Imagens Carregadas
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Control Area */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
            <h3 className="text-[13px] font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Upload className="h-4.5 w-4.5 text-blue-600" />
              <span>Adicionar ao Mural</span>
            </h3>

            <div className="space-y-4">
              {/* Aspect Ratio Config */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Formato Proporcional
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedRatio("16:9")}
                    className={`rounded border p-2 text-center text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                      selectedRatio === "16:9"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-input bg-white text-muted-foreground hover:bg-slate-50"
                    }`}
                  >
                    <div className="w-10 h-6 bg-slate-200 border border-slate-300 rounded mb-0.5 flex items-center justify-center text-[8px] font-mono">
                      16:9
                    </div>
                    <span>Paisagem (16:9)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRatio("9:16")}
                    className={`rounded border p-2 text-center text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                      selectedRatio === "9:16"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-input bg-white text-muted-foreground hover:bg-slate-50"
                    }`}
                  >
                    <div className="w-6 h-10 bg-slate-200 border border-slate-300 rounded mb-0.5 flex items-center justify-center text-[8px] font-mono">
                      9:16
                    </div>
                    <span>Retrato (9:16)</span>
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Legenda da Imagem
                </label>
                <input
                  type="text"
                  placeholder="Ex: Novo Fluxo de Trabalho (TO BE) Automatizado"
                  className="mt-1 w-full rounded border border-input px-2.5 py-2 text-xs bg-white focus:outline-none focus:border-blue-600"
                  value={legend}
                  onChange={(e) => setLegend(e.target.value)}
                />
              </div>

              {/* Upload Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center ${
                  uploading
                    ? "bg-slate-50 border-blue-400"
                    : "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50/20"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  disabled={uploading}
                />

                {uploading ? (
                  <div className="space-y-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
                    <p className="text-xs text-slate-600 font-bold">
                      Processando e salvando imagem...
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      Clique para escolher ou arraste a imagem
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      PNG, JPG, WEBP de no máximo 1.5 MB
                    </p>
                  </>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10.5px] text-amber-800 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  As imagens enviadas aqui serão compartilhadas diretamente com as instâncias
                  executivas. Planeje o mural de forma estratégica.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Grid Display Mural (Cols 2) */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm h-full flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-slate-900">
                  Mural de Exposição do Projeto
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Clique na imagem para visualizar em tela cheia.
                </p>
              </div>
              <span className="rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                {images.length}/8 imagens
              </span>
            </div>

            {images.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                <Image className="h-10 w-10 text-slate-300 mb-2" />
                <p className="text-[11.5px] font-medium">Nenhuma imagem carregada no mural.</p>
                <p className="text-[10px] mt-0.5">
                  Faça o upload do seu primeiro diagrama estratégico no painel lateral.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveViewerImage(img)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-slate-100 shadow hover:shadow-md hover:border-blue-500 transition-all flex flex-col"
                  >
                    {/* Top image content */}
                    <div
                      className={`relative w-full ${img.aspect_ratio === "16:9" ? "aspect-video" : "aspect-[9/16] h-[240px] flex items-center justify-center bg-slate-900"}`}
                    >
                      <img
                        src={img.url}
                        alt={img.legenda}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
                        referrerPolicy="no-referrer"
                      />

                      {/* Format Badge */}
                      <span className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[8.5px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                        Proporção {img.aspect_ratio}
                      </span>

                      {/* Cover Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="h-5 w-5 text-white animate-bounce" />
                      </div>
                    </div>

                    {/* Legend / Caption Info */}
                    <div className="p-2 bg-white flex items-center justify-between border-t border-slate-100">
                      <p className="text-[11px] font-bold text-slate-800 truncate pr-2 flex-1">
                        {img.legenda}
                      </p>
                      <button
                        onClick={(e) => handleDeleteImage(img.id, e)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition shrink-0"
                        title="Remover"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Large Full Screen Modal Viewer */}
      {activeViewerImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in">
          <button
            onClick={() => setActiveViewerImage(null)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div
              className={`relative ${activeViewerImage.aspect_ratio === "16:9" ? "w-full aspect-video" : "h-[85vh] aspect-[9/16]"} bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-white/10`}
            >
              <img
                src={activeViewerImage.url}
                alt={activeViewerImage.legenda}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="rounded bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                Formato {activeViewerImage.aspect_ratio}
              </span>
              <h4 className="text-[15px] font-black text-white mt-1.5">
                {activeViewerImage.legenda}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
