"use client";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useEditMode } from "../../shared/stores/editModeStore";
import { queryStorageKey, useQueryStore } from "../stores/queryStore";
import CopyButton from "../../shared/components/CopyButton";
import { masterQuery } from "../../shared/framework/query";

const QueryEditArea = () => {
  const {
    queryText: text,
    setQueryText,
    refreshPreviousQueryText,
    textAreaKey
  } = useQueryStore();
  const [init, setInit] = useState(false);
  const { editMode: isEditing } = useEditMode();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const s = window.localStorage.getItem(queryStorageKey) ?? masterQuery;
      setQueryText(s);
      refreshPreviousQueryText();
      setInit(true);
    }
  }, [refreshPreviousQueryText, setQueryText]);

  if (!init) {
    return <Skeleton count={6} />;
  }

  return (
    <div className="flex flex-row">
      <textarea
        key={`text-area-${textAreaKey}`}
        className="w-full p-4 bg-white read-only:bg-gray-200 text-sm border border-gray-300 rounded-lg shadow-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        defaultValue={text}
        onChange={(e) => setQueryText(e.target.value)}
        readOnly={!isEditing}
        rows={6}
      />
      <div className="flex flex-col justify-between ml-2">
        <CopyButton text={text} />
      </div>
    </div>
  );
};

export default QueryEditArea;
