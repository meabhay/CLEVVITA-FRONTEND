"use client";

import { motion } from "framer-motion";
import { Sparkles, User, Briefcase, GraduationCap, Award } from "lucide-react";

export default function AnimatedResumeCard({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Main Floating Resume Card */}
      <motion.div
        animate={{ y: [0, -20, 0], rotateY: [0, 8, 0, -8, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        {/* Resume Card */}
        <div className="w-64 h-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform perspective-1000">
          {/* Header Bar */}
          <div className="h-6 bg-gradient-to-r from-[#7F56D9] to-[#6366F1] relative">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>

          {/* Resume Content */}
          <div className="p-6 space-y-4">
            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                transition={{
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                  rotate: {
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
                className="w-12 h-12 bg-gradient-to-br from-[#7F56D9] to-[#6366F1] rounded-full flex items-center justify-center"
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>
              <div className="space-y-2">
                <motion.div
                  animate={{ width: ["70%", "90%", "70%"] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="h-3 bg-gray-200 rounded"
                />
                <motion.div
                  animate={{ width: ["50%", "70%", "50%"] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="h-2 bg-gray-100 rounded"
                />
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-[#7F56D9]" />
                <div className="h-2 bg-[#7F56D9]/20 rounded w-20"></div>
              </div>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: [
                      `${60 + i * 10}%`,
                      `${80 + i * 5}%`,
                      `${60 + i * 10}%`,
                    ],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                  className="h-2 bg-gray-200 rounded"
                />
              ))}
            </div>

            {/* Skills Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#6366F1]" />
                <div className="h-2 bg-[#6366F1]/20 rounded w-16"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    className={`h-4 rounded-full ${
                      i % 3 === 0
                        ? "bg-[#7F56D9]/20 w-12"
                        : i % 3 === 1
                        ? "bg-[#6366F1]/20 w-16"
                        : "bg-[#059669]/20 w-10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* AI Enhancement Badge */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="absolute -top-3 -right-3 bg-gradient-to-r from-[#7F56D9] to-[#6366F1] text-white px-3 py-1 rounded-full flex items-center shadow-xl"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">AI Enhanced</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating AI Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="absolute w-2 h-2 bg-gradient-to-br from-[#7F56D9] to-[#6366F1] rounded-full shadow-lg"
          style={{
            top: `${20 + (i % 4) * 20}%`,
            left: `${15 + (i % 5) * 18}%`,
          }}
        />
      ))}

      {/* Orbiting Elements */}
      {[User, Briefcase, GraduationCap, Award].map((Icon, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 15 + i * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${200 + i * 40}px`,
            height: `${200 + i * 40}px`,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
              i % 4 === 0
                ? "bg-gradient-to-br from-[#7F56D9] to-[#6366F1]"
                : i % 4 === 1
                ? "bg-gradient-to-br from-[#059669] to-[#10B981]"
                : i % 4 === 2
                ? "bg-gradient-to-br from-[#DC2626] to-[#EF4444]"
                : "bg-gradient-to-br from-[#F59E0B] to-[#EAB308]"
            }`}
          >
            <Icon className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      ))}

      {/* Background Glow Effects */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-[#7F56D9] to-[#6366F1] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          rotate: [360, 180, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-[#6366F1] to-[#7F56D9] rounded-full blur-3xl"
      />

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx="50%"
            cy="50%"
            r={100 + i * 25}
            fill="none"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            strokeDasharray="4,8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
        <defs>
          <linearGradient
            id="neuralGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7F56D9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
