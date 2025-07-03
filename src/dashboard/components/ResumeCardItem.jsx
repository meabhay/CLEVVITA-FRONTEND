import { Delete, LoaderCircle, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteResume } from "../../../services/GlobalApi";

function ResumeCardItem({ resume, onSuccessDelete }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // Determine card border color based on status
  const status = resume.status || 'completed';
  const borderColors = {
    completed: '#7F56D9', // Muted Violet (purple)
    draft: '#22C55E',     // Green
    error: '#EF4444',     // Red
    default: '#D1D5DB',   // Stone/gray
  };
  const borderColor = borderColors[status] || borderColors.default;

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteResume(resume._id);
      setOpenAlert(false);
      onSuccessDelete(resume._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link className="h-[310px] border rounded-lg bg-white shadow-md hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer" style={{ borderTop: `6px solid ${borderColor}` }}>
      {console.log("resume hai ye", resume)}
      <div className="py-14 flex justify-center items-center h-[280px] rounded-lg">
        {/* Modern SVG Illustration for Resume Card with Animation */}
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center shadow-lg animate-float">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="32" height="36" rx="6" fill="#fff" fillOpacity="0.95" stroke="#7F56D9" strokeWidth="2" />
            <rect x="14" y="16" width="20" height="2.5" rx="1.25" fill="#A78BFA" />
            <rect x="14" y="22" width="14" height="2.5" rx="1.25" fill="#C7D2FE" />
            <rect x="14" y="28" width="10" height="2.5" rx="1.25" fill="#C7D2FE" />
            <circle cx="36" cy="14" r="2" fill="#FBBF24" />
            <circle cx="18" cy="36" r="1.5" fill="#34D399" />
            <circle cx="30" cy="34" r="1" fill="#F472B6" />
            <path d="M24 10l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z" fill="#7F56D9" />
          </svg>
        </div>
      </div>
      <div className="flex justify-between items-center px-2 -mt-1 ">
        <h2 className="text-center my-1 text-gray-900 font-semibold truncate max-w-[140px]">
          {resume?.title || "Untitled"}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume._id + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/my-resume/" + resume._id + "/view")}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/my-resume/" + resume._id + "/view")}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete()}>
                {loading? <LoaderCircle className="animate-spin"/>: "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Link>
  );
}

export default ResumeCardItem;
