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
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post(
        "/api/ai/resume-review",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4 sm:px-6 lg:px-10 py-6 min-h-[calc(100vh-64px)] transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upload Card */}
        <Card className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl transition-colors">
          <CardHeader className="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-100">
                Resume Review
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-5">
            <form onSubmit={onSubmitHandler} className="space-y-5">
              <div>
                <Label className="text-sm text-zinc-600 dark:text-zinc-400">
                  Upload Resume (PDF)
                </Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setInput(e.target.files[0])}
                  className="
                    mt-2 bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100
                    file:bg-zinc-300 dark:file:bg-zinc-700 file:border-0 file:text-zinc-700 dark:file:text-zinc-300
                    file:px-3 file:py-1.5 file:rounded-md hover:file:bg-zinc-400 dark:hover:file:bg-zinc-600
                  "
                  required
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Only PDF resumes are supported.
                </p>
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-1 inline" />
                )}
                Review Resume
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result Card */}
        <Card className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl max-h-[620px] flex flex-col transition-colors">
          <CardHeader className="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <CardTitle className="text-sm font-semibold text-zinc-700 dark:text-zinc-100">
                Analysis Results
              </CardTitle>
            </div>
          </CardHeader>

          {!content ? (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                Upload a resume to see AI feedback
              </div>
            </CardContent>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 text-sm text-zinc-800 dark:text-zinc-300 prose prose-invert max-w-none transition-colors">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </Card>

      </div>
    </section>
  );
};

export default ReviewResume;
