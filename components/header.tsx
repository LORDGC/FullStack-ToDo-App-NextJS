"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Spinner from "./spinner";
import { Button } from "./ui/button";
import Image from "next/image";
import { Terminal, Activity, Radio, Cpu } from "lucide-react"; // Імпортуємо кіберпанк-іконки для UI

export default function Header() {
  return (
      <header className="flex flex-col border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md font-mono text-slate-200 selection:bg-amber-500 selection:text-slate-950">

        {/* Верхня навігаційна панель — Система керування */}
        <nav className="flex items-center justify-between w-full py-4 px-6 border-b border-slate-900 bg-slate-950/60 relative overflow-hidden">
          {/* Декоративна неонова смужка зверху навігації */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-transparent opacity-70"></div>

          <div className="flex items-center gap-3 group relative z-10">
            <div className="relative p-1 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-amber-500/40 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <Image
                  src="/logo.png"
                  alt="логотип системи нотаток"
                  width={42}
                  height={42}
                  className="brightness-95 contrast-105"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold uppercase tracking-wider text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                KNOTS_SYS
              </h2>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest -mt-1 flex items-center gap-1">
              <Radio className="size-2 text-emerald-500 animate-pulse" /> ПРОТОКОЛ: v1.0.4
            </span>
            </div>
          </div>

          {/* Секція Авторизації Clerk */}
          <div className="relative z-10 flex items-center gap-4">
            <ClerkLoading>
              <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest animate-pulse">
                <Spinner className="size-4 text-amber-500" />
                <span className="hidden sm:inline">Зчитування токена...</span>
              </div>
            </ClerkLoading>

            <ClerkLoaded>
              <SignedOut>
                {/* Авторизація у стилі підключення до мережі */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <Button
                      asChild
                      className="relative bg-slate-950 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold uppercase text-xs tracking-wider px-5 py-2 rounded-lg transition-all active:scale-95"
                  >
                    {/* Передаємо текст всередину кнопки як дітей, прибираючи label */}
                    <SignInButton mode="modal">
                      УВІЙТИ_В_СИСТЕМУ
                    </SignInButton>
                  </Button>
                </div>
              </SignedOut>

              <SignedIn>
                {/* Обгортка навколо аватара користувача з неоновою рамкою */}
                <div className="p-0.5 rounded-full border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-slate-950 transition-all hover:border-emerald-400">
                  <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "size-8 rounded-full"
                        }
                      }}
                  />
                </div>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </nav>

        {/* Головний Hero-блок (Лендінг секція) */}
        <div className="flex items-center flex-col md:flex-row px-6 md:px-16 py-16 md:py-24 gap-12 md:gap-24 lg:gap-40 max-w-7xl mx-auto w-full relative">

          {/* Фонові кібер-індикатори для атмосфери (дрібний системний текст) */}
          <div className="absolute top-6 left-6 text-[10px] text-slate-700 uppercase tracking-widest select-none pointer-events-none hidden lg:block space-y-1">
            <div className="flex items-center gap-1"><Cpu className="size-3" /> CORE_LOAD: 24%</div>
            <div className="flex items-center gap-1"><Activity className="size-3" /> NET_STATUS: SECURE</div>
          </div>

          {/* Текстовий блок опису проєкту */}
          <div className="space-y-4 flex-1 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/5 border border-amber-500/20 text-[10px] text-amber-400 uppercase font-bold tracking-widest mx-auto md:mx-0">
              <Terminal className="size-3 animate-pulse" /> Термінальний Нотатник РГР
            </div>

            <h1 className="text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              КЕРУВАННЯ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]">НОТАТКАМИ</span>
            </h1>

            <p className="max-w-[540px] text-slate-400 text-xs sm:text-sm leading-relaxed font-sans normal-case mx-auto md:mx-0">
              Автономний багатофункціональний інструмент розробника для миттєвої фіксації ідей, структурування завдань та синхронізації категорій у реальному часі. База даних розгорнута на хмарних секторах реляційного ядра <span className="text-amber-500/90 font-mono text-xs border border-slate-800 px-1 py-0.5 rounded bg-slate-900/50">PostgreSQL</span> з підтримкою безпеки типів.
            </p>
          </div>

          {/* Праве зображення із неоновим підсвічуванням плашки */}
          <div className="flex-1 flex justify-center relative z-10 group">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-transparent rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative border border-slate-800/80 bg-slate-900/20 backdrop-blur-sm p-6 rounded-2xl shadow-2xl shadow-black/60 transition-all duration-300 group-hover:border-amber-500/20">
              {/* Кутові кібер-декори на рамці малюнка */}
              <div className="absolute top-0 left-0 w-3 h-[1px] bg-amber-500"></div>
              <div className="absolute top-0 left-0 w-[1px] h-3 bg-amber-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-amber-500"></div>
              <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-amber-500"></div>

              <Image
                  src="/header-img.png"
                  alt="ілюстрація інтерфейсу нотаток"
                  width={260}
                  height={260}
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
              />
            </div>
          </div>

        </div>
      </header>
  );
}