import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    label?: string
}

const CopyButton = ({ text, label, className, ...props }: CopyButtonProps) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 ${className}`}
      aria-label="Copy"
      {...props}
    >
      <FontAwesomeIcon icon={faClipboard} />
      {label}
    </button>
  );
};

export default CopyButton;
