import { Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (object.split(' ').length > 1) {
        toast('Please enter only one object name');
        return;
      }

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4 sm:px-6 lg:px-10 py-8 transition-colors">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <Card className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl backdrop-blur transition-colors">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              <CardTitle className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
                Object Removal
              </CardTitle>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Upload an image and specify the object you want to remove.
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <form onSubmit={onSubmitHandler} className="space-y-6">

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Upload Image
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setInput(e.target.files[0])}
                  className="bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 file:bg-zinc-300 dark:file:bg-zinc-700 file:text-zinc-700 dark:file:text-zinc-300 file:px-3 file:py-1.5 file:rounded-md hover:file:bg-zinc-400 dark:hover:file:bg-zinc-600 focus:ring-2 focus:ring-zinc-600 transition-colors"
                  required
                />
              </div>

              {/* Object Input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Object to Remove
                </Label>
                <Textarea
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  rows={3}
                  placeholder="e.g. watch, spoon"
                  className="bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 rounded-lg text-base text-zinc-900 dark:text-zinc-100 resize-none focus:ring-2 focus:ring-zinc-600 transition-colors"
                  required
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Enter only a single object name.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Scissors className="w-4 h-4" />
                )}
                Remove Object
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* RIGHT CARD */}
        <Card className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl backdrop-blur flex flex-col transition-colors">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              <CardTitle className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
                Processed Image
              </CardTitle>
            </div>
          </CardHeader>

          {!content ? (
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 space-y-3">
                <Scissors className="w-10 h-10 mx-auto opacity-60" />
                <p>No image processed yet</p>
              </div>
            </CardContent>
          ) : (
            <div className="p-4">
              <img
                src={content}
                alt="Processed"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 transition-colors"
              />
            </div>
          )}
        </Card>

      </div>
    </section>
  );
};

export default RemoveObject;
