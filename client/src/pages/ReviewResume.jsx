import { FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await axios.post('/api/ai/resume-review',
        formData, { headers: { Authorization: `Bearer ${await getToken()}` } });

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="sm:p-6 md:p-8 lg:p-10 bg-zinc-950 flex justify-evenly w-screen h-screen text-zinc-100">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">Resume Review</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <Label htmlFor="resume-upload" className="text-xl font-medium text-zinc-300">
                Upload Resume
              </Label>
              <Input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setInput(e.target.files[0])}
                className="mt-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-600 rounded-lg file:text-zinc-400 text-sm"
                required
              />
              <p className="text-xs text-zinc-500 mt-0.5">Supports PDF resume only.</p>
            </div>
            <Button
              type="submit"
              className="w-full flex items-center gap-1.5 bg-zinc-700 text-zinc-100 font-semibold rounded-lg hover:bg-zinc-600 active:bg-zinc-700 transition-transform transform cursor-pointer text-sm"
            >
              {
                loading ?
                  <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                  :
                  <FileText className="w-4 h-4" />
              }

              Review Resume
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">Analysis Results</CardTitle>
          </div>
        </CardHeader>

        {
          !content ?
            (
              <CardContent className="flex items-center justify-center py-2">
                <div className="text-center text-xs text-zinc-400 flex flex-col items-center gap-3">
                  <FileText className="w-8 h-8" />
                  <p>Upload a resume and click "Review Resume" to get started</p>
                </div>
              </CardContent> ) :
            (
              <div className="mt-1 h-full overflow-y-scroll text-zinc-400 scrollbar-hide p-2 bg-zinc-800 rounded-b-2xl">

                <div className="reset-tw">
                  <Markdown>{content}</Markdown>
                </div>

              </div>
            )
        }

      </Card>
    </section>
  );
};

export default ReviewResume;