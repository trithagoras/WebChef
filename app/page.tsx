import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainJsonSection from "./areas/json/components/MainJsonSection";
import QuerySection from "./areas/query/components/QuerySection";
import RecipeList from "./areas/recipes/components/RecipeList";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditButton from "./areas/shared/components/EditButton";
import SettingsButton from "./areas/settings/SettingsButton";
import ErrorBoundary from "./areas/shared/components/ErrorBoundary";
import StoreInitializer from "./areas/shared/components/StoreInitializer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">✨ VibeChef ✨</h1>
      <div className="float-right">
        <SettingsButton />
      </div>
      <div className="py-2 pb-8">
        <h2 className="text-lg font-bold">Instructions</h2>
        <p>
          Click the
          {' '}
          <FontAwesomeIcon icon={faEdit} />
          {' '}
          button to enter edit mode where you can make any changes to your upcoming recipes.
        </p>
        <p>
          View the shopping list to see all needed ingredients aggregated from all recipes.
        </p>
      </div>
      <ErrorBoundary>
        <StoreInitializer>
          <QuerySection />
          <MainJsonSection />
          <RecipeList />
          <EditButton />
        </StoreInitializer>
      </ErrorBoundary>
    </div>
  );
}
