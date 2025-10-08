import QuerySection from "./areas/query/components/QuerySection";
import RecipeList from "./areas/recipes/components/RecipeList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">✨ VibeChef ✨</h1>
      <QuerySection />
      <RecipeList />
    </div>
  );
}
