
import { AiToolsData } from "../assets/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AiTools = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-16 py-24  text-zinc-100">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">Powerful AI Tools</h2>
        <p className="text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-2 justify-evenly">
      {AiToolsData.map((tool, index) => (
        <Card
          key={tool.title || index} 
          className="transition-all duration-300 cursor-pointer w-sm bg-zinc-800"
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <tool.Icon className="w-6 h-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-zinc-100 mb-2">
              {tool.title}
            </CardTitle>
            <p className="text-sm text-zinc-400">{tool.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>

        
    </section>
  );
};

export default AiTools;