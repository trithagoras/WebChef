import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { masterQuery } from "../framework/schema";

interface MasterQueryTextAreaProps {
    queryText: string,
    setQueryText: Dispatch<SetStateAction<string>>,
    reset: () => void,
    resetKey: string
}

const MasterQueryTextArea = ({ queryText, setQueryText, reset, resetKey }: MasterQueryTextAreaProps) => {
    return <div className="flex flex-row">
        <textarea
            key={resetKey}
            className="w-full p-4 bg-white text-sm border border-gray-300 rounded-lg shadow-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={queryText}
            onChange={e => setQueryText(e.target.value)}
            rows={6}
        />
        <div>
            <button
                onClick={reset}
                className="ml-2 bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500 transition-all duration-300 disabled:bg-gray-300"
                disabled={queryText === masterQuery}
            >
                <FontAwesomeIcon icon={faUndo} />
            </button>
        </div>
    </div>
};

export default MasterQueryTextArea;
