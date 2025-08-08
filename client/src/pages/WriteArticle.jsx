import { Edit2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
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
            <CardTitle className="text-base font-semibold text-zinc-100">Article Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <Label htmlFor="article-topic" className="text-xs font-medium text-zinc-300">
                Article Topic
              </Label>
              <Input
                id="article-topic"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Future of artificial intelligence is..."
                className="mt-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-600 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-zinc-300">Article Length</Label>
              <RadioGroup
                value={selectedLength.text}
                onValueChange={(value) =>
                  setSelectedLength(articleLength.find((item) => item.text === value))
                }
                className="mt-1 flex flex-wrap gap-2"
              >
                {articleLength.map((item) => (
                  <div key={item.text} className="flex items-center space-x-1.5">
                    <RadioGroupItem
                      value={item.text}
                      id={item.text}
                      className="text-zinc-300 border-zinc-600 focus:ring-zinc-500 w-3.5 h-3.5"
                    />
                    <Label
                      htmlFor={item.text}
                      className={`text-xs cursor-pointer ${
                        selectedLength.text === item.text
                          ? "text-zinc-100 font-medium"
                          : "text-zinc-400"
                      }`}
                    >
                      {item.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full flex items-center gap-1.5 bg-zinc-200 text-zinc-950 font-semibold rounded-lg hover:bg-zinc-300 active:bg-zinc-400 transition-transform transform hover:scale-105 active:scale-95 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Generate Article
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">Generated Article</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-2">
          <div className="text-center text-xs text-zinc-400 flex flex-col items-center gap-3">
            <Edit2 className="w-8 h-8" />
            <p>Enter a topic and click "Generate Article" to get started</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default WriteArticle;