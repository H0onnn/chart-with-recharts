export const formatTooltipItem = (item: any): string => {
  return item.toLocaleString();
};

export const formatXAxisDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
