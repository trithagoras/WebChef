import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { ShoppingListItem } from "../framework/schema";
import { match } from "ts-pattern";
import Modal from "./shared/Modal";
import CopyButton from "./shared/CopyButton";

interface ShoppingListModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  shoppingList: ShoppingListItem[];
}

export default function ShoppingListModal({
  showModal,
  setShowModal,
  shoppingList,
}: ShoppingListModalProps) {
  const closeModal = () => setShowModal(false);

  const staples = useMemo(
    () => shoppingList.filter((i) => i.isStaple),
    [shoppingList]
  );
  const others = useMemo(
    () => shoppingList.filter((i) => !i.isStaple),
    [shoppingList]
  );

  const getCopyText = useCallback(
    (isStaple?: boolean) => {
      const arr = match(isStaple)
        .with(true, () => staples)
        .with(false, () => others)
        .with(undefined, () => shoppingList)
        .exhaustive();

      return arr
        .map((item) => {
          const amounts = item.amount
            .map((a) => `${a.amount} ${a.unit}`)
            .join(" + ");
          return `• ${item.name}${amounts ? ` — ${amounts}` : ""}`;
        })
        .join("\n");
    },
    [others, shoppingList, staples]
  );

  return (
    <Modal isOpen={showModal} onClose={closeModal} title="Shopping List">
      <CopyButton text={getCopyText(undefined)} label="Copy all" className="pr-4" />
      <ul className="space-y-2">
        {/* staples */}
        <div className="flex flex-row mb-3 mt-8 justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Staples</h3>
          <CopyButton text={getCopyText(true)} />
        </div>
        {staples.map((item) => (
          <li key={item.name}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{item.name}</span>
              <span className="text-sm text-gray-600">
                {item.amount.map((a) => `${a.amount} ${a.unit}`).join(" + ")}
              </span>
            </div>
          </li>
        ))}

        {/* others */}
        <div className="flex flex-row mb-3 mt-8 justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Others</h3>
          <CopyButton text={getCopyText(false)} />
        </div>
        {others.map((item) => (
          <li key={item.name}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{item.name}</span>
              <span className="text-sm text-gray-600">
                {item.amount.map((a) => `${a.amount} ${a.unit}`).join(" + ")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
