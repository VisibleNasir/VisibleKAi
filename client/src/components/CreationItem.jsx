import React, { useState } from "react";
import MarkDown from "react-markdown";
import { Button } from "@/components/ui/button";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl bg-zinc-100 border border-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{item.prompt}</h2>
          <p className="text-sm text-zinc-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-zinc-200 border-zinc-300 text-zinc-900 px-4 py-1 text-sm rounded-full hover:bg-zinc-300"
        >
          {item.type}
        </Button>
      </div>

      {expanded && (
        <div className="mt-4">
          {item.type === "image" ? (
            <img src={item.content} alt="Generated content" className="mt-3 w-full max-w-md rounded-lg" />
          ) : (
            <div className="mt-3 max-h-96 overflow-y-auto text-sm text-zinc-700 prose prose-zinc">
              <MarkDown>{item.content}</MarkDown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;