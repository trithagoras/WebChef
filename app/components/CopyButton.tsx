import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

interface Props {
  masterQuery: string;
  additionalInstructions: string[];
}

const CopyButton = ({ masterQuery, additionalInstructions }: Props) => {
  const handleCopy = () => {
    const nonEmptyInstructions = additionalInstructions.filter(inst => inst.trim() !== '');

    let textToCopy = masterQuery;

    if (nonEmptyInstructions.length > 0) {
      const instructionsText = nonEmptyInstructions.map((inst, index) => `${index + 1}. ${inst}`).join('\n');
      textToCopy += `\n\n---\n\n## Additional Instructions\nPlease adhere to the following instructions in your response:\n${instructionsText}`;
    }

    navigator.clipboard.writeText(textToCopy);
    toast.success("Query copied");
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all duration-300"
    >
      <FontAwesomeIcon icon={faClipboard} className='mr-2' />
      Copy all
    </button>
  );
};

export default CopyButton;