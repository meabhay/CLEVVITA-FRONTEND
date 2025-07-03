import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { useParams } from "react-router-dom";
import { updateResumeDetail } from "../../../../../../../services/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle, Briefcase } from "lucide-react";
import { useInfoContext } from "@/context/ResumeInfoContext";

const Experience = () => {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useInfoContext();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // Load experience list once from resumeInfo
  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      console.log("resumeinfo", resumeInfo);
      // Ensure each experience item has the required fields
      const formattedExperience = resumeInfo.experience.map((exp) => ({
        id: exp.id || Math.random(),
        title: exp.title || "",
        companyName: exp.companyName || "",
        city: exp.city || "",
        state: exp.state || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
        currentlyWorking: exp.currentlyWorking || exp.currently || false,
        workSummary: exp.workSummary || "",
      }));
      setExperienceList(formattedExperience);
    } else {
      // Initialize with empty experience if none exists
      setExperienceList([
        {
          id: 1,
          title: "",
          companyName: "",
          city: "",
          state: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          workSummary: "",
        },
      ]);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
  };

  const handleRichTextEditor = (value, name, index) => {
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
  };

  const AddNewExperience = () => {
    const newExperienceList = [
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ];
    setExperienceList(newExperienceList);
  };

  const RemoveExperience = () => {
    const newExperienceList = experienceList.slice(0, -1);
    setExperienceList(newExperienceList);
  };

  const onSave = () => {
    setLoading(true);

    // Only send experience and themeColor
    const data = {
      experience: experienceList,
      themeColor: resumeInfo.themeColor || '#7F56D9',
    };

    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });

    updateResumeDetail(data, params?.resumeId)
      .then((res) => {
        setLoading(false);
        toast("Details updated!");
        console.log(res);
      })
      .catch(() => {
        setLoading(false);
        toast("Error updating experience.");
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-stone-100 max-w-4xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-violet-100 text-violet-600 rounded-full p-2">
          <Briefcase className="w-7 h-7" />
        </div>
        <div className="text-left">
          <h2 className="font-extrabold text-2xl md:text-2xl text-gray-900">Professional Experience</h2>
          <p className="text-gray-500 text-base">Add your previous job experience</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-violet-300 rounded mb-6" />

      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 p-6 my-6 rounded-lg bg-gray-50">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Position Title</label>
                <Input
                  name="title"
                  value={item.title}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Company Name</label>
                <Input
                  name="companyName"
                  value={item.companyName}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="e.g. Google Inc."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
                <Input
                  name="city"
                  value={item.city}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="e.g. San Francisco"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">State</label>
                <Input
                  name="state"
                  value={item.state}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="e.g. California"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(event) => handleChange(index, event)}
                  disabled={item.currentlyWorking}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Work Summary</label>
                <RichTextEditor
                  index={index}
                  value={item.workSummary}
                  positionTitle={item.title}
                  onRichTextEditorChange={(value) =>
                    handleRichTextEditor(value, "workSummary", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-between items-center mt-8">
        <div className="flex gap-2">
          <Button
            onClick={AddNewExperience}
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md text-sm md:text-base"
            size="sm md:default"
          >
            + Add New
          </Button>
          <Button
            onClick={RemoveExperience}
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md text-sm md:text-base"
            size="sm md:default"
          >
            - Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={onSave}
          className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 md:px-8 md:py-3 rounded-lg shadow-md flex items-center gap-2 text-sm md:text-base"
          size="sm md:default"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : <Briefcase className="w-5 h-5" />} Save
        </Button>
      </div>
    </div>
  );
};

export default Experience;
