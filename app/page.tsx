import RecipeList from "./components/RecipeList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import InstructionsSection from "./components/InstructionsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Chefs of Waverley Road</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Master Query</h2>
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          <InstructionsSection />
          <div className="mt-4 text-sm text-gray-700">
            <strong>Instructions</strong>
            <p>
              Add any extra instructions (e.g., &quot;make it gluten-free&quot;). Then copy all and paste it into an LLM such as
              {' '}
              <a className='text-blue-500 hover:text-blue-700' href='https://chatgpt.com/' target='_blank'>
                <FontAwesomeIcon icon={faUpRightFromSquare} />
                ChatGPT
              </a>
              . Paste the resulting JSON into the code box below and click &apos;Update&apos;.
            </p>
          </div>
        </div>
      </div>
      <RecipeList />
    </div>
  );
}
