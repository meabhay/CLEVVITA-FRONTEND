import { useInfoContext } from '../../../../../context/ResumeInfoContext'
import React from 'react'
import PersonalDetail from './preview/PersonalDetail';
import Summary from './preview/Summary';
import Experience from './preview/Experience';
import Education from './preview/Education';
import SkillSection from './preview/SkillSection';
import { LoaderCircle } from 'lucide-react';

function ResumePreview() {
    const {resumeInfo,setResumeInfo} = useInfoContext();
    const themeColor = resumeInfo?.themeColor || "#7F56D9";
    if (!resumeInfo) return <div><LoaderCircle/></div>

    return (
      <div
        className="shadow-lg border-t-[20px] bg-white mx-auto p-10 print:shadow-none print:rounded-none flex flex-col items-center justify-center w-full max-w-[210mm] min-w-0"
        style={{ borderColor: themeColor }}
      >
        <div className="w-full">
          {/* PersonalDetails */}
          <PersonalDetail resumeInfo={{...resumeInfo, themeColor}} />
          {/* Summary */}
          <Summary resumeInfo={resumeInfo} />
          {/* Experience */}
          <Experience resumeInfo={{...resumeInfo, themeColor}} />
          {/* Education */}
          <Education resumeInfo={{...resumeInfo, themeColor}} />
          {/* Skills */}
          <SkillSection resumeInfo={{...resumeInfo, themeColor}} />
        </div>
      </div>
    );
}

export default ResumePreview