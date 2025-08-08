import { Image, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Gibli Style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 bg-zinc-950 text-zinc-100">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">AI Image Generator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <Label htmlFor="image-description" className="text-xs font-medium text-zinc-300">
                Describe Your Image
              </Label>
              <Textarea
                id="image-description"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                placeholder="Describe what you want to see in the image..."
                className="mt-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-600 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-zinc-300">Style</Label>
              <RadioGroup
                value={selectedStyle}
                onValueChange={setSelectedStyle}
                className="mt-1 flex flex-wrap gap-2"
              >
                {imageStyle.map((item) => (
                  <div key={item} className="flex items-center space-x-1.5">
                    <RadioGroupItem
                      value={item}
                      id={item}
                      className="text-zinc-300 border-zinc-600 focus:ring-zinc-500 w-3.5 h-3.5"
                    />
                    <Label
                      htmlFor={item}
                      className={`text-xs cursor-pointer ${
                        selectedStyle === item ? "text-zinc-100 font-medium" : "text-zinc-400"
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="publish"
                checked={publish}
                onCheckedChange={setPublish}
                className="border-zinc-600 text-zinc-200 w-3.5 h-3.5"
              />
              <Label htmlFor="publish" className="text-xs text-zinc-300">
                Make this image public
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full flex items-center gap-1.5 bg-zinc-200 text-zinc-950 font-semibold rounded-lg hover:bg-zinc-300 active:bg-zinc-400 transition-transform transform hover:scale-105 active:scale-95 text-sm"
            >
              <Image className="w-4 h-4" />
              Generate Image
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">Generated Images</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-2">
          <div className="text-center text-xs text-zinc-400 flex flex-col items-center gap-3">
            <Image className="w-8 h-8" />
            <p>Enter a description and click "Generate Image" to get started</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default GenerateImages;