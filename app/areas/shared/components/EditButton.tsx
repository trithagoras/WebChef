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
import { masterQuery } from "../framework/query";
import fakeData from "../framework/fakeData";
import toast from "react-hot-toast";
import useJsonStore from "../../json/stores/jsonStore";
import Skeleton from "react-loading-skeleton";
import useStorage from "../hooks/useStorage";
import { Recipe } from "../framework/schema";

const EditButton = () => {
  const { isEditing, toggleEditMode } = useEditMode();
  const { json, setJson, refreshPreviousJson, previousJson, loading: loadingJson } = useJsonStore();
  const { queryText, setQueryText, refreshPreviousQueryText, previousQueryText, incrementTextAreaKey, loading: loadingQuery } = useQueryStore();

  const {value: savedQuery, saveValue: saveQuery } = useStorage("queryText");
  const {value: savedJson, saveValue: saveJson } = useStorage("recipesJson");

  const isLoading = loadingJson || loadingQuery;

  if (isLoading) {
    return <Skeleton height={20} />;
  }

  const handleSave = () => {
    try {
      JSON.parse(json) as Recipe[];
      saveJson(json);
      saveQuery(queryText);
      incrementTextAreaKey();
      toggleEditMode();
      refreshPreviousQueryText();
      refreshPreviousJson();
      toast.success("Saved");
    } catch (err) {
      console.log(err);
      toast.error(`Save failed due to errors: ${err}`);
    }
  };

  const handleDiscard = () => {
    incrementTextAreaKey();
    toggleEditMode();
    setQueryText(previousQueryText);
    setJson(previousJson);
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
