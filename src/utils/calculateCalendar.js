export const calculateCalendarRanges = (startDate, endDate) => {
    const ranges = [];
    let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  
    while (current <= endDate) {
      const endMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
      ranges.push({
        startDate: new Date(current),
        endDate: new Date(endMonth),
      });
      current = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 1);
    }
  
    return ranges;
  };
  