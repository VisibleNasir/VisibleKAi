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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <section className="sm:p-6 md:p-8 lg:p-10 bg-zinc-950 flex justify-evenly w-screen h-screen text-zinc-100">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg ">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">
              AI Title Generation
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <Label
                htmlFor="keyword"
                className="text-xl font-medium text-zinc-300"
              >
                Keyword
              </Label>
              <Input
                id="keyword"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your blog title here..."
                className="mt-3 text-center bg-zinc-800 border-zinc-700 p-5 text-zinc-100 rounded-lg text-xl outline-none"
                required
              />
            </div>
            <div>
              <Label className="text-xl font-medium text-zinc-300">
                Category
              </Label>
              <RadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="mt-1 flex flex-wrap gap-2"
              >
                {blogCategories.map((item) => (
                  <div key={item} className="flex items-center space-x-1.5">
                    <RadioGroupItem
                      value={item}
                      id={item}
                      className="text-zinc-300 border-zinc-600 focus:ring-zinc-500 w-3.5 h-3.5"
                    />
                    <Label
                      htmlFor={item}
                      className={`text-sm cursor-pointer ${
                        selectedCategory === item
                          ? "text-zinc-100 font-medium"
                          : "text-zinc-400"
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full flex items-center gap-1.5 bg-zinc-700 text-zinc-100 font-semibold rounded-lg hover:bg-zinc-600 active:bg-zinc-700 transition-transform transform cursor-pointer text-sm"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <Hash className="w-4 h-4" />
              )}
              Generate Title
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800  shadow-lg max-h-[600px]">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">
              Generated Titles
            </CardTitle>
          </div>
        </CardHeader>
        {!content ? (
          <CardContent className="flex items-center justify-center py-2">
            <div className="text-center text-xs text-zinc-100 flex flex-col items-center gap-3">
              <Hash className="w-8 h-8" />
              <p>Enter a keyword and click "Generate Title" to get started</p>
            </div>
          </CardContent>
        ) : (
          <div className="mt-1  h-full overflow-y-scroll text-zinc-100">
            <div className=".reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
};

export default BlogTitles;
