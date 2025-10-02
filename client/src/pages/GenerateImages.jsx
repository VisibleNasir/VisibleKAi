import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

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
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading , setLoading] = useState(false);
  const [content , setContent] = useState('');

  const {getToken} = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);

     

      const prompt =`Generate an image of ${input} in the style ${selectedStyle}`;

      
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        } 
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch(error){
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
            <CardTitle className="text-base font-semibold text-zinc-100">AI Image Generator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2 space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <Label htmlFor="image-description" className="text-xl font-medium text-zinc-300">
                Describe Your Image
              </Label>
              <Textarea
                id="image-description"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                placeholder="Describe what you want to see in the image..."
                className="mt-3 text-center bg-zinc-800 border-zinc-700 p-5 text-zinc-100 rounded-lg text-xl outline-none"
                required
              />
            </div>
            <div>
              <Label className="text-xl font-medium text-zinc-300">Style</Label>
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
                      className={`text-sm cursor-pointer ${
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
              disabled={loading} className="w-full flex items-center gap-1.5 bg-zinc-700 text-zinc-100 font-semibold rounded-lg hover:bg-zinc-600 active:bg-zinc-700 transition-transform transform cursor-pointer text-sm"
            >
              {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              :  <Image className="w-4 h-4" />}

              
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
          {
            !content ? (
              <div className="flex items-center justify-center py-10">
              <div className="text-center text-xs text-zinc-100 flex flex-col items-center gap-3">
              <Image className="w-9 h-9 "/>
              <p>Enter a topic and click "Generate image" to get started</p>
              </div>
              </div>
            ) : (
                <div className="mt-3 h-full">
                  <img src={content} alt="image" className="w-full h-full"/>
                </div>
          )
        }
        </CardHeader>
        
      </Card>
    </section>
  );
};

export default GenerateImages;