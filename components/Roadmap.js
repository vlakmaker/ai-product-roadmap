import React, { useState } from "react";

const roadmapData = [
  {
    phase: "AI Fundamentals",
    goals: "Develop a strong conceptual understanding of AI",
    topics: [
      { title: "What is AI?", source: "https://ai.google/education/" },
      { title: "Types of AI", source: "https://www.technologyreview.com/2021/02/25/1017803/the-three-types-of-artificial-intelligence/" },
      { title: "How LLMs Work", source: "https://jalammar.github.io/illustrated-transformer/" },
      { title: "AI Ethics & Responsible AI", source: "https://www.microsoft.com/en-us/ai/responsible-ai" }
    ],
  },
  {
    phase: "AI Product Management",
    goals: "Learn to integrate AI into product development",
    topics: [
      { title: "AI Business Models", source: "https://hbr.org/2020/07/how-companies-are-monetizing-their-data-and-ai" },
      { title: "AI Feature Development", source: "https://landing.ai/ai-transformation-playbook/" },
      { title: "Vector Databases & AI-powered Search", source: "https://docs.pinecone.io/" },
      { title: "RAG (Retrieval-Augmented Generation)", source: "https://python.langchain.com/docs/use_cases/question_answering/" }
    ],
  }
];

const Roadmap = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-6">
      {roadmapData.map((section, idx) => (
        <div key={idx} className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <div 
            className="flex justify-between items-center cursor-pointer font-bold text-lg"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            {section.phase}
            <span>{expanded === idx ? "🔽" : "▶️"}</span>
          </div>
          {expanded === idx && (
            <ul className="mt-2 space-y-2">
              {section.topics.map((topic, id) => (
                <li key={id} className="text-blue-600 hover:underline">
                  <a href={topic.source} target="_blank" rel="noopener noreferrer">{topic.title}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
