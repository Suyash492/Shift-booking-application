import React, { useContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { ShiftsContext } from '../context/ShiftsContext';
import mySvg from '../assets/spinner_green.svg';

const AvailableShifts = () => {
  const { availableShifts, bookShift, cancelShift } = useContext(ShiftsContext);
  const [selectedCity, setSelectedCity] = useState('Helsinki');
  const [shifts, setShifts] = useState([]);
  const [animationButtonId, setAnimationButtonId] = useState(null);

  useEffect(() => {
    const filteredShifts = availableShifts.filter(
      (shift) => shift.area.toLowerCase() === selectedCity.toLowerCase()
    );
    setShifts(filteredShifts);
  }, [selectedCity, availableShifts]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setAnimationButtonId(null); 
  };

  const helsinkiCount = availableShifts.filter(
    (shift) => shift.area.toLowerCase() === 'helsinki'
  ).length;

  const tampereCount = availableShifts.filter(
    (shift) => shift.area.toLowerCase() === 'tampere'
  ).length;

  const turkuCount = availableShifts.filter(
    (shift) => shift.area.toLowerCase() === 'turku'
  ).length;

  const handleBookButtonClick = (shiftId) => {
    setAnimationButtonId(shiftId);
    bookShift(shiftId);

    setTimeout(() => {
      setAnimationButtonId(null);
    }, 1000);
  };

  return (
    <div className="my-shifts-container p-4">
      <h2 className="text-2xl font-bold mb-4">Available Shifts</h2>

      <div className="flex justify-around mb-4">
      </div>

      <div className="shifts-container shift-card border p-3 mb-3  justify-between items-center shadow-lg rounded-lg">
        {shifts.map((shift) => (
          <div key={shift.id} className="shift-card border p-4 mb-0 flex justify-between items-center">
            <div className="shift-timing">
              <span>{`Shift: ${DateTime.fromMillis(shift.startTime).toFormat(
                'hh:mm a'
              )} - ${DateTime.fromMillis(shift.endTime).toFormat('hh:mm a')}`}</span>
            </div>
            <div className="flex items-center space-x-2">
              {shift.booked && (
                <>
                  <span className="text-green-500">Booked</span>
                  <button
                    onClick={() => cancelShift(shift.id)}
                    className="cancel-button border rounded-full border-red-500 text-red-500 bg-white px-2 py-1"
                  >
                    Cancel
                  </button>
                </>
              )}
              {!shift.booked && (
                <div className="book-button-container">
                  <button
                    onClick={() => handleBookButtonClick(shift.id)}
                    disabled={shift.booked}
                    className={`book-button  border rounded-full border-green-500 text-green-500 bg-white px-2 py-1${
                      shift.booked
                        ? 'bg-green-500 border-green-500 text-white cursor-not-allowed'
                        : ''
                    }${animationButtonId === shift.id ? ' animation-button' : ''}`}
                  >
                    {shift.booked ? 'Booked' : 'Book'}
                    {animationButtonId === shift.id && (
                      <img src={mySvg} alt="Your SVG Animation" className="animation-icon" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableShifts;
