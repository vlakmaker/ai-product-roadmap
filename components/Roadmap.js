import { useState } from "react";

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
  },
  {
    phase: "AI Engineering",
    goals: "Gain hands-on experience in AI model deployment",
    topics: [
      { title: "Self-hosted AI vs. Cloud AI", source: "https://aws.amazon.com/machine-learning/" },
      { title: "Optimizing AI for Performance", source: "https://developer.nvidia.com/machine-learning" },
      { title: "Fine-tuning vs. RAG", source: "https://python.langchain.com/docs/use_cases/question_answering/" }
    ],
  },
  {
    phase: "AI in Gaming & Storytelling",
    goals: "Use AI to create interactive storytelling & AI-driven characters",
    topics: [
      { title: "Procedural Storytelling with AI", source: "https://hiddendoor.co/" },
      { title: "Dynamic NPC AI", source: "https://inworld.ai/" },
      { title: "AI-powered quest generation", source: "https://www.mdpi.com/2076-3417/12/12/6118" }
    ],
  }
];

const Roadmap = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-6">
      {roadmapData.map((section, idx) => (
        <div key={idx} className="bg-gray-800 p-4 rounded-lg">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            <h2 className="text-xl font-semibold">{section.phase}</h2>
            <span>{expanded === idx ? "🔽" : "▶️"}</span>
          </div>
          {expanded === idx && (
            <ul className="mt-2 space-y-2">
              {section.topics.map((topic, id) => (
                <li key={id} className="text-sm text-blue-300">
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
