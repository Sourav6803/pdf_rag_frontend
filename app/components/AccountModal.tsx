import React from "react";

interface AccountModalProps {
  user: {
    name: string;
    email: string;
    pdfLimitUsed: number;
    pdfLimit: number;
    messageLimitUsed: number;
    messageLimit: number;
  };
  onClose: () => void;
  onLogout: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({
  user,
  onClose,
  onLogout,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">My Account</h2>
        <p className="text-sm text-gray-700 mb-4">{user.email}</p>

        <div className="text-sm text-gray-700 mb-1">Free Usage Today</div>
        <div className="text-xs text-gray-500 mb-2">resets at 5:30 AM</div>

        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">
            {user.pdfLimitUsed}/{user.pdfLimit} PDFs
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-purple-600 rounded"
              style={{ width: `${(user.pdfLimitUsed / user.pdfLimit) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">
            {user.messageLimitUsed}/{user.messageLimit} messages
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-purple-600 rounded"
              style={{
                width: `${(user.messageLimitUsed / user.messageLimit) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600"
        >
          Sign Out
        </button>

        <button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
