'use client';

import { ReactNode, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl"
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "lg"
}: ModalProps) {
  if (!isOpen) return null;

  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeMap[size]} max-h-[90vh] overflow-y-auto p-8`}
        onClick={stop}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </button>

        {(title || actions) && (
          <div className="flex items-center justify-between mb-6 mt-10">
            {title && <h2 className="text-3xl font-bold text-gray-800">{title}</h2>}
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
