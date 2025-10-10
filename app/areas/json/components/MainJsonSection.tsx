"use client"
import { useEditMode } from "../../shared/stores/editModeStore";
import MainJsonEditArea from "./MainJsonEditArea";

const MainJsonSection = () => {
  const { isEditing: editMode } = useEditMode();

  if (!editMode) {
    return <></>;
  }

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
      <MainJsonEditArea />
    </div>
  );
};

export default MainJsonSection;
