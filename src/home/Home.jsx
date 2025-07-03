import React from 'react';
import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Palette,
  FileDown,
  Zap,
  Eye,
  Download,
} from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-7 h-7 text-violet-500" />,
    title: 'Smart Resume Builder',
    desc: 'AI-generated content suggestions tailored to your experience and industry.'
  },
  {
    icon: <Palette className="w-7 h-7 text-violet-500" />,
    title: 'Modern Templates',
    desc: 'Visually optimized layouts designed to impress hiring managers.'
  },
  {
    icon: <Eye className="w-7 h-7 text-violet-500" />,
    title: 'Live Preview',
    desc: 'See changes instantly as you build. No more guessing.'
  },
  {
    icon: <FileDown className="w-7 h-7 text-violet-500" />,
    title: 'One-click Export',
    desc: 'Download your resume in PDF or DOCX format, ready for any application.'
  }
];

const steps = [
  {
    title: 'Input your details',
    desc: 'Answer a few simple prompts about your experience and goals.'
  },
  {
    title: 'Let AI craft your resume',
    desc: 'Clevvita generates a beautiful, effective resume for you.'
  },
  {
    title: 'Download, apply, impress',
    desc: 'Export your resume and start landing interviews.'
  }
];

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="bg-[#F9FAFB] min-h-screen w-full font-sans">
      <Header />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-7"
        >
          <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold mb-2 animate-fade-in">
            AI-Powered Resume Builder
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            AI-Powered Resumes.{" "}
            <span className="text-violet-600">Built Smarter</span>, Faster, and
            Beautifully.
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Clevvita helps you craft intelligent, elegant resumes that stand out
            to recruiters and get you more interviews.
          </p>
          <div className="flex gap-4 mt-6">
            {isSignedIn ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth/sign-in">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  Try Clevvita Free &rarr;
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
        {/* Right: Animated Resume Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Desktop: Main Complex Animation */}
          <div className="relative w-[20rem] hidden md:block">
            {/* Main animated container */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10 "
            >
              {/* AI Brain/Circuit Animation */}
              <div className="w-96 h-96 relative">
                {/* Central AI Core */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    },
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#7F56D9] to-[#6366F1] rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>

                {/* Orbiting Resume Elements */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 12 + i * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                    style={{
                      width: `${140 + i * 35}px`,
                      height: `${140 + i * 35}px`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center shadow-xl ${
                        i % 4 === 0
                          ? "bg-gradient-to-br from-[#7F56D9] to-[#6366F1]"
                          : i % 4 === 1
                          ? "bg-gradient-to-br from-[#059669] to-[#10B981]"
                          : i % 4 === 2
                          ? "bg-gradient-to-br from-[#DC2626] to-[#EF4444]"
                          : "bg-gradient-to-br from-[#F59E0B] to-[#EAB308]"
                      }`}
                    >
                      {i % 8 === 0 && <User className="w-5 h-5 text-white" />}
                      {i % 8 === 1 && (
                        <Briefcase className="w-5 h-5 text-white" />
                      )}
                      {i % 8 === 2 && (
                        <GraduationCap className="w-5 h-5 text-white" />
                      )}
                      {i % 8 === 3 && <Award className="w-5 h-5 text-white" />}
                      {i % 8 === 4 && (
                        <FileText className="w-5 h-5 text-white" />
                      )}
                      {i % 8 === 5 && <Zap className="w-5 h-5 text-white" />}
                      {i % 8 === 6 && <Eye className="w-5 h-5 text-white" />}
                      {i % 8 === 7 && (
                        <Download className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Connecting Lines/Circuits */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: -1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx="50%"
                      cy="50%"
                      r={70 + i * 25}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.4, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 6 + i * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.8,
                      }}
                    />
                  ))}
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7F56D9" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#6366F1"
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating Data Points */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`data-${i}`}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 15, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 4 + (i % 4),
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className="absolute w-3 h-3 bg-gradient-to-br from-[#7F56D9] to-[#6366F1] rounded-full shadow-lg"
                    style={{
                      top: `${15 + (i % 5) * 17}%`,
                      left: `${10 + (i % 6) * 15}%`,
                    }}
                  />
                ))}

                {/* AI Processing Lines */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    animate={{
                      scaleX: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                    className="absolute h-0.5 bg-gradient-to-r from-[#7F56D9] to-[#6366F1] rounded-full"
                    style={{
                      top: `${25 + i * 20}%`,
                      left: "20%",
                      width: "60%",
                      transformOrigin: "left center",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Enhanced Background Effects */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                opacity: [0.05, 0.15, 0.05],
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
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-[#6366F1] to-[#7F56D9] rounded-full blur-3xl"
            />
          </div>

          {/* Mobile: Simple 3D Animation (from How It Works section) */}
          <div className="relative w-full flex justify-center md:hidden">
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 bg-gradient-to-br from-violet-200/60 to-indigo-200/40 rounded-2xl shadow-2xl backdrop-blur-md border border-violet-200 flex items-center justify-center"
              style={{ perspective: 800, boxShadow: '0 8px 32px 0 rgba(127,86,217,0.12)' }}
            >
              <motion.div
                animate={{ rotateX: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 bg-white/30 rounded-xl shadow-inner border border-violet-100"
                style={{ boxShadow: '0 4px 16px 0 rgba(127,86,217,0.10)' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Powerful Features for Modern Job Seekers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/70 backdrop-blur-md border border-stone-200 rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow duration-200 hover:-translate-y-2 cursor-pointer"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-violet-600 transition-colors duration-200">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-3xl mx-auto px-4 py-20 relative">
        {/* 3D Animated Accent on Right */}
        <div className="hidden md:block absolute right-[-7rem] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 bg-gradient-to-br from-violet-200/60 to-indigo-200/40 rounded-2xl shadow-2xl backdrop-blur-md border border-violet-200 flex items-center justify-center"
            style={{ perspective: 800, boxShadow: '0 8px 32px 0 rgba(127,86,217,0.12)' }}
          >
            <motion.div
              animate={{ rotateX: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 bg-white/30 rounded-xl shadow-inner border border-violet-100"
              style={{ boxShadow: '0 4px 16px 0 rgba(127,86,217,0.10)' }}
            />
          </motion.div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-14"
        >
          How It Works
        </motion.h2>
        <div className="relative border-l-2 border-stone-200 pl-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mb-12 last:mb-0 flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-600 text-lg shadow-sm">
                {i + 1}
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
          {/* Vertical line animation */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-3 top-8 w-1 h-[calc(100%-2rem)] bg-gradient-to-b from-violet-200 to-stone-200 rounded-full"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-stone-200 py-10 bg-white/80 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <img src="/logo1.svg" alt="Clevvita Logo" className="h-7" />
            <span className="font-semibold text-gray-900">Clevvita</span>
            <span className="ml-2 text-xs text-gray-400">
              AI Resume Builder
            </span>
          </div>
          <nav className="flex gap-6">
            <Link
              to="/about"
              className="hover:underline underline-offset-4 transition-all"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="hover:underline underline-offset-4 transition-all"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="hover:underline underline-offset-4 transition-all"
            >
              Contact
            </Link>
            <Link
              to="/terms"
              className="hover:underline underline-offset-4 transition-all"
            >
              Terms
            </Link>
          </nav>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.167 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.092-.646.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.15 2.97 4.05 3A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
