"use client";

import useGetNotes from "../api/use-get-notes";
import useNewNote from "../api/use-new-note";
import { format } from "date-fns";
import useGetCategories from "@/client/categories/api/use-get-categories";
import useNewCategory from "@/client/categories/api/use-new-category";
import Spinner from "@/components/spinner";
import DialogComponent from "@/components/dialog";
import NoteForm from "./note-form";
import { useNewNoteDialog } from "../hooks/use-new-note-dialog";
import { Terminal } from "lucide-react"; // Імпортуємо іконку терміналу для атмосфери

export default function NewNoteDialog() {
  const { isOpen, onClose } = useNewNoteDialog();

  const categoriesQuery = useGetCategories();

  const newNoteMutation = useNewNote();
  const categoryMutation = useNewCategory();

  const isPending = categoryMutation.isPending || newNoteMutation.isPending;
  const isLoading = categoriesQuery.isLoading;

  return (
      <DialogComponent
          title="ІНІЦІАЛІЗАЦІЯ_СТВОРЕННЯ_НОТАТКИ"
          isOpen={isOpen}
          onOpenChange={onClose}
      >
        {/* Контейнер у моноширинному кіберпанк-стилі з кастомним виділенням тексту */}
        <div className="relative text-slate-100 font-mono selection:bg-amber-500 selection:text-slate-950">

          {/* Стілізований лоадер сканування категорій */}
          {isLoading && (
              <div className="flex flex-col items-center justify-center my-12 gap-3 animate-pulse">
                <Spinner className="w-12 h-12 text-amber-500" />
                <span className="text-xs uppercase tracking-widest text-amber-500/70">Сканування секторів бази...</span>
              </div>
          )}

          {/* Сама форма */}
          {!isLoading && (
              <div className="p-1 relative">
                {/* Маленька плашка-декор зліва вгорі в стилі UI воєнного терміналу */}
                <div className="absolute -top-3 right-4 flex items-center gap-1.5 bg-slate-950 px-2 text-[10px] uppercase text-amber-500/80 border border-slate-800/60 rounded">
                  <Terminal className="size-3 text-amber-500 animate-pulse" />
                  <span>СТАТУС: READY</span>
                </div>

                <NoteForm
                    defaultValues={{
                      categories: [],
                      description: "",
                      doneIn: new Date(),
                      title: "",
                    }}
                    onSubmit={(data) =>
                        newNoteMutation.mutate(
                            {
                              ...data,
                              categoryIds: (data.categories ?? []).map((category) => category.value)
                            },
                            { onSuccess: () => onClose() }
                        )
                    }
                    categories={(categoriesQuery.data ?? []).map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    onCreateOption={(inputValue) => categoryMutation.mutate({ name: inputValue })}
                    disabled={isPending}
                />
              </div>
          )}
        </div>
      </DialogComponent>
  );
}