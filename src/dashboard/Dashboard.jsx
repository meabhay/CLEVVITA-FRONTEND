import React, { useEffect, useState, useRef } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import { getUserResumes } from './../../services/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { LoaderCircle, Loader2, PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import AnimatedResumeCard from './components/AnimatedResumeCard';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  // Dialog state for both triggers
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    setLoading(true);
    getResumesList();
  }, [user]);

  //fetching resume list from strapi
  const getResumesList = async () => {
    try {
      const res = await getUserResumes(user.primaryEmailAddress?.emailAddress);
      setResumeList(res.data); // changed from res.data.data
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFromList = (id) => {
    setResumeList((prev) => (prev || []).filter((resume) => resume._id !== id));
  };

  // Filter resumes by search
  const filteredResumes = (resumeList || []).filter(resume =>
    (resume.title || '').toLowerCase().includes(search.toLowerCase())
  );

  // Create new resume logic (same as AddResume)
  const onCreate = async () => {
    try {
      setCreating(true);
      const uid = uuidv4();
      const data = {
        data: {
          title: resumeTitle,
          resumeId: uid,
          userEmail: user?.primaryEmailAddress.emailAddress,
          userName: user.fullName,
        },
      };
      const res = await import('./../../services/GlobalApi').then(m => m.default(data));
      navigation("/dashboard/resume/" + res.data.id + "/edit");
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setCreating(false);
      setOpenDialog(false);
      setResumeTitle('');
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen w-full font-sans relative z-50">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-500 opacity-100" style={{opacity: loading ? 1 : 0}}>
          <LoaderCircle className="animate-spin text-violet-600" size={64} />
          <span className="mt-4 text-lg text-gray-500 font-medium">Loading your resumes...</span>
        </div>
      )}
      {/* Create New Resume Dialog (shared) */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" placeholder="Ex. Frontend Developer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
              <Button onClick={onCreate} disabled={!resumeTitle || creating}>
                {creating ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <main className={`max-w-7xl mx-auto px-4 py-12 relative transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4   ">
          <div>
            <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 mb-1 tracking-tight">My Resumes</h2>
            <p className="text-gray-500 text-lg">Start creating your next AI-powered resume for your dream job.</p>
          </div>
          <AnimatedResumeCard  className='absolute right-[14em] h-5 -z-10 opacity-40 backdrop-blur-md blur-sm'/>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 text-base shadow-sm"
          />
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-white text-gray-700 font-medium shadow-sm hover:bg-violet-50 transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Filter
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* AddResume card triggers the shared dialog */}
          <AddResume />
          {filteredResumes.length > 0 && filteredResumes.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} onSuccessDelete={handleDeleteFromList} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;