import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface ShoppingListModalProps {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    shoppingList: {
        name: string,
        amount: {
            amount: number,
            unit: string
        }[]
    }[]
}

const ShoppingListModal = ({ showModal, setShowModal, shoppingList }: ShoppingListModalProps) => {
    const closeModal = () => setShowModal(false);
    return showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping List</h2>
            <ul className="space-y-2">
              {shoppingList.map(item => (
                <li key={item.name}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{item.name}</span>
                    <span className="text-sm text-gray-600">
                      {item.amount
                        .map(a => `${a.amount} ${a.unit}`)
                        .join(" + ")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default ShoppingListModal;
