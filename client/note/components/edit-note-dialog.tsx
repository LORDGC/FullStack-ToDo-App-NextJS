"use client";

import useGetNotes from "../api/use-get-notes";
import useNewNote from "../api/use-new-note";
import { format } from "date-fns";
import useGetCategories from "@/client/categories/api/use-get-categories";
import useNewCategory from "@/client/categories/api/use-new-category";
import Spinner from "@/components/spinner";
import DialogComponent from "@/components/dialog";
import NoteForm from "./note-form";
import { useEditNoteDialog } from "../hooks/use-edit-note-dialog";
import useEditNote from "../api/use-edit-note";
import useGetNote from "../api/use-get-note";
import { useEffect } from "react";
import { ShieldAlert, Terminal } from "lucide-react"; // Імпортуємо більш атмосферні кіберпанк іконки
import { Button } from "@/components/ui/button";

export default function EditNoteDialog() {
  const { isOpen, onClose, id } = useEditNoteDialog();

  const noteQuery = useGetNote(id);
  const categoriesQuery = useGetCategories();

  const editNoteMutation = useEditNote();
  const categoryMutation = useNewCategory();

  const isPending = categoryMutation.isPending || editNoteMutation.isPending;
  const isLoading = categoriesQuery.isLoading || noteQuery.isLoading;

  const loadingError = noteQuery.error;

  useEffect(() => {
    if (isOpen === true) {
      noteQuery.refetch();
      categoriesQuery.refetch();
    }
  }, [isOpen, categoriesQuery, noteQuery]);

  const categoryToSelectOptions = (categories: { id: string; name: string }[]) => {
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  };

  return (
      <DialogComponent
          title="РЕЖИМ_РЕДАГУВАННЯ_НОТАТКИ"
          isOpen={isOpen}
          onOpenChange={onClose}
      >
        <div className="relative text-slate-100 font-mono selection:bg-amber-500 selection:text-slate-950">

          {isLoading && (
              <div className="flex flex-col items-center justify-center my-12 gap-3 animate-pulse">
                <Spinner className="w-12 h-12 text-amber-500" />
                <span className="text-xs uppercase tracking-widest text-amber-500/70">Синхронізація з базою...</span>
              </div>
          )}

          {loadingError && (
              <div className="flex items-center gap-4 flex-col w-full col-span-full my-12 p-6 border border-rose-500/30 bg-rose-950/20 rounded-xl relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.05)]">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                <div className="flex items-center gap-3 text-rose-400 text-lg font-bold uppercase tracking-wider">
                  <ShieldAlert className="size-7 animate-bounce text-rose-500" />
                  <span>Критичний збій системи!</span>
                </div>
                <p className="text-xs text-slate-400 text-center max-w-xs lowercase">
                  не вдалося зчитати зашифрований пакет даних нотатки
                </p>
                <Button
                    onClick={() => noteQuery.refetch()}
                    className="mt-2 bg-transparent border border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-slate-950 font-bold uppercase text-xs tracking-widest transition-all rounded-md px-6 py-4"
                >
                  Перезапустити запит
                </Button>
              </div>
          )}

          {!isLoading && !loadingError && (
              <div className="p-1 relative">
                <div className="absolute -top-3 right-4 flex items-center gap-1.5 bg-slate-950 px-2 text-[10px] uppercase text-slate-500 border border-slate-800/60 rounded">
                  <Terminal className="size-3 text-amber-500 animate-pulse" />
                  <span>ID: {id?.toString().slice(0, 8)}...</span>
                </div>

                <NoteForm
                    defaultValues={{
                      categories: categoryToSelectOptions(noteQuery.data?.categories ?? []),
                      description: noteQuery.data?.description ?? "",
                      doneIn: new Date(noteQuery.data?.doneIn ?? ""),
                      title: noteQuery.data?.title ?? "",
                    }}
                    onSubmit={(data) =>
                        editNoteMutation.mutate(
                            {
                              ...data,
                              id: id as string,
                              categoryIds: (data.categories ?? []).map((category) => category.value),
                            },
                            { onSuccess: () => onClose() }
                        )
                    }
                    categories={categoryToSelectOptions(categoriesQuery.data ?? [])}
                    onCreateOption={(inputValue) => categoryMutation.mutate({ name: inputValue })}
                    disabled={isPending}
                />
              </div>
          )}
        </div>
      </DialogComponent>
  );
}