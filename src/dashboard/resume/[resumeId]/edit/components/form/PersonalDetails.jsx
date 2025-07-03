import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInfoContext } from '@/context/ResumeInfoContext'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { updateResumeDetail } from '../../../../../../../services/GlobalApi';
import { Loader2, User2 } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetails({enabledNext}) {
    const {resumeInfo, setResumeInfo} = useInfoContext();
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const params = useParams();
    

    const handleInputChange = (e) => {
        enabledNext(false)
        const {name, value} = e.target
        setFormData({
            ...formData, themeColor:"#ff6666", [name]:value
        })

        setResumeInfo({...resumeInfo, themeColor:"#ff6666", [name]:value})
    }

    const onSave = async (e) => { 
        try {
            setLoading(true)
            e.preventDefault()
            // Always send the full resumeInfo object, ensuring themeColor is included
            const data = { ...resumeInfo, themeColor: resumeInfo.themeColor || '#7F56D9' };
            console.log(data);
            const res = await updateResumeDetail(data, params?.resumeId)
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false)
            enabledNext(true);
            toast("Details submitted successfuly")
        }
        
    }

    const isFormValid = [
      resumeInfo.firstName,
      resumeInfo.lastName,
      resumeInfo.jobTitle,
      resumeInfo.address,
      resumeInfo.phone,
      resumeInfo.email
    ].every(Boolean);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-stone-100 max-w-2xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-violet-100 text-violet-600 rounded-full p-2">
          <User2 className="w-7 h-7" />
        </div>
        <div className="text-left">
          <h2 className="font-extrabold text-2xl md:text-2xl text-gray-900">Personal Details</h2>
          <p className="text-gray-500 text-base">Get started with the basic information</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-violet-300 rounded mb-6" />
      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
            <Input
              name="firstName"
              required
              value={resumeInfo.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
            <Input
              name="lastName"
              value={resumeInfo.lastName}
              onChange={handleInputChange}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Job Title</label>
            <Input
              name="jobTitle"
              value={resumeInfo.jobTitle}
              required
              onChange={handleInputChange}
              placeholder="e.g. Software Engineer, Product Manager"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
            <Input
              name="address"
              value={resumeInfo.address}
              required
              onChange={handleInputChange}
              placeholder="Enter your full address"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
            <Input
              name="phone"
              value={resumeInfo.phone}
              required
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <Input
              name="email"
              value={resumeInfo.email}
              required
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        <div className="flex justify-end items-center mt-8">
          <Button type="submit" className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md flex items-center gap-2" onClick={onSave} disabled={!isFormValid || loading}>
            {loading ? <Loader2 className="animate-spin" /> : <User2 className="w-5 h-5" />} Save Progress
          </Button>
        </div>
      </form>
    </div>
  );
} 

export default PersonalDetails