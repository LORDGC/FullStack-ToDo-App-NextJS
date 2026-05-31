"use client";

import { Card, CardContent } from "@/components/ui/card";
import NoteCard from "./note-card";
import useGetNotes from "../api/use-get-notes";

import { format } from "date-fns";
import { uk } from "date-fns/locale"; // Імпортуємо українську локалізацію для дат
import { useEditNoteDialog } from "../hooks/use-edit-note-dialog";
import useDeleteNote from "../api/use-delete-note";
import useEditNoteState from "../api/use-edit-note-state";
import { useState } from "react";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Terminal } from "lucide-react"; // Кіберпанк іконки

export default function NoteContainer() {
  const { onOpen } = useEditNoteDialog();

  const notesQuery = useGetNotes();
  const deleteNoteMutation = useDeleteNote();
  const editNoteStateMutation = useEditNoteState();

  const isPending = deleteNoteMutation.isPending || editNoteStateMutation.isPending;

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 font-mono">

        {/* Стілізований лоадер під час завантаження списку */}
        {notesQuery.isLoading && (
            <div className="flex flex-col items-center justify-center col-span-full my-12 gap-3 animate-pulse">
              <Spinner className="w-12 h-12 text-amber-500" />
              <span className="text-xs uppercase tracking-widest text-amber-500/70">Зчитування секторів даних...</span>
            </div>
        )}

        {/* Помилка завантаження в стилі збою мережі */}
        {notesQuery.error && (
            <div className="flex items-center gap-4 flex-col w-full col-span-full my-12 p-6 border border-rose-500/30 bg-rose-950/20 rounded-xl relative overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <div className="flex items-center gap-3 text-rose-400 text-lg font-bold uppercase tracking-wider">
                <ShieldAlert className="size-7 animate-bounce text-rose-500" />
                <span>Помилка синхронізації з ядром!</span>
              </div>
              <p className="text-xs text-slate-400 text-center max-w-xs lowercase">
                не вдалося отримати доступ до віддалених репозиторіїв нотаток
              </p>
              <Button
                  onClick={() => notesQuery.refetch()}
                  className="mt-2 bg-transparent border border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-slate-950 font-bold uppercase text-xs tracking-widest transition-all rounded-md px-6 py-4"
              >
                Повторити запит до бази
              </Button>
            </div>
        )}

        {/* ТОЙ САМИЙ СТИЛЬНИЙ ПОРОЖНІЙ СТАН (Замість no notes here!) */}
        {notesQuery.data?.length === 0 && (
            <div className="flex flex-col items-center justify-center col-span-full py-16 gap-2 text-center">
          <span className="text-sm uppercase font-bold tracking-widest text-slate-500 animate-pulse flex items-center gap-2">
            <Terminal className="size-4 text-slate-600" /> [ СЕКТОР_ПОРОЖНІЙ ]
          </span>
              <p className="text-[11px] text-slate-600 lowercase tracking-wide max-w-xs">
                активних зашифрованих записів у хмарній базі даних не виявлено
              </p>
            </div>
        )}

        {/* Рендеринг карток */}
        {notesQuery.data
            ?.sort((note) => (note.state === "COMPLETED" ? 1 : 0))
            .map((note) => {
              return (
                  <NoteCard
                      key={note.id}
                      title={note.title}
                      description={note.description}
                      categories={note.categories}
                      doneIn={note.doneIn ? format(new Date(note.doneIn), "dd MMM", { locale: uk }) : "Без дати"}
                      state={note.state}
                      onEdit={() => onOpen(note.id)}
                      onDelete={() => deleteNoteMutation.mutate({ id: note.id })}
                      setNoteIsCompleted={() =>
                          editNoteStateMutation.mutate({
                            id: note.id,
                            state: note.state === "COMPLETED" ? "TODO" : "COMPLETED",
                          })
                      }
                      noteIsCompleted={note.state === "COMPLETED"}
                      isPending={isPending}
                  />
              );
            })}
      </div>
  );
}