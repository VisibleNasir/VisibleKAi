import { Hash, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section
      className={`min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-10 py-8 transition-colors
      ${isDark ? "bg-zinc-950 text-zinc-100" : "bg-gray-50 text-zinc-900"}`}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT */}
        <Card
          className={`rounded-2xl shadow-xl backdrop-blur border
          ${isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-gray-200"}`}
        >
          <CardHeader className={`pb-4 border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-400" />
              <CardTitle className="text-lg font-semibold">
                AI Blog Title Generator
              </CardTitle>
            </div>
            <p className="text-sm text-zinc-500 mt-1">
              Generate catchy blog titles based on keywords and category
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <form onSubmit={onSubmitHandler} className="space-y-6">

              {/* Keyword */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-500">
                  Keyword
                </Label>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. Artificial Intelligence trends"
                  className={`rounded-xl p-4 text-sm
                    ${isDark
                      ? "bg-zinc-800 border-zinc-700 focus:ring-zinc-600"
                      : "bg-gray-100 border-gray-300 focus:ring-gray-400"
                    }`}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-zinc-500">
                  Category
                </Label>
                <RadioGroup
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                >
                  {blogCategories.map((item) => (
                    <label
                      key={item}
                      htmlFor={item}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition
                        ${
                          selectedCategory === item
                            ? isDark
                              ? "bg-zinc-800 border-zinc-600"
                              : "bg-gray-200 border-gray-400"
                            : isDark
                              ? "border-zinc-700 text-zinc-400 hover:bg-zinc-800/50"
                              : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <RadioGroupItem value={item} id={item} />
                      <span className="text-xs font-medium">{item}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Submit */}
              <Button
                disabled={loading}
                type="submit"
                className={`w-full h-11 rounded-xl font-semibold transition flex items-center justify-center gap-2
                ${isDark
                  ? "bg-zinc-100 text-zinc-900 hover:bg-white"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Hash className="w-4 h-4" />
                )}
                Generate Title
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card
          className={`rounded-2xl shadow-xl backdrop-blur border flex flex-col max-h-[600px]
          ${isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-gray-200"}`}
        >
          <CardHeader className={`pb-4 border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`}>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-zinc-400" />
              <CardTitle className="text-lg font-semibold">
                Generated Titles
              </CardTitle>
            </div>
          </CardHeader>

          {!content ? (
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="text-center text-sm text-zinc-400 space-y-3">
                <Hash className="w-10 h-10 mx-auto opacity-60" />
                <p>No titles generated yet</p>
              </div>
            </CardContent>
          ) : (
            <div className="p-4 overflow-y-auto text-sm">
              <div className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </Card>

      </div>
    </section>
  );
};

export default BlogTitles;
