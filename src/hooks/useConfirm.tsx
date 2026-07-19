import { create } from "zustand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  resolve: ((value: boolean) => void) | null;
  confirm: (title: string, message: string) => Promise<boolean>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  title: "",
  message: "",
  resolve: null,
  confirm: (title: string, message: string) => {
    return new Promise<boolean>((resolve) => {
      set({
        isOpen: true,
        title,
        message,
        resolve,
      });
    });
  },
  onConfirm: () => {
    const resolve = get().resolve;
    if (resolve) resolve(true);
    set({ isOpen: false, resolve: null });
  },
  onCancel: () => {
    const resolve = get().resolve;
    if (resolve) resolve(false);
    set({ isOpen: false, resolve: null });
  },
}));

export function ConfirmDialog() {
  const { isOpen, title, message, onConfirm, onCancel } = useConfirmStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="border border-border bg-white p-6 shadow-vibra max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-vibra-800">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex gap-2 justify-end">
          <AlertDialogCancel
            onClick={onCancel}
            className="rounded-md border border-border px-3 py-1.5 text-[12px]"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useConfirm() {
  return useConfirmStore((state) => state.confirm);
}
