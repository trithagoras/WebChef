'use client'
import { faCheck, faClipboard, faEdit, faUndo, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { masterQuery } from "../framework/schema";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { match } from "ts-pattern";
import { jsonLanguage } from "@codemirror/lang-json";
import ReactCodeMirror from "@uiw/react-codemirror";

interface EditableTextBlockProps {
  localStorageKey: string,
  mode: 'json' | 'textArea'
}

const EditableTextBlock = ({ localStorageKey, mode }: EditableTextBlockProps) => {
    const [text, setText] = useState('');
    const [init, setInit] = useState(false);
    const [previousText, setPreviousText] = useState('');
    const [textAreaKey, setTextAreaKey] = useState(0);  // only useful in textArea mode
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setText(window.localStorage.getItem(localStorageKey) ?? masterQuery);
            setPreviousText(text);
            setInit(true);
        }
    }, [localStorageKey, text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success("Query copied");
    };

    const saveEdit = () => {
        setPreviousText(text);
        localStorage.setItem(localStorageKey, text);
        setIsEditing(false);
    }

    const reset = () => {
        setText(masterQuery);
        setTextAreaKey(textAreaKey + 1);    // re-render
    };

    const startEditing = () => {
        setIsEditing(true);
    }

    const cancelEdit = () => {
        setText(previousText);
        setTextAreaKey(textAreaKey + 1);    // re-render
        setIsEditing(false);
    }

    if (!init) {
        return <Skeleton count={6} />
    }

    const readonlyButtons = <>
        <button
            onClick={startEditing}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
            <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
            onClick={handleCopy}
            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
        >
            <FontAwesomeIcon icon={faClipboard} />
        </button>
    </>;

    const editButtons = <>
        <button
            onClick={reset}
            className="bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500 transition-all duration-300 disabled:bg-gray-300"
            disabled={text === masterQuery}
        >
            <FontAwesomeIcon icon={faUndo} />
        </button>
        <button
            onClick={cancelEdit}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300 disabled:bg-gray-300"
        >
            <FontAwesomeIcon icon={faX} />
        </button>
        <button
            onClick={saveEdit}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all duration-300"
        >
            <FontAwesomeIcon icon={faCheck} />
        </button>
    </>;

    const editor = match(mode)
      .with('textArea', () => <textarea
            key={textAreaKey}
            className="w-full p-4 bg-white read-only:bg-gray-200 text-sm border border-gray-300 rounded-lg shadow-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={text}
            onChange={e => setText(e.target.value)}
            readOnly={!isEditing}
            rows={6}
        />)
      .with('json', () => <ReactCodeMirror
            value={text}
            height="200px"
            onChange={setText}
            extensions={[jsonLanguage.extension]}
          />)
      .exhaustive();

    return <div className="flex flex-row">
        {editor}
        <div className="flex flex-col justify-between ml-2">
            {isEditing ? editButtons : readonlyButtons}
        </div>
    </div>
};

export default EditableTextBlock;
