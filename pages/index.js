import Roadmap from "../components/Roadmap";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">🚀 AI Product & Storytelling Engineer Roadmap</h1>
        <p className="text-lg text-center mb-10">
          A structured learning path for mastering AI, product management, and storytelling.
        </p>
        <Roadmap />
      </div>
    </div>
  );
}
