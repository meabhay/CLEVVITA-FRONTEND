// ResumePreview/Experience.jsx
import { useInfoContext } from "@/context/ResumeInfoContext";
import React from "react";

function Experience() {
  const { resumeInfo } = useInfoContext();

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor || "#ff6666" }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor || "#ff6666" }} />
      {resumeInfo?.experience?.length > 0 ? (
        resumeInfo.experience.map((exp, index) => (
          <div key={index} className="my-5">
            <h2 className="text-sm font-bold">{exp?.title}</h2>
            <h2 className="text-xs flex justify-between">
              {exp?.companyName}, {exp?.city}, {exp?.state}
              <span>
                {exp?.startDate} –{" "}
                {exp?.currentlyWorking ? "Present" : exp?.endDate}
              </span>
            </h2>
            <div
              className="text-xs my-2"
              dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
            />
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-400 mt-3 text-center">
          No experience added yet.
        </p>
      )}
    </div>
  );
}

export default Experience;
