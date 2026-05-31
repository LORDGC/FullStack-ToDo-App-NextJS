"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { uk } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            locale={uk}
            className={cn(
                "p-4 bg-slate-950/90 border border-slate-800 rounded-xl font-mono text-slate-200 shadow-xl shadow-black/50 relative overflow-hidden",
                className
            )}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-amber-500 font-bold uppercase tracking-wider text-xs",
                caption_label: "text-xs font-bold tracking-widest",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-slate-900 border-slate-800 p-0 opacity-70 hover:opacity-100 text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex border-b border-slate-900 pb-1 justify-between",
                head_cell: "text-slate-500 rounded-md w-9 font-bold text-[10px] uppercase tracking-wider text-center",
                row: "flex w-full mt-1.5 justify-between",
                cell: "h-9 w-9 text-center text-xs p-0 relative focus-within:relative focus-within:z-20 transition-all rounded-md",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 text-xs font-medium text-slate-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30 transition-all rounded-md aria-selected:opacity-100"
                ),
                day_range_end: "day-range-end",
                // Вибраний день з неоновим бурштиновим свіченням
                day_selected:
                    "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black hover:from-amber-500 hover:to-yellow-400 focus:from-amber-500 focus:to-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] border border-amber-400/30 updates",
                // Поточний день системи (сьогодні)
                day_today: "bg-slate-900 border border-slate-700 text-amber-400 font-bold shadow-inner shadow-black/40",
                day_outside:
                    "day-outside text-slate-700 opacity-40 aria-selected:bg-slate-900/50 aria-selected:text-slate-500",
                day_disabled: "text-slate-800 opacity-30 line-through cursor-not-allowed",
                day_range_middle: "aria-selected:bg-slate-900 aria-selected:text-slate-200",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4 text-amber-500" />,
                IconRight: () => <ChevronRight className="h-4 w-4 text-amber-500" />,
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }