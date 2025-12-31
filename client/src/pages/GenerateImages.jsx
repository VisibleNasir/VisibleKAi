import { Image, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const { theme } = useTheme();
  const { getToken } = useAuth();

  const imageStyle = [
    "Realistic",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Portrait Style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const isDark = theme === "dark";

  return (
    <section
      className={`min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-10 py-8 transition-colors
      ${isDark ? "bg-zinc-950 text-zinc-100" : "bg-gray-50 text-zinc-900"}`}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT */}
        <Card className={`${isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-gray-200"} rounded-2xl shadow-xl`}>
          <CardHeader className={`border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-400" />
              <CardTitle>AI Image Generator</CardTitle>
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Describe your idea and generate stunning AI images.
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <form onSubmit={onSubmitHandler} className="space-y-6">

              <div>
                <Label>Image Description</Label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={4}
                  required
                  className={`${isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-300"} rounded-xl`}
                />
              </div>

              <div className="space-y-3">
                <Label>Image Style</Label>
                <RadioGroup
                  value={selectedStyle}
                  onValueChange={setSelectedStyle}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                >
                  {imageStyle.map((item) => (
                    <label
                      key={item}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer
                        ${selectedStyle === item
                          ? isDark
                            ? "bg-zinc-800 border-zinc-600"
                            : "bg-gray-100 border-gray-400"
                          : isDark
                            ? "border-zinc-700 text-zinc-400"
                            : "border-gray-300 text-gray-500"
                        }`}
                    >
                      <RadioGroupItem value={item} />
                      <span className="text-xs">{item}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox checked={publish} onCheckedChange={setPublish} />
                <Label className="text-xs">Make this image public</Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`${isDark ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-white"} w-full h-11 rounded-xl`}
              >
                {loading ? "Generating..." : <><Image className="w-4 h-4" /> Generate Image</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card className={`${isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-gray-200"} rounded-2xl shadow-xl`}>
          <CardHeader className={`border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`}>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>

          {!content ? (
            <CardContent className="flex items-center justify-center text-zinc-400">
              No image generated yet
            </CardContent>
          ) : (
            <div className="p-4">
              <img src={content} className="rounded-xl w-full" />
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default GenerateImages;
