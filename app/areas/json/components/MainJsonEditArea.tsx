"use client";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { jsonLanguage } from "@codemirror/lang-json";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { editableTheme, readOnlyTheme } from "../CodeEditorThemes";
import CopyButton from "../../shared/components/CopyButton";
import { useEditMode } from "../../shared/stores/editModeStore";
import { jsonStorageKey, useJsonStore } from "../stores/jsonStore";
import fakeData from "../../shared/framework/fakeData";

const MainJsonEditArea = () => {
  const {
      json: text,
      setJson,
      refreshPreviousJson
    } = useJsonStore();
    const [init, setInit] = useState(false);
    const { editMode: isEditing } = useEditMode();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const s = window.localStorage.getItem(jsonStorageKey) ?? fakeData;
      setJson(s);
      refreshPreviousJson();
      setInit(true);
    }
  }, [refreshPreviousJson, setJson]);

  // code mirror extensions
  const extensions = useMemo(
    () => [
      jsonLanguage.extension,
      isEditing ? editableTheme : readOnlyTheme,
      EditorView.editable.of(!!isEditing),
    ],
    [isEditing]
  );

  if (!init) {
    return <Skeleton count={6} />;
  }

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
