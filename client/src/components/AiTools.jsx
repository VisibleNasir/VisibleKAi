import { AiToolsData } from "../assets/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AiTools = ({ theme }) => {
  return (
    <section className={`relative px-4 sm:px-6 lg:px-8 xl:px-16 py-28 ${
      theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
    }`}>
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Powerful AI Tools
        </h2>
        <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-base sm:text-lg max-w-xl mx-auto>
          Everything you need to create, enhance, and optimize your content — powered by modern AI.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {AiToolsData.map((tool, index) => (
          <Card
            key={tool.title || index}
            className={`group border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                : "bg-gray-100 border-gray-200 hover:border-gray-300"
            }`}
          >
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                theme === "dark" ? "bg-zinc-800 group-hover:bg-zinc-700" : "bg-gray-200 group-hover:bg-gray-300"
              }`}>
                <tool.Icon className={theme === "dark" ? "w-6 h-6 text-zinc-200" : "w-6 h-6 text-zinc-800"} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className={theme === "dark" ? "text-lg font-medium text-zinc-100" : "text-lg font-medium text-zinc-900"}>
                {tool.title}
              </CardTitle>
              <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default AiTools;
