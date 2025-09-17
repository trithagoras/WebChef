import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { ShoppingListItem } from "../framework/schema";
import toast from "react-hot-toast";
import { match } from "ts-pattern";
import Modal from "./Modal";

interface ShoppingListModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  shoppingList: ShoppingListItem[];
}

export default function ShoppingListModal({
  showModal,
  setShowModal,
  shoppingList
}: ShoppingListModalProps) {
  const closeModal = () => setShowModal(false);

  const staples = shoppingList.filter(i => i.isStaple);
  const others = shoppingList.filter(i => !i.isStaple);

  const handleCopy = (isStaple?: boolean) => {
    const arr = match(isStaple)
      .with(true, () => staples)
      .with(false, () => others)
      .with(undefined, () => shoppingList)
      .exhaustive();

    const text = arr
      .map(item => {
        const amounts = item.amount.map(a => `${a.amount} ${a.unit}`).join(" + ");
        return `• ${item.name}${amounts ? ` — ${amounts}` : ""}`;
      })
      .join("\n");

    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={closeModal}
      title="Shopping List"
      actions={
        <button
          onClick={() => handleCopy(undefined)}
          className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faClipboard} />
        </button>
      }
    >
      <ul className="space-y-2">
        {/* staples */}
        <div className="flex flex-row mb-3 mt-8 justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Staples</h3>
          <button
            onClick={() => handleCopy(true)}
            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
        {staples.map(item => (
          <li key={item.name}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{item.name}</span>
              <span className="text-sm text-gray-600">
                {item.amount.map(a => `${a.amount} ${a.unit}`).join(" + ")}
              </span>
            </div>
          </li>
        ))}

        {/* others */}
        <div className="flex flex-row mb-3 mt-8 justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Others</h3>
          <button
            onClick={() => handleCopy(false)}
            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
        {others.map(item => (
          <li key={item.name}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{item.name}</span>
              <span className="text-sm text-gray-600">
                {item.amount.map(a => `${a.amount} ${a.unit}`).join(" + ")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
