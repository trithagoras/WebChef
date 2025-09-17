import { faMinus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AdditionalInstructionsProps {
  instructions: string[];
  setInstructions: React.Dispatch<React.SetStateAction<string[]>>;
}

const AdditionalInstructions = ({ instructions, setInstructions }: AdditionalInstructionsProps) => {
  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (indexToRemove: number) => {
    setInstructions(instructions.filter((_, index) => index !== indexToRemove));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  return (
    <div className="my-4 space-y-3">
      <h3 className="text-md font-semibold text-gray-800">
        Additional Instructions
        <button
            onClick={addInstruction}
            className="text-green-500 hover:text-green-700"
        >
            <FontAwesomeIcon icon={faPlusCircle} size="xl" />
        </button>
      </h3>
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            className="flex-grow p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={`e.g., At least one gluten-free meal`}
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
          />
          <button
            onClick={() => removeInstruction(index)}
            className="flex-shrink-0 p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-300"
            aria-label="Remove instruction"
            disabled={instructions.length <= 0}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdditionalInstructions;