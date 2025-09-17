'use client'
import { faCheck, faClipboard, faEdit, faUndo, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { masterQuery } from "../framework/schema";
import fakeData from '../framework/fakeData';
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { match } from "ts-pattern";
import { jsonLanguage } from "@codemirror/lang-json";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";

interface EditableTextBlockProps {
  mode: 'json' | 'textArea',
  onSave?: (value: string) => void
}

const editableTheme = EditorView.theme({
  ".cm-scroller": { backgroundColor: "#ffffff" },
  ".cm-gutters": { backgroundColor: "#ffffff" }
}, { dark: false });

const readOnlyTheme = EditorView.theme({
  ".cm-scroller": { backgroundColor: "#e5e7eb" }, // tailwind gray-200
  ".cm-gutters": { backgroundColor: "#e5e7eb" }
}, { dark: false });

const EditableTextBlock = ({ mode, onSave }: EditableTextBlockProps) => {
  const [text, setText] = useState('');
  const [init, setInit] = useState(false);
  const [previousText, setPreviousText] = useState('');
  const [textAreaKey, setTextAreaKey] = useState(0);  // only useful in textArea mode
  const [isEditing, setIsEditing] = useState(false);

  const defaultText = match(mode)
    .with('json', () => fakeData)
    .with('textArea', () => masterQuery)
    .exhaustive();

  const localStorageKey = match(mode)
    .with('json', () => 'recipesJson')
    .with('textArea', () => 'queryText')
    .exhaustive();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const s = window.localStorage.getItem(localStorageKey) ?? defaultText;
      setText(s);
      setPreviousText(s);
      setInit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  const saveEdit = () => {
    match(mode)
      .with('json', () => saveJson())
      .otherwise(() => {
        setPreviousText(text);
        localStorage.setItem(localStorageKey, text);
        setIsEditing(false);
      });
    if (onSave) {
      onSave(text);
    }
  };

  const reset = () => {
    setText(defaultText);
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

  const saveJson = useCallback(() => {
    if (mode !== 'json') {
      return;
    }
    try {
      JSON.parse(text);
      setPreviousText(text);
      localStorage.setItem(localStorageKey, text);
      setIsEditing(false);
    } catch (e) {
      console.log(e);
      toast.error(<div>
        <p>JSON is not formatted correctly.</p>
        {e as SyntaxError ? <p>{(e as SyntaxError).message}</p> : ""}
      </div>);
    }
  }, [localStorageKey, mode, text]);

  // code mirror extensions
  const extensions = useMemo(() => [
    jsonLanguage.extension,
    isEditing ? editableTheme : readOnlyTheme,
    EditorView.editable.of(!!isEditing)
  ], [isEditing]);

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
      disabled={text === defaultText}
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
      key={`text-area-${textAreaKey}`}
      className="w-full p-4 bg-white read-only:bg-gray-200 text-sm border border-gray-300 rounded-lg shadow-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      defaultValue={text}
      onChange={e => setText(e.target.value)}
      readOnly={!isEditing}
      rows={6}
    />)
    .with('json', () => <ReactCodeMirror
      key={`json-area-${textAreaKey}`}
      value={text}
      height="200px"
      onChange={setText}
      extensions={extensions}
      readOnly={!isEditing}
      className="flex-1 min-w-0 w-full bg-white text-sm border border-gray-300 rounded-lg shadow-md"
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
