import { Hash, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 bg-zinc-950 text-zinc-100">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">AI Title Generation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <Label htmlFor="keyword" className="text-xs font-medium text-zinc-300">
                Keyword
              </Label>
              <Input
                id="keyword"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your blog title here..."
                className="mt-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-600 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-zinc-300">Category</Label>
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
                      className={`text-xs cursor-pointer ${
                        selectedCategory === item ? "text-zinc-100 font-medium" : "text-zinc-400"
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full flex items-center gap-1.5 bg-zinc-200 text-zinc-950 font-semibold rounded-lg hover:bg-zinc-300 active:bg-zinc-400 transition-transform transform hover:scale-105 active:scale-95 text-sm"
            >
              <Hash className="w-4 h-4" />
              Generate Title
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">Generated Titles</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-2">
          <div className="text-center text-xs text-zinc-400 flex flex-col items-center gap-3">
            <Hash className="w-8 h-8" />
            <p>Enter a keyword and click "Generate Title" to get started</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BlogTitles;