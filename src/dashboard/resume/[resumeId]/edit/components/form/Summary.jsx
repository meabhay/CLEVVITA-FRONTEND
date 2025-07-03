import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, SparkleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateResumeDetail } from "../../../../../../../services/GlobalApi";
import { toast } from "sonner";
import { run } from "../../../../../../../services/AIModel"

const prompt = `
Job Title: {jobTitle}

Based on this job title, return a list of 3 summary suggestions for different experience levels: "Fresher", "Mid", and "Senior".

Each item should be a JSON object with:
- "experience_level" (string): one of "Fresher", "Mid", or "Senior"
- "summary" (string): a 3–4 line professional summary

Return the result as a valid **JSON array only**, without any explanation or markdown formatting.
Example format:
[
  { "experience_level": "Fresher", "summary": "..." },
  { "experience_level": "Mid", "summary": "..." },
  { "experience_level": "Senior", "summary": "..." }
]
`



function Summary({enabledNext}) {
    const {resumeInfo, setResumeInfo} = useInfoContext()      //used for changing in UI
    const [summary, setSummary] = useState()     //used for sending data to backend
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState()
    
    // Initialize summary with saved data
    useEffect(() => {
        if (resumeInfo?.summary) {
            setSummary(resumeInfo.summary)
        }
    }, [resumeInfo?.summary])

   const handleInputChange = (e) => {
    setResumeInfo({
        ...resumeInfo, summary: e.target.value
    })

    setSummary(e.target.value)   
   }

   const GenerateSummaryFromAI = async () => {
    try {
      setLoading(true)
      const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
      const result = await run(PROMPT);
      const cleaned = result
       .replace(/```json/g, "")
       .replace(/```/g, "")
       .trim();

     
     const parsed = JSON.parse(cleaned);
     setAiGeneratedSummaryList(parsed);
      console.log(parsed);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
   }

    const onSave = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            // Only send summary and themeColor
            const data = {
              summary: summary || resumeInfo.summary,
              themeColor: resumeInfo.themeColor || '#7F56D9',
            };
            console.log("Updating resume with:", data);
            const res = await updateResumeDetail(data, params?.resumeId)
            console.log(res);
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false)
            enabledNext(true);
            toast("Summary submitted successfuly")
        }

    }

    const AddButton = (item) => {
      console.log("ye item hai",item);
      
        setResumeInfo({ ...resumeInfo, summary: item?.summary })
        setSummary(item?.summary);
      
    }


  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-stone-100 max-w-2xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-violet-100 text-violet-600 rounded-full p-2">
          <SparkleIcon className="w-7 h-7" />
        </div>
        <div className="text-left">
          <h2 className="font-extrabold text-2xl md:text-2xl text-gray-900">Professional Summary</h2>
          <p className="text-gray-500 text-base">Craft a compelling summary for your resume</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-violet-300 rounded mb-6" />

      <form className="mt-7">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Summary</label>

          <Button
            type="button"
            onClick={() => GenerateSummaryFromAI()}
            size="sm"
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md flex gap-2"
          >
            <SparkleIcon className="h-4 w-4" /> Generate using AI
          </Button>
        </div>
        <Textarea
          placeholder={loading? "Generating..." : "Click on Generate to get summary suggestions based on your job title..."}
          value={summary || resumeInfo.summary || ""}
          className="mt-5"
          onChange={handleInputChange}
          name="summary"
          required
        />
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={onSave}
            className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md flex items-center gap-2"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <SparkleIcon className="w-5 h-5" />} Save Progress
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList && (
        <div className="mt-8">
          <h2 className="font-bold text-lg text-gray-900 mb-4">AI Suggestions</h2>
          <div className="space-y-4">
            {aiGeneratedSummaryList.map((item, index) => (
              <div className="flex justify-between items-start p-4 border border-gray-200 rounded-lg" key={index}>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item?.experience_level} Level
                  </h3>
                  <p className="text-gray-700 text-sm">{item?.summary}</p>
                </div>
                <div className="ml-4">
                  <Button
                    className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                    onClick={() => AddButton(item)}
                    size="sm"
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
