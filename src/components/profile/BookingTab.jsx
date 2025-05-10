import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

export default function BookingTab({ bookings, onCancel }) {
  const [toCancel, setToCancel] = useState(null);

  return (
    <>
      {bookings.map((b) => (
        <div
          key={b.id}
          className="flex justify-between items-center p-4 border rounded"
        >
          <Link to={`/venue/${b.venue.id}`} className="flex-1 hover:underline">
            <div className="flex flex-col md:flex-row justify-between">
              <span className="font-medium break-all">{b.venue.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(b.dateFrom).toLocaleDateString()} –{" "}
                {new Date(b.dateTo).toLocaleDateString()}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setToCancel(b.id)}
            className="ml-4 text-state-error hover:text-state-error-hover hover:underline  cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ))}

      {toCancel && (
        <Modal onClose={() => setToCancel(null)}>
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Cancel booking?</h2>
            <p className="mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setToCancel(null)}
                className="px-4 py-2 border rounded hover:bg-gray-200"
              >
                No, keep it
              </button>
              <button
                onClick={() => {
                  onCancel(toCancel);
                  setToCancel(null);
                }}
                className="px-4 py-2 bg-state-error hover:bg-state-error-hover text-white rounded"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
