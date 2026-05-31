import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    // Базовий кібер-стиль: глибокий темний фон, суворі рамки, моноширинний шрифт
                    "flex h-10 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs font-mono text-slate-100 tracking-wide transition-all duration-300",

                    // Стилізація завантаження файлів (якщо знадобиться в майбутньому)
                    "file:border-0 file:bg-transparent file:text-xs file:font-bold file:font-mono file:uppercase file:text-amber-400 file:cursor-pointer",

                    // Стиль підказок (placeholder) — робимо їх тьмянішими, в стилі неактивних логів терміналу
                    "placeholder:text-slate-600 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest",

                    // Ефект наведення курсора (hover): рамка починає злегка світитися
                    "hover:border-slate-700 hover:bg-slate-900/40",

                    // Ультимативний ефект фокусу (кліку): спалахує фірмовий неоновий бурштин (amber)
                    "focus-visible:outline-none focus-visible:border-amber-500/50 focus-visible:ring-2 focus-visible:ring-amber-500/20 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_15px_rgba(245,158,11,0.07)]",

                    // Стан, коли поле заблоковане (disabled)
                    "disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-slate-950",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }