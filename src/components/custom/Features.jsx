import React from 'react';
import { Sparkles, Palette, Eye, FileDown } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-violet-500 mx-auto" />,
    title: 'Smart Resume Builder',
    desc: 'AI-generated content suggestions tailored to your experience and industry.'
  },
  {
    icon: <Palette className="w-8 h-8 text-violet-500 mx-auto" />,
    title: 'Modern Templates',
    desc: 'Visually optimized layouts designed to impress hiring managers.'
  },
  {
    icon: <Eye className="w-8 h-8 text-violet-500 mx-auto" />,
    title: 'Live Preview',
    desc: 'See changes instantly as you build. No more guessing.'
  },
  {
    icon: <FileDown className="w-8 h-8 text-violet-500 mx-auto" />,
    title: 'One-click Export',
    desc: 'Download your resume in PDF or DOCX format, ready for any application.'
  }
];

export default function Features() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-violet-700">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            {f.icon}
            <h2 className="mt-4 text-xl font-bold text-gray-900">{f.title}</h2>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 