import React from 'react'

function SkillSection({resumeInfo}) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className='grid grid-cols-3 gap-3 my-4'>
        {(resumeInfo?.skills || []).map((skill, index) => (
          <div key={index} className='flex items-center justify-around'>
            <h2 className='text-xs font-bold'>{skill.name}</h2>
            <div className='h-2 bg-gray-200 w-[120px]'>
              <div className='h-2' style={{backgroundColor:resumeInfo?.themeColor || "#ff6666", width:skill?.rating*20+'%'}}></div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default SkillSection