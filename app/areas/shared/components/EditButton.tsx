"use client";
import {
  faCheck,
  faEdit,
  faUndo,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditMode } from "../stores/editModeStore";
import useQueryStore from "../../query/stores/queryStore";
import useLocalStorage from "../hooks/useLocalStorage";
import { masterQuery } from "../framework/query";
import fakeData from "../framework/fakeData";
import toast from "react-hot-toast";
import useJsonStore from "../../json/stores/jsonStore";

const EditButton = () => {
  const { isEditing, toggleEditMode } = useEditMode();
  const { json, setJson, refreshPreviousJson } = useJsonStore();
  const { queryText, setQueryText, refreshPreviousQueryText, incrementTextAreaKey } = useQueryStore();

  const [savedQuery, saveQuery] = useLocalStorage("queryText", masterQuery);
  const [savedJson, saveJson] = useLocalStorage("recipesJson", fakeData);

  const handleSave = () => {
    incrementTextAreaKey();
    toggleEditMode();

    saveQuery(queryText);
    saveJson(json);
    refreshPreviousQueryText();
    refreshPreviousJson();
    toast.success("Saved");
  };

  const handleDiscard = () => {
    incrementTextAreaKey();
    toggleEditMode();

    setQueryText(savedQuery);
    setJson(savedJson);
  };

  const handleReset = () => {
    incrementTextAreaKey();

    setQueryText(masterQuery);
    setJson(fakeData);
  };

  const hasUnsavedChanges = json !== savedJson || queryText !== savedQuery;
  const isDefault = json === fakeData && queryText === masterQuery;

  return (
    <div className="my-20 float-right">
      {isEditing ? (
        <div className="space-x-5">
          <button
            className="bg-green-500 hover:bg-green-600 p-2 rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:bg-green-200 disabled:text-gray-400"
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 p-2 rounded-xl text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-red-200 disabled:text-gray-400"
            onClick={handleDiscard}
          >
            <FontAwesomeIcon icon={faX} className="mr-2" />
            {hasUnsavedChanges ? 'Discard changes' : 'Cancel edit'}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 p-2 rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            onClick={handleReset}
            disabled={isDefault}
          >
            <FontAwesomeIcon icon={faUndo} className="mr-2" />
            Reset to defaults
          </button>
        </div>
      ) : (
        <button
          className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-xl cursor-pointer"
          onClick={toggleEditMode}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </button>
      )}
    </div>
  );
};

export default EditButton;
