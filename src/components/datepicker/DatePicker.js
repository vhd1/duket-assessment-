"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { calculateCalendarRanges } from '../../utils/calculateCalendar'; 

const DatePicker = () => {
  const [range, setRange] = useState({ start: null, end: null });

  const handleDateChange = (newDate) => {
    console.log('Selected date:', newDate);

    if (!range.start) {
      setRange({ start: newDate, end: null });
    } else if (range.start && !range.end) {
      if (newDate >= range.start) {
        setRange({ ...range, end: newDate });
      } else {
        setRange({ start: newDate, end: null });
      }
    } else {
      setRange({ start: newDate, end: null });
    }
  };

  const isInRange = (date) => {
    const { start, end } = range;
    if (!start || !end) return false;
    return date >= start && date <= end;
  };

  const isFirstDate = (date) => {
    return date.toDateString() === range.start?.toDateString();
  };

  const isLastDate = (date) => {
    return date.toDateString() === range.end?.toDateString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isFirstDate(date)) {
        return 'highlighted first-date';
      } else if (isLastDate(date)) {
        return 'highlighted last-date';
      } else if (isInRange(date)) {
        return 'highlighted';
      }
    }
    return null;
  };

  const startDate = range.start || new Date();
  const endDate = range.end || new Date();
  const calendarRanges = calculateCalendarRanges(startDate, endDate);

  return (
    <div className="date-picker-container">
      <div className="calendar-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
        {calendarRanges.map((range, index) => {
         
          const minDate = range.start || new Date(0);
          const maxDate = range.end || new Date(8640000000000); 
          
          return (
            <div key={index} style={{ flex: '1 1 auto' }}>
              <Calendar
                onChange={handleDateChange}
                value={range.startDate}
                tileClassName={tileClassName}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          );
        })}
      </div>
      <div className="selected-range">
        {range.start && (
          <p className='text-xs text-gray-500'>
            {formatDate(range.start)} - {range.end ? formatDate(range.end) : '...'}
          </p>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
