"use client";
import { useMemo } from "react";
import { jsonLanguage } from "@codemirror/lang-json";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { editableTheme, readOnlyTheme } from "../CodeEditorThemes";
import CopyButton from "../../shared/components/CopyButton";
import { useEditMode } from "../../shared/stores/editModeStore";
import useJsonStore from "../stores/jsonStore";

const MainJsonEditArea = () => {
  const {
      json: text,
      setJson,
    } = useJsonStore();
    const { isEditing } = useEditMode();

  // code mirror extensions
  const extensions = useMemo(
    () => [
      jsonLanguage.extension,
      isEditing ? editableTheme : readOnlyTheme,
      EditorView.editable.of(!!isEditing),
    ],
    [isEditing]
  );

  return (
    <div className="flex flex-row">
      <ReactCodeMirror
        value={text}
        height="200px"
        onChange={setJson}
        extensions={extensions}
        readOnly={!isEditing}
        className="flex-1 min-w-0 w-full bg-white text-sm border border-gray-300 rounded-lg shadow-md"
      />
      <div className="flex flex-col justify-between ml-2">
        <CopyButton text={text} />
      </div>
    </div>
  );
};

export default MainJsonEditArea;
