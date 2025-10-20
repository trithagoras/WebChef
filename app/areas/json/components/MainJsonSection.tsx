"use client"
import { useEditMode } from "../../shared/stores/editModeStore";
import MainJsonEditArea from "./MainJsonEditArea";

const MainJsonSection = () => {
  const { isEditing: editMode } = useEditMode();

  if (!editMode) {
    return <></>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Import recipes</h2>
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <MainJsonEditArea />
      </div>
    </div>
  );
};

export default MainJsonSection;
