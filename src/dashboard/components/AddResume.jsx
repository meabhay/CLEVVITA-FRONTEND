import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from "uuid";
import { useUser } from '@clerk/clerk-react';
import createNewResume from './../../../services/GlobalApi'
import { Navigate, useNavigate } from 'react-router-dom';

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState()
  const {user} = useUser()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()

  const onCreate = async () => {
    try {
      setLoading(true);
      const uid = uuidv4();

      const data = {
        title: resumeTitle,
        resumeId: uid,
        userEmail: user?.primaryEmailAddress.emailAddress,
        userName: user.fullName,
      };

      //saving data to database (Express/MongoDB)
      const res = await createNewResume(data);
      console.log("this is response resume id", res.data);
      navigation("/dashboard/resume/" + res.data._id + "/edit");
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div>
      <div
        className="border-2 border-dashed border-[#E5E7EB] rounded-[18px] bg-[#fcfcfd] cursor-pointer flex flex-col items-center justify-center min-h-[320px] w-full min-w-0 p-0 transition-colors duration-200 hover:border-[#7F56D9] overflow-visible flex-1"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#F4EBFF] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7v10M7 12h10" stroke="#7F56D9" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-[22px] font-bold text-[#101828] mb-2 leading-tight">Create New Resume</h3>
          <p className="text-[#475467] text-[16px] font-normal leading-snug">Start building your professional<br/>resume with AI assistance</p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader className=" w-full">
            <div className="flex flex-col items-center mb-2">
              <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#F4EBFF" />
                  <path d="M12 7v10M7 12h10" stroke="#7F56D9" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">Create New Resume</DialogTitle>
              <DialogDescription className="text-gray-500 text-base mt-1">Add a title for your new resume</DialogDescription>
            </div>
            <Input
              className="my-2 text-base px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-400 outline-none"
              placeholder="Ex. Frontend Developer Resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
            <div className='flex justify-between gap-3 pt-4'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost" className="font-medium">Cancel</Button>
              <Button onClick={() => onCreate()} disabled={!resumeTitle || loading} className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow">
                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume