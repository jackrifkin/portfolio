import { DateRange } from "../types";

export const formatDateRange = (
  dateRange: DateRange,
  withMonths: boolean = false
): string => {
  const { start, end } = dateRange;
  const MONTHS: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (withMonths) {
    const startMonth = MONTHS[start.month - 1];
    const endMonth = end ? MONTHS[end.month - 1] : "";

    return `${startMonth} 20${start.year} - ${
      end ? `${endMonth} 20${end.year}` : "Now"
    }`;
  } else {
    return `${start.month}/${start.year} - ${
      end ? `${end.month}/${end.year}` : "Now"
    }`;
  }
};

export const compareRanges = (
  date1: DateRange,
  date2: DateRange,
  byStartDate: boolean
): number => {
  const dateToMonths = (date: DateRange): number => {
    // NOTE: doesn't work for years < 2000 (doesn't matter for me)
    if (byStartDate) {
      return date.start.year * 12 + date.start.month;
    } else {
      // If no end date, should be highest in list
      return date.end ? date.end.year * 12 + date.end.month : Infinity;
    }
  };

  const a = dateToMonths(date1);
  const b = dateToMonths(date2);

  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};
