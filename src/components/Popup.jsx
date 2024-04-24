import React from "react"

export default function Popup({
  handleCancel,
  bookingId,
  checkButton,
  handleConfirmCancellation,
  handleUpdateBooking,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          {checkButton
            ? `Clôturer la réservation #${bookingId} ?`
            : `Annuler la réservation #${bookingId}`}
        </h2>
        <p className="text-gray-700 mb-6">
          {checkButton
            ? "Êtes-vous sûr de vouloir clôturer cette réservation ?"
            : "Êtes-vous sûr de vouloir annuler cette réservation ?"}
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="font-bold px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-4 hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={
              !checkButton ? handleConfirmCancellation : handleUpdateBooking
            }
            className="font-bold px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  )
}
