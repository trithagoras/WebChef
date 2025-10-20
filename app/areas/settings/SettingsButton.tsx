"use client";

import { useEffect, useState } from "react";
import Modal from "../shared/components/Modal";
import Switch from "../shared/components/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../shared/hooks/useLocalStorage";
import toast from "react-hot-toast";

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedUseEndpoint, saveUseEndpoint] = useLocalStorage<boolean>("useEndpoint");
  const [savedEndpoint, saveEndpoint] = useLocalStorage<string>("endpoint");
  const [, saveJson] = useLocalStorage<string>("recipesJson");
  const [, saveQuery] = useLocalStorage<string>("queryText");

  const [useEndpoint, setUseEndpoint] = useState(savedUseEndpoint ?? false);
  const [endpoint, setEndpoint] = useState(savedEndpoint ?? '');

  const handleSave = () => {
    saveUseEndpoint(useEndpoint);
    saveEndpoint(endpoint);
    localStorage.setItem("showSavedToast", "true");
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUseEndpoint(savedUseEndpoint ?? false);
    setEndpoint(savedEndpoint ?? '');
  };

  const handleDeleteLocalData = () => {
    saveEndpoint(undefined);
    saveUseEndpoint(undefined);
    saveJson(undefined);
    saveQuery(undefined);
    localStorage.setItem("showSavedToast", "true");
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem("showSavedToast") === "true") {
      toast.success("Saved settings");
      localStorage.removeItem("showSavedToast");
    }
  }, []);

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
          <Switch
            checked={useEndpoint ?? false}
            onToggle={() => setUseEndpoint(!useEndpoint)}
            label={
              <p>
                Use endpoint{" "}
                <small className="text-gray-400">
                  (otherwise, browser localstorage will be used)
                </small>
              </p>
            }
          />
          {useEndpoint && (
            <div>
              <label
                htmlFor="endpoint"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Endpoint
              </label>
              <input
                type="text"
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="http://localhost:22925"
              />
            </div>
          )}
          <div>
            <button
              onClick={handleDeleteLocalData}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-400 "
            >
              Delete local data
            </button>
            <small className="text-gray-400 ml-2">
              (resets all saved data to default. Does not affect any endpoint data.)
            </small>
          </div>

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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={
                savedEndpoint === endpoint && useEndpoint === savedUseEndpoint
              }
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
