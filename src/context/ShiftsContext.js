import React, { createContext, useState, useEffect } from 'react';
import mockShifts from '../shifts-mock-api/mockShifts';

const ShiftsContext = createContext();

const ShiftsProvider = ({ children }) => {
  const [availableShifts, setAvailableShifts] = useState([]);
  const [bookedShifts, setBookedShifts] = useState([]);

  const bookShift = (shiftId) => {
    const selectedShift = availableShifts.find((shift) => shift.id === shiftId);
    const overlaps = bookedShifts.some(
      (bookedShift) =>
        (selectedShift.startTime >= bookedShift.startTime &&
          selectedShift.startTime < bookedShift.endTime) ||
        (selectedShift.endTime > bookedShift.startTime &&
          selectedShift.endTime <= bookedShift.endTime) ||
        (selectedShift.startTime <= bookedShift.startTime &&
          selectedShift.endTime >= bookedShift.endTime)
    );

    if (!overlaps) {
      const updatedAvailableShifts = availableShifts.map((shift) =>
        shift.id === shiftId ? { ...shift, booked: true } : shift
      );
      const updatedBookedShifts = [...bookedShifts, selectedShift];

      setAvailableShifts(updatedAvailableShifts);
      setBookedShifts(updatedBookedShifts);
    } else {
      console.log('Shift overlaps');
    }
  };

  const cancelShift = (shiftId) => {
    const updatedBookedShifts = bookedShifts.filter((shift) => shift.id !== shiftId);
    setBookedShifts(updatedBookedShifts);

    setAvailableShifts((prevAvailableShifts) =>
      prevAvailableShifts.map((shift) =>
        shift.id === shiftId ? { ...shift, booked: false } : shift
      )
    );
  };

  useEffect(() => {
    setAvailableShifts(mockShifts);
  }, []);

  return (
    <ShiftsContext.Provider value={{ availableShifts, bookedShifts, bookShift, cancelShift }}>
      {children}
    </ShiftsContext.Provider>
  );
};

export { ShiftsContext, ShiftsProvider };
