import React from "react";

const faqs = [
  {
    q: "What is Clevvita?",
    a: "Clevvita is an AI-powered resume builder that helps you create beautiful, professional resumes in minutes."
  },
  {
    q: "Is Clevvita free to use?",
    a: "Clevvita offers a free tier with core features. Premium features may require a subscription."
  },
  {
    q: "How do I contact support?",
    a: "You can reach out via the contact form on our Contact page. We'll get back to you as soon as possible."
  },
  {
    q: "Can I download my resume as PDF?",
    a: "Yes! You can easily export your resume as a PDF from the dashboard or view page."
  },
  {
    q: "Is my data secure?",
    a: "We take your privacy seriously and use modern security practices to protect your data."
  }
];

export default function FAQ() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-4 text-violet-700 font-space-grotesk">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((item, idx) => (
          <div key={idx} className="bg-white/80 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-violet-600 mb-2">{item.q}</h2>
            <p className="text-gray-700">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 