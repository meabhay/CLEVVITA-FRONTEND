import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, GraduationCap } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateResumeDetail } from "../../../../../../../services/GlobalApi";
import { toast } from "sonner";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useInfoContext();
  const params = useParams();
  const [educationalList, setEducationalList] = useState([]);

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([...educationalList, {}]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    // Only send education and themeColor
    const data = {
      education: educationalList,
      themeColor: resumeInfo.themeColor || '#7F56D9',
    };

    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });

    updateResumeDetail(data, params.resumeId).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-stone-100 max-w-4xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-violet-100 text-violet-600 rounded-full p-2">
          <GraduationCap className="w-7 h-7" />
        </div>
        <div className="text-left">
          <h2 className="font-extrabold text-2xl md:text-2xl text-gray-900">Education</h2>
          <p className="text-gray-500 text-base">Add your educational details</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-violet-300 rounded mb-6" />

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 p-6 my-6 rounded-lg bg-gray-50">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.universityName}
                  placeholder="e.g. Stanford University"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.degree}
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.major}
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.startDate}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.endDate}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.description}
                  placeholder="Describe your academic achievements, projects, or relevant coursework..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-between items-center mt-8">
        <div className="flex gap-2">
          <Button
            onClick={AddNewEducation}
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-lg shadow-md text-sm md:text-base"
            size="sm md:default"
          >
            + Add New
          </Button>
          <Button
            onClick={RemoveEducation}
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
          {loading ? <LoaderCircle className="animate-spin" /> : <GraduationCap className="w-5 h-5" />} Save
        </Button>
      </div>
    </div>
  );
}

export default Education;
