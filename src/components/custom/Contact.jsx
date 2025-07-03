import React from "react";

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-2 text-violet-700 font-space-grotesk">Contact Us</h1>
      <p className="mb-8 text-gray-600">Have a question, feedback, or partnership inquiry? Fill out the form below and we'll get back to you soon.</p>
      <form className="space-y-6 bg-white/80 rounded-xl shadow-lg p-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-violet-400 outline-none" placeholder="Your Name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-violet-400 outline-none" placeholder="you@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-violet-400 outline-none min-h-[100px]" placeholder="How can we help?" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow hover:from-violet-600 hover:to-indigo-600 transition">Send Message</button>
      </form>
    </div>
  );
} 