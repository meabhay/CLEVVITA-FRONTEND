import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContextProvider } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById } from "./../../services/GlobalApi";
import { RWebShare } from "react-web-share";
import ResumePreview from "@/dashboard/resume/[resumeId]/edit/components/ResumePreview";
import { CheckCircle2, Sparkle, Loader2 } from "lucide-react";
import html2pdf from "html2pdf.js";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResumeById(resumeId).then((resp) => {
      setResumeInfo(resp.data); // changed from resp.data.data.attributes
      setTimeout(() => {
        setAnimate(true);
        setLoading(false);
      }, 100); // trigger animation after data is loaded
    });
  }, [resumeId]);

  const themeColor = resumeInfo?.themeColor || "#7F56D9";
  const softViolet = "#ede9fe";

  const HandleDownload = () => {
    const element = document.getElementById("print-area");
    if (!element) return;
    const opt = {
      margin: 0,
      filename: `${resumeInfo?.firstName || 'resume'}_${resumeInfo?.lastName || ''}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <ResumeInfoContextProvider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print" className="relative">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 transition-opacity duration-500 opacity-100" style={{opacity: loading ? 1 : 0}}>
            <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
          </div>
        )}
        <Header />
        <div
          style={{
            opacity: !loading && animate ? 1 : 0,
            transform: !loading && animate ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)'
          }}
          className="flex flex-col items-center justify-center min-h-[40vh] will-change-transform"
        >
          {!resumeInfo ? (
            <Loader2 className="w-10 h-10 animate-spin text-violet-500 my-20" />
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="rounded-full p-4 mb-4" style={{ background: softViolet }}>
                  <CheckCircle2 className="w-10 h-10 text-[var(--themeColor)]" style={{ color: themeColor }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-2 leading-tight">
                  Congrats! Your Ultimate <span className="bg-gradient-to-r from-violet-600 to-indigo-500 text-transparent bg-clip-text">AI generated Resume</span>
                  <br />is ready!
                </h2>
                <p className="text-center text-gray-500 max-w-xl mb-6">
                  Now you are ready to download your resume and share the unique URL with friends and family.
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center mb-4">
                <Button
                  onClick={HandleDownload}
                  className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md text-base min-w-[150px]"
                >
                  Download
                </Button>
                <RWebShare
                  data={{
                    text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                    url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                    title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <Button
                    className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md text-base min-w-[150px] hover:from-violet-700 hover:to-indigo-600 transition"
                  >
                    Share
                  </Button>
                </RWebShare>
              </div>
              <Button
                className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md text-base flex items-center gap-2"
                style={{ minWidth: 320 }}
              >
                <Sparkle className="w-5 h-5" /> AI Enhanced Resume
              </Button>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          opacity: !loading && animate ? 1 : 0,
          transform: !loading && animate ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)'
        }}
        className="flex flex-col items-start justify-start will-change-transform w-full mt-8"
      >
        {resumeInfo ? (
          <div id="print-area-wrapper" className="w-full flex justify-center">
            <div id="print-area" className="w-full max-w-[210mm] aspect-[210/297] h-auto min-w-0">
              <ResumePreview />
            </div>
          </div>
        ) : (
          <Loader2 className="w-10 h-10 animate-spin text-violet-500 my-20" />
        )}
      </div>
    </ResumeInfoContextProvider>
  );
}

export default ViewResume;
