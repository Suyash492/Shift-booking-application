import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import { ShiftsContext } from '../context/ShiftsContext';

const MyShifts = () => {
  const { bookedShifts, cancelShift } = useContext(ShiftsContext);

  const handleCancel = (shiftId, startTime) => {
    const currentTime = DateTime.local();

    if (currentTime >= DateTime.fromMillis(startTime)) {
      return;
    }

    cancelShift(shiftId);
  };

  return (
    <div className="my-shifts-container p-4">
      <h2 className="text-2xl font-bold mb-4">My Shifts</h2>
      <div>
        {bookedShifts.map((shift) => (
          <div key={shift.id} className="shift-card border p-3 mb-3 flex justify-between items-center shadow-lg rounded-lg">
            <div className="shift-info">
              <span className="text-lg">
                {` ${DateTime.fromMillis(shift.startTime).toFormat(
                  'hh:mm a'
                )} - ${DateTime.fromMillis(shift.endTime).toFormat('hh:mm a')}`}
              </span>
              <span className="text-gray-500 ml-2">{` | ${shift.area}`}</span>
              <span className="text-green-500 font-semibold ml-2">Booked</span>
              {shift.startTime <= DateTime.local().toMillis() && (
                <span className="text-red-500 font-semibold ml-2">
                  {DateTime.local() >= DateTime.fromMillis(shift.endTime)
                    ? 'Completed'
                    : 'Time has started'}
                </span>
              )}
            </div>
            <button
              onClick={() => handleCancel(shift.id, shift.startTime)}
              disabled={DateTime.local().toMillis() >= DateTime.fromMillis(shift.endTime).toMillis()}
              className={`cancel-button ${
                DateTime.local().toMillis() >= DateTime.fromMillis(shift.endTime).toMillis()
                  ? 'bg-gray-300 p-2 rounded cursor-not-allowed'
                  : 'border rounded-full border-red-500 text-red-500 bg-white px-2 py-1 pl-3 pr-3'
              }`}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyShifts;
