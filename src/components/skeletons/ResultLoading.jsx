import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ResultLoading() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-50">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900 to-black bg-opacity-95 flex flex-col items-center justify-center space-y-12">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI bot"
            className="w-20 h-20 drop-shadow-lg"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />

          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-8 bg-purple-500 rounded-sm"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 1.8, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-white text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2"
          >
            <Sparkles className="text-yellow-400 animate-pulse" />
            AI is generating magic...
            <Sparkles className="text-yellow-400 animate-pulse" />
          </motion.h2>
        </div>
      </div>
    </div>
  );
}