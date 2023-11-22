import React, { useState } from 'react';

export default function AddApointments (){
  const [medicineRows, setMedicineRows] = useState([]);

  const addMedicineRow = () => {
    setMedicineRows([...medicineRows, { medicine: '', quantity: 1 }]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement submission logic here
    console.log('Form data:', medicineRows);
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto my-10">
      {/* Other form fields... */}

      <div id="medicineSection">
        {medicineRows.map((row, idx) => (
          <div key={idx} className="flex mb-3">
            <select
              name={`medicine-${idx}`}
              value={row.medicine}
              onChange={(e) => {
                const newRows = [...medicineRows];
                newRows[idx].medicine = e.target.value;
                setMedicineRows(newRows);
              }}
              className="block w-full mt-1 mr-2 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="amoxicillin">Amoxicillin</option>
              <option value="ibuprofen">Ibuprofen</option>
              {/* Add other medicine options here */}
            </select>
            <input
              type="number"
              name={`quantity-${idx}`}
              value={row.quantity}
              onChange={(e) => {
                const newRows = [...medicineRows];
                newRows[idx].quantity = e.target.value;
                setMedicineRows(newRows);
              }}
              className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="1"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addMedicineRow}
        className="mt-3 mb-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700"
      >
        Add Medicine
      </button>

      {/* Submit button */}
      <input
        type="submit"
        value="Save Record"
        className="px-4 py-2 bg-green-500 text-white rounded-md shadow cursor-pointer hover:bg-green-700"
      />
    </form>
  );
};
