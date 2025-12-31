import { Edit2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useTheme } from "@/context/ThemeContext";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return toast.error("Auth failed");

      const { data } = await axios.post(
        "api/ai/generate-article",
        { prompt: `Write about ${input}`, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      data.success ? setContent(data.content) : toast.error(data.message);
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className={`min-h-[calc(100vh-64px)] px-6 py-8 ${
      isDark ? "bg-zinc-950 text-zinc-100" : "bg-gray-50 text-zinc-900"
    }`}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">

        {/* CONFIG */}
        <Card className={`${isDark ? "bg-zinc-900" : "bg-white"} rounded-2xl`}>
          <CardHeader className="border-b">
            <div className="flex gap-2 items-center">
              <Sparkles className="w-4 h-4 opacity-70" />
              <CardTitle>Article Settings</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            <form onSubmit={onSubmitHandler} className="space-y-5">
              <div>
                <Label>Topic</Label>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Future of AI"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label>Length</Label>
                <RadioGroup
                  value={selectedLength.text}
                  onValueChange={(v) =>
                    setSelectedLength(articleLength.find(i => i.text === v))
                  }
                  className="mt-3 space-y-2"
                >
                  {articleLength.map((item) => (
                    <label
                      key={item.text}
                      className={`flex gap-2 px-3 py-2 rounded-xl border cursor-pointer ${
                        selectedLength.text === item.text
                          ? "border-primary"
                          : "opacity-80"
                      }`}
                    >
                      <RadioGroupItem value={item.text} />
                      <span>{item.text}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <Button className="w-full">
                {loading ? "Generating..." : "Generate Article"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* OUTPUT */}
        <Card className={`${isDark ? "bg-zinc-900" : "bg-white"} rounded-2xl`}>
          <CardHeader className="border-b">
            <CardTitle>Generated Article</CardTitle>
          </CardHeader>

          {!content ? (
            <CardContent className="flex items-center justify-center text-sm opacity-60">
              Enter a topic to generate content
            </CardContent>
          ) : (
            <div className="p-4 overflow-y-auto prose prose-invert max-w-none">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </Card>

      </div>
    </section>
  );
};

export default WriteArticle;
