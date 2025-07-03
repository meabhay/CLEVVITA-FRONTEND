import React, { useState } from "react";
import PersonalDetails from "./form/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Summary from "./form/Summary";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import { useInfoContext } from '@/context/ResumeInfoContext';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();
  const { resumeInfo } = useInfoContext();
  const themeColor = resumeInfo?.themeColor || '#7F56D9';

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <ThemeColor themeColor={themeColor} />
        </div>
        <div className="flex items-center gap-2 ">
          {activeFormIndex > 1 ? (
            <Button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          ) : null}
          <Button
            disabled={!enableNext}
            className="flex gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            size="sm"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* personal details */}
      {activeFormIndex === 1 ? (
        <PersonalDetails enabledNext={(prev) => setEnableNext(prev)} themeColor={themeColor} />
      ) : activeFormIndex === 2 ? (
        <Summary enabledNext={(prev) => setEnableNext(prev)} />
      ) : activeFormIndex === 3 ? (
        <Experience enabledNext={(prev) => setEnableNext(prev)} />
      ) : activeFormIndex === 4 ? (
        <Education enabledNext={(prev) => setEnableNext(prev)} />
      ) : activeFormIndex === 5 ? (
        <Skills enabledNext={(prev) => setEnableNext(prev)} />
      ) : activeFormIndex === 6 ? <Navigate to={"/my-resume/" + resumeId + "/view"} /> : null}
    </div>
  );
}

export default FormSection;
