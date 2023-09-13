import { useState } from 'react';
import transformedData from '../../utils/dataTransform';
import { formatTooltipItem, formatXAxisDate } from '../../utils/formatTickItem';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Cell,
} from 'recharts';
import { colors } from '../../constants/colors';

interface ChartProps {
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Chart = ({ selectedId, setSelectedId }: ChartProps) => {
  const data = transformedData;

  return (
    <ResponsiveContainer width={900} height={500}>
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid stroke={colors.white} />
        <XAxis
          dataKey="key"
          tick={{ fill: colors.primary, fontSize: 10, fontWeight: 600 }}
          angle={-45}
          textAnchor="end"
          height={70}
          tickFormatter={tick => formatXAxisDate(tick)}
        />
        <YAxis yAxisId="left" orientation="left" stroke={colors.secondary}>
          <Label
            angle={-90}
            value="Value_area"
            position="insideLeft"
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={colors.primary}
          tickFormatter={tick => formatTooltipItem(tick)}
        >
          <Label
            angle={90}
            offset={-15}
            value="Value_bar"
            position="insideRight"
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <Tooltip labelFormatter={value => data.find(item => item.key === value)?.id} />
        <Legend />
        <Bar
          yAxisId="right"
          dataKey="value_bar"
          onClick={data => setSelectedId(data.id)}
          fill={colors.primary}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.id === selectedId ? colors.hover : colors.primary}
            />
          ))}
        </Bar>
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="value_area"
          fill={colors.secondary}
          stroke={colors.secondary}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
