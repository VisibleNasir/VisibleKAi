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

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle =  () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading , setLoading] = useState(false);
  const [content , setContent] = useState("");
  
  const {getToken} = useAuth();

  

  const onSubmitHandler = async (e) => {

    e.preventDefault();
    try {
      setLoading(true);

      const token = await getToken(); // ✅ Correct way
      if (!token) {
        toast.error("Authentication failed. Please log in.");
        return;
      }
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const {data} = await axios.post('api/ai/generate-article', {prompt, length:selectedLength.length},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      if(data.success){
        setContent(data.content);

      }else{
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Something went wrong");
      } 
    }
    setLoading(false)
  };

  return (
    <section className="sm:p-6 md:p-8 lg:p-10 bg-zinc-950 flex justify-evenly w-screen h-screen text-zinc-100">
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
              <Label htmlFor="article-topic" className="text-xl font-medium text-zinc-300">
                Article Topic
              </Label>
              <Input
                id="article-topic"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Future of artificial intelligence is..."
                className="mt-3 text-center bg-zinc-800 border-zinc-700 p-5 text-zinc-100 rounded-lg text-xl outline-none"
                required
              />
            </div>
            <div>
              <Label className="text-xl font-medium text-zinc-300">Article Length</Label>
              <RadioGroup
                value={selectedLength.text}
                onValueChange={(value) =>
                  setSelectedLength(articleLength.find((item) => item.text === value))
                }
                className="mt-3 flex flex-wrap gap-2"
              >
                {articleLength.map((item) => (
                  <div key={item.text} className="flex items-center space-x-1.5">
                    <RadioGroupItem
                      value={item.text}
                      id={item.text}
                      className="text-zinc-300  border-zinc-600 focus:ring-zinc-500 w-3.5 h-3.5"
                    />
                    <Label
                      htmlFor={item.text}
                      className={`text-sm cursor-pointer ${
                        selectedLength.text === item.text
                          ? "text-zinc-100 font-medium "
                          : "text-zinc-400"
                      }`}
                    >
                      {item.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button disabled={loading}
              type="submit"
              className="w-full flex items-center gap-1.5 bg-zinc-700 text-zinc-100 font-semibold rounded-lg hover:bg-zinc-600 active:bg-zinc-700 transition-transform transform cursor-pointer text-sm"
            >
              {
                loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> 
                : <Edit2 className="w-4 h-4" />
              }
              Generate Article
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-lg max-h-[600px] p-2 ">
        <CardHeader className="py-2">
          <div className="flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-100">Generated Article</CardTitle>
          </div>
        </CardHeader>

        {!content ? (<CardContent className="flex items-center justify-center py-2 ">
          <div className="text-center text-xs text-zinc-100 flex flex-col items-center gap-3">
            <Edit2 className="w-8 h-8" />
            <p>Enter a topic and click "Generate Article" to get started</p>
          </div>
        </CardContent>) : (
          <div className="mt-1  h-full overflow-y-scroll text-zinc-400 scrollbar-hide p-2 bg-zinc-800 rounded-b-2xl">
            
            <div className=".reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
        
      </Card>
    </section>
  );
};

export default WriteArticle;