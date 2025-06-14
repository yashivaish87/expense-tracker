import React from "react";
import "boxicons";

export default function GuestList({ guestTransactions, setGuestTransactions }) {
  const handleDelete = (index) => {
    const updated = [...guestTransactions];
    updated.splice(index, 1); // remove one item at the index
    setGuestTransactions(updated);
  };

  return (
    <div className="flex flex-col">
      {/* clear button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Recent Entries</h2>
        {guestTransactions.length > 0 && (
          <button
            onClick={() => setGuestTransactions([])}
            className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="overflow-auto max-h-96 scrollbar-extra-thin">
        <div className="flex flex-col py-6 gap-3">
          {guestTransactions.length === 0 ? (
            <p className="text-gray-500 text-sm">No entries yet.</p>
          ) : (
            guestTransactions.map((tx, idx) => (
              <div
                key={idx}
                className="item flex justify-between items-center bg-gray-50 py-2 px-3 rounded-l shadow-sm border-l-8 border-indigo-400"
              >
                <span className="block text-sm font-medium text-gray-700">
                  {tx.desc} -{" "}
                  <span
                    className={
                      parseFloat(tx.amount) < 0
                        ? "text-red-500"
                        : "text-green-600"
                    }
                  >
                    ₹{Math.abs(parseFloat(tx.amount)).toFixed(2)}
                  </span>
                </span>
                {/* delete button */}
                <button onClick={() => handleDelete(idx)} className="px-1">
                  <box-icon name="trash" size="18px" color="red"></box-icon>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
