import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Zap } from "lucide-react";
import { useInfoContext } from "@/context/ResumeInfoContext";
import { updateResumeDetail } from "../../../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Skills({enabledNext}) {
  const [skillsList, setSkillsList] = useState([]);
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useInfoContext();

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();

    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

 const AddNewSkills = () => {
  setSkillsList([
    ...skillsList,{}
  ])
}


  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    // Only send skills and themeColor
    const data = {
      skills: skillsList,
      themeColor: resumeInfo.themeColor || '#7F56D9',
    };

    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });

    updateResumeDetail(data, params?.resumeId).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated !");
        enabledNext(true)
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-stone-100 max-w-2xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-violet-100 text-violet-600 rounded-full p-2">
          <Zap className="w-7 h-7" />
        </div>
        <div className="text-left">
          <h2 className="font-extrabold text-2xl md:text-2xl text-gray-900">Skills</h2>
          <p className="text-gray-500 text-base">Add your top professional key skills</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-violet-300 rounded mb-6" />

      <div className="space-y-4">
        {skillsList.map((item, index) => (
          <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 bg-gray-50" key={index}>
            <div className="flex-1 mr-4">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Skill Name</label>
              <Input
                className="w-full"
                value={item.name || ""}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="e.g. JavaScript, React, Python"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Proficiency</label>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating || 0}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-between items-center mt-8">
        <div className="flex gap-2">
          <Button
            onClick={AddNewSkills}
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md text-sm md:text-base"
            size="sm md:default"
          >
            + Add New
          </Button>
          <Button
            onClick={RemoveSkills}
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md text-sm md:text-base"
            size="sm md:default"
          >
            - Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={() => onSave()}
          className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 md:px-8 md:py-3 rounded-lg shadow-md flex items-center gap-2 text-sm md:text-base"
          size="sm md:default"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : <Zap className="w-5 h-5" />} Save
        </Button>
      </div>
    </div>
  );
}

export default Skills;
