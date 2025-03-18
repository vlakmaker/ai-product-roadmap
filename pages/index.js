import React, { useState } from "react";

const roadmapData = [
  {
    category: "AI Product Management",
    steps: [
      "Understand AI basics (LLMs, multimodal AI, real-world applications)",
      "Learn AI product lifecycle (ideation → development → launch)",
      "Study AI ethics & risk management",
      "Hands-on: Analyze an AI product (case study)"
    ]
  },
  {
    category: "AI Engineering Basics",
    steps: [
      "Learn how LLMs work (Fast.ai, Hugging Face, Mistral, etc.)",
      "Understand Vector Databases (Pinecone, ChromaDB)",
      "Hands-on: Deploy a simple AI model (Ollama, LangChain)"
    ]
  },
  {
    category: "Gaming & Storytelling",
    steps: [
      "Explore AI-driven storytelling tools (Inworld AI, Hidden Door, Charisma.ai)",
      "Research procedural storytelling & dynamic NPCs",
      "Hands-on: Expand MythosQuest with AI-generated narratives"
    ]
  }
];

const Roadmap = () => {
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (category, step) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [step]: !prev[category]?.[step]
      }
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI & Product Management Roadmap</h1>
      {roadmapData.map(({ category, steps }) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold">{category}</h2>
          <ul className="mt-2">
            {steps.map((step) => (
              <li
                key={step}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toggleStep(category, step)}
              >
                <input
                  type="checkbox"
                  checked={completedSteps[category]?.[step] || false}
                  readOnly
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
