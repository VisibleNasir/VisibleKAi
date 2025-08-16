import  { useState } from "react";
import MarkDown from "react-markdown";
import { Button } from "@/components/ui/button";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-3 sm:p-4 max-w-5xl mx-auto bg-zinc-700  rounded-lg cursor-pointer transition-colors touch-manipulation"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-zinc-100">{item.prompt}</h2>
          <p className="text-xs sm:text-sm text-zinc-100">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <Button
          className="bg-zinc-600  text-zinc-100 px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full   w-full sm:w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type}
        </Button>
      </div>

      {expanded && (
        <div className="mt-3 sm:mt-4">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="Generated content"
              className="mt-2 sm:mt-3 w-full max-w-xs sm:max-w-md rounded-lg object-cover"
            />
          ) : (
            <div className="mt-2 sm:mt-3 max-h-64 sm:max-h-96 overflow-y-auto text-xs sm:text-sm text-zinc-100 prose prose-zinc scrollbar-hide">
              <MarkDown>{item.content}</MarkDown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;