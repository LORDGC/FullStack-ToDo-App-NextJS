"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Edit2, Trash2, Terminal, CheckCircle2, AlertTriangle } from "lucide-react";

type props = {
  title: string;
  doneIn: string;
  description: string | null;
  categories: { id: string; name: string }[];
  state: string;
  onEdit: () => void;
  onDelete: () => void;
  noteIsCompleted: boolean;
  setNoteIsCompleted: () => void;
  isPending: boolean;
};

export default function NoteCard({
                                   description,
                                   doneIn,
                                   state,
                                   title,
                                   categories,
                                   onEdit,
                                   onDelete,
                                   noteIsCompleted,
                                   setNoteIsCompleted,
                                   isPending
                                 }: props) {
  return (
      <div
          onClick={setNoteIsCompleted}
          className={cn(
              // Базові стилі: глибокий темний колір, моноширинний кібер-шрифт, тонка рамка
              "flex flex-col gap-3 justify-between bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 min-w-[320px] min-h-[180px] cursor-pointer transition-all duration-300 shadow-md shadow-black/40 relative overflow-hidden group font-mono selection:bg-amber-500 selection:text-slate-950",
              // Ховер-ефект: підсвічування рамки фірмовим бурштиновим кольором і легке свічення
              "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:bg-slate-900/40",
              // Стиль, якщо нотатка виконана (переходить у приглушений зелений/темний режим захищеного сектору)
              noteIsCompleted && "bg-emerald-950/10 border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          )}
      >
        {/* Декоративна кіберпанк-лінія зліва, яка яскраво спалахує при наведенні мишки */}
        <div
            className={cn(
                "absolute top-0 left-0 w-[3px] h-full transition-all duration-300 bg-amber-500 opacity-30 group-hover:opacity-100",
                noteIsCompleted && "bg-emerald-500 opacity-40"
            )}
        />

        {/* Верхня панель: Назва та Системні утиліти */}
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-1.5 min-w-0">
            <Terminal className={cn("size-3.5 shrink-0 text-amber-500/70", noteIsCompleted && "text-emerald-500/70")} />
            <p className={cn("text-xs font-bold uppercase tracking-wider text-slate-400 truncate", noteIsCompleted && "text-emerald-500/50")}>
              {title || "БЕЗ_НАЗВИ"}
            </p>
          </div>

          {/* Панель кнопок керування */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
                variant="ghost"
                className="size-8 p-0 bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
            >
              <Edit2 className="size-3.5" />
            </Button>
            <Button
                disabled={isPending}
                variant="ghost"
                className="size-8 p-0 bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 disabled:opacity-30 transition-all rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Головний контент нотатки (Опис завдання) */}
        <div className="relative z-10 my-1 flex-grow">
          {noteIsCompleted ? (
              <div className="flex items-start gap-2 text-emerald-400/60 line-through decoration-emerald-500/40 italic text-sm transition-all">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                <p className="line-clamp-3">{description || title}</p>
              </div>
          ) : (
              <div className="text-slate-200 text-sm font-medium leading-relaxed">
                <p className="line-clamp-3 break-words">{description || title}</p>
              </div>
          )}
        </div>

        {/* Нижня панель: Теги (Категорії) та Дедлайн */}
        <div className="flex flex-col gap-3.5 mt-1 relative z-10">
          {/* Блок категорій з неоновими плашками */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.length > 0 ? (
                categories.map(
                    (category) =>
                        category && (
                            <span
                                key={category.id}
                                className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500/5 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.02)] transition-all group-hover:border-amber-500/30"
                            >
                    {category.name}
                  </span>
                        )
                )
            ) : (
                <span className="text-[10px] uppercase text-slate-600 tracking-wider">немає_сектора</span>
            )}
          </div>

          {/* Дата дедлайну */}
          <div
              className={cn(
                  "flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-slate-900/50 border border-slate-800/60 rounded-md max-w-fit transition-colors",
                  noteIsCompleted ? "text-emerald-500/60 border-emerald-500/10 bg-emerald-950/5" : "text-amber-500/80 border-slate-800 group-hover:border-amber-500/20"
              )}
          >
            <Clock className="size-3.5 shrink-0" />
            <span>До: {doneIn}</span>
          </div>
        </div>
      </div>
  );
}