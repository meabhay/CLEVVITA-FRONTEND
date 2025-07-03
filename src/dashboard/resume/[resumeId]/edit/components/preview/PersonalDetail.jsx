import React from "react";

function PersonalDetail({ resumeInfo }) {
  return (
    <div>
      <h2
        className={`font-bold text-xl text-center`}
        style={{ color: resumeInfo?.themeColor || "#ff6666" }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center font-medium text-sm">
        {resumeInfo?.jobTitle}
      </h2>
      <h2
        className="text-center font-normal text-xs"
        style={{ color: resumeInfo?.themeColor || "#ff6666" }}
      >
        {resumeInfo?.address}
      </h2>
      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor || "#ff6666" }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{ color: resumeInfo?.themeColor || "#ff6666" }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor || "#ff6666" }}
      />
    </div>
  );
}

export default PersonalDetail;
