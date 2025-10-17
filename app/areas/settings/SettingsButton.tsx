'use client';

import { useState } from "react";
import Modal from "../shared/components/Modal";
import Switch from "../shared/components/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../shared/hooks/useLocalStorage";
import toast from "react-hot-toast";

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedUseDatabase, saveUseDatabase] = useLocalStorage("useDb", false);
  const [savedConnectionString, saveConnectionString] = useLocalStorage("connectionString", "");

  const [useDatabase, setUseDatabase] = useState(savedUseDatabase);
  const [connectionString, setConnectionString] = useState(savedConnectionString);

  const handleSave = () => {
    console.log("Saved:", { useDatabase, connectionString });
    saveUseDatabase(useDatabase);
    saveConnectionString(connectionString);
    setIsModalOpen(false);
    toast.success("Saved settings");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUseDatabase(savedUseDatabase);
    setConnectionString(savedConnectionString);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-300 px-2 py-2 rounded-lg hover:bg-gray-400"
      >
        <FontAwesomeIcon icon={faCog} />
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCancel} title="Settings">
        <div className="space-y-6">
          <Switch checked={useDatabase} onToggle={() => setUseDatabase(!useDatabase)} label={<p>Use database <small className="text-gray-400">(otherwise, browser localstorage will be used)</small> </p>} />
          {useDatabase && (
            <div>
              <label
                htmlFor="connection_string"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Connection string
              </label>
              <input
                type="text"
                id="connection_string"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter your DB connection string"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsButton;
