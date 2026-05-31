import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    // Базові стилі кнопки: додаємо моноширинний шрифт (font-mono),uppercase та плавні кібер-анімації
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-bold uppercase tracking-wider uppercase transition-all duration-350 ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 font-mono active:scale-[0.97]",
    {
        variants: {
            variant: {
                // Головна кнопка
                default: "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:from-amber-600 hover:to-yellow-500 shadow-lg shadow-amber-500/10 border border-amber-400/20",

                // Кнопка видалення
                destructive: "bg-slate-950 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-slate-950 shadow-md shadow-rose-500/5 hover:border-rose-500",

                // Кнопка-рамка
                outline: "border border-slate-800 bg-slate-950/40 backdrop-blur-sm text-slate-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30",

                // Кнопка захищеного сектору
                secondary: "bg-slate-950 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 shadow-md shadow-emerald-500/5",

                // Прихована кнопка
                ghost: "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent hover:border-slate-800",

                // Кнопка-посилання
                link: "text-amber-400 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-8 rounded-md px-3 text-[10px]",
                lg: "h-11 rounded-xl px-8 tracking-widest",
                icon: "h-9 w-9 p-0 rounded-md", // трохи підкоригували розмір під іконки
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };