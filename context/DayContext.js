import React, { createContext, useState, useContext } from 'react';
import Day from '@/models/Day';
import Task from '@/models/Task';

const DayContext = createContext();

export const DayContextProvider = ({ children }) => {
  const [days, setDays] = useState([]);

  const addDay = (date, tasks = []) => {
    const newDay = new Day(date, tasks);
    setDays((prevDays) => [...prevDays, newDay]);
  };

  const updateDay = (date, tasks) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.date.toDateString() === date.toDateString()
          ? { ...day, tasks }
          : day
      )
    );
  };

  return (
    <DayContext.Provider value={{ days, addDay, updateDay }}>
      {children}
    </DayContext.Provider>
  );
};

export const useDayContext = () => {
  const context = useContext(DayContext);
  if (!context) {
    throw new Error('useDayContext must be used within a DayContextProvider');
  }
  return context;
};
