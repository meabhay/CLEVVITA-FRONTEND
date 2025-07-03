// EditResume.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeById } from "../../../../../services/GlobalApi";
import FormSection from "./components/FormSection";
import ResumePreview from "./components/ResumePreview";
import { ResumeInfoContextProvider } from "../../../../context/ResumeInfoContext";
import { useUser } from "@clerk/clerk-react";
import dummy from "../../../../dummy";
import { LoaderCircle } from "lucide-react";

function EditResume() {
  const params = useParams();
  const { user } = useUser();
  const [resumeInfo, setResumeInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      if (!params?.resumeId) return;
      try {
        setLoading(true);
        const res = await getResumeById(params.resumeId);
        const savedData = res.data;
        if (savedData) {
          setResumeInfo(savedData);
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        setResumeInfo({});
      } finally {
        setLoading(false);
        setTimeout(() => setAnimate(true), 100);
      }
    };

    fetchResume();
  }, [params.resumeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center transition-opacity duration-500 opacity-100" style={{opacity: loading ? 1 : 0}}>
        <LoaderCircle className="animate-spin h-[50px] w-[50px] text-[#7F56D9]" />
      </div>
    );
  }

  return (
    <ResumeInfoContextProvider value={{ resumeInfo, setResumeInfo }}>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 p-10 overflow-x-hidden items-start transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContextProvider>
  );
}

export default EditResume;
