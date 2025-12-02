/**
 * Format hours into a friendly string.
 * 0  -> "0 hours"
 * 1  -> "1 hour"
 * 5  -> "5 hours"
 */
export const formatHours = (hours: number): string => {
  if (hours <= 0) return '0 hours';
  if (hours === 1) return '1 hour';
  return `${hours} hours`;
};
