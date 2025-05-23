import { useState } from "react";
import Modal from "../Modal";

export default function RentalTab({ rentals = [], onEdit, onDelete }) {
  const [toDelete, setToDelete] = useState(null);

  if (!rentals.length) {
    return <p className="text-gray-600">No rentals to manage.</p>;
  }

  return (
    <>
      <div className="space-y-6">
        {rentals.map((venue) => (
          <div
            key={venue.id}
            className="border rounded p-4 space-y-2 md:flex md:items-center md:justify-between"
          >
            <div className="md:flex-1 space-y-2">
              <h4 className="font-medium text-lg truncate max-w-[20ch]">
                {venue.name}
              </h4>

              {venue.bookings?.length ? (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {venue.bookings.map((b) => (
                    <li key={b.id}>
                      Booked:{" "}
                      <strong>
                        {new Date(b.dateFrom).toLocaleDateString()} →{" "}
                        {new Date(b.dateTo).toLocaleDateString()}
                      </strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No current bookings</p>
              )}
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={() => onEdit(venue.id)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Edit Venue
              </button>
              <button
                onClick={() => setToDelete(venue.id)}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Delete Venue
              </button>
            </div>
          </div>
        ))}
      </div>

      {toDelete && (
        <Modal onClose={() => setToDelete(null)}>
          <div className="p-6">
            <h2 className="text-heading-5 mb-4">Delete Venue?</h2>
            <p className="mb-6">Are you sure you want to delete this venue?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setToDelete(null)}
                className="px-4 py-2 border rounded hover:bg-gray-200 cursor-pointer"
              >
                No, keep it
              </button>
              <button
                onClick={() => {
                  onDelete(toDelete);
                  setToDelete(null);
                }}
                className="px-4 py-2 bg-state-error hover:bg-state-error-hover text-white rounded cursor-pointer"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
