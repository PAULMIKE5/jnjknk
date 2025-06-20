import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all duration-300 ease-out scale-95 animate-modal-pop">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-sky-400 font-orbitron">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
      {/* Styles for modal animation. These are global due to not being scoped. */}
      <style>{`
        @keyframes modal-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-pop {
          animation: modal-pop 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;