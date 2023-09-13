import { DataInterface } from '../constants/@types/types';
import data from '../data/data.json';

const transformData = (
  data: DataInterface,
): { key: string; id: string; value_area: number; value_bar: number }[] => {
  return Object.entries(data.response).map(([key, value]) => ({
    key,
    ...value,
  }));
};

const transformedData = transformData(data);

export default transformedData;
