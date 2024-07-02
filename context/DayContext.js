import React, { createContext, useState, useContext } from 'react';
import Day from '@/models/Day';
import Task from '@/models/Task';

const DayContext = createContext();

export const DayContextProvider = ({ children }) => {
  const [days, setDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week'); 
  const [isNotes, setIsNotes] = useState(false);
  const todaysDate = new Date();

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

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getDayTasks = (date) => {
    const day = days.find(d => d.date.toDateString() === date.toDateString());
    return day ? day.tasks : [];
  };


  const createTask = (date, task) => {
    const day = days.find(d => d.date.toDateString() === date.toDateString());
    if (day) {
      const newTasks = [...day.tasks, task];
      updateDay(date, newTasks);
    } else {
      addDay(date, [task]);
    }
  }

  return (
    <DayContext.Provider value={{ days, addDay, updateDay, currentDate, setCurrentDate, view, setView, getWeekRange, 
                    getDayTasks, isNotes, setIsNotes, todaysDate }}>
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
