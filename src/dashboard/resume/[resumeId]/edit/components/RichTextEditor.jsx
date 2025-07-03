import { useInfoContext } from "../../../../../context/ResumeInfoContext";
import { LoaderCircle, Sparkle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { run } from "../../../../../../services/AIModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const PROMPT =
  "position title: {positionTitle}. Based on this, give 3-4 bullet points for a resume summary (no experience level, no JSON). Format in HTML. Just give bullet points nothing else";

function RichTextEditor({ onRichTextEditorChange, index, value, positionTitle }) {
  const [summary, setSummary] = useState(value || "");
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    if (!positionTitle) {
      toast("Please Add Position Title");
      return;
    }

    setLoading(true);
    const prompt = PROMPT.replace("{positionTitle}", positionTitle);
    const result = await run(prompt);

    const cleaned = result
      .replace(/^\s*html\s*/i, "")
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    setSummary(cleaned);
    onRichTextEditorChange(cleaned); // Update parent
    setLoading(false);
  };

  useEffect(() => {
    setSummary(value || "");
  }, [value]);

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-lg font-bold">Summary</label>
        <Button
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Sparkle className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={summary}
          onChange={(e) => {
            const value = e.target.value;
            setSummary(value);
            onRichTextEditorChange(value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
