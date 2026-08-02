"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useEffect } from "react";

export default function XPToastManager() {
  const { xpToasts, removeXPToast } = useGameStore();

  useEffect(() => {
    if (xpToasts.length > 0) {
      const latest = xpToasts[xpToasts.length - 1];
      const timer = setTimeout(() => {
        removeXPToast(latest.id);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [xpToasts, removeXPToast]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {xpToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/90 border border-primary/50 text-foreground shadow-glow-cyan backdrop-blur-lg pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
              <Zap className="w-5 h-5 fill-primary" />
            </div>
            <div>
              <p className="text-sm font-black text-primary">+{toast.amount} XP GAINED!</p>
              <p className="text-xs text-muted-foreground font-semibold">{toast.reason}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
