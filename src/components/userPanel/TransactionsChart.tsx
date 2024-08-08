import { BarChart } from "@mantine/charts";
import { UserTransactionProps } from "../userTransaction/UserTransaction";
import { Stack } from "@mantine/core";
import FormatPrice from "../../utils/FormatPrice";

interface TransactionChartProps {
  transactions: UserTransactionProps[];
}

export default function TransactionChart({ transactions }: TransactionChartProps) {
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  };

  const processTransactions = (transactions: UserTransactionProps[]) => {
    const monthlyData: { [key: string]: { Revenue: number; Expense: number } } = {};

    transactions.forEach(transaction => {
      const month = getMonthName(transaction.TRANSACTION_DATE);
      if (!monthlyData[month]) {
        monthlyData[month] = { Revenue: 0, Expense: 0 };
      }

      if (transaction.TRANSACTION_TYPE === "revenue") {
        monthlyData[month].Revenue += transaction.TRANSACTION_AMOUNT;
      } else if (transaction.TRANSACTION_TYPE === "expense") {
        monthlyData[month].Expense += transaction.TRANSACTION_AMOUNT;
      }
    });

    return Object.keys(monthlyData).map(month => ({
      month,
      Revenue: monthlyData[month].Revenue,
      Expense: monthlyData[month].Expense,
    }));
  };

  const data = processTransactions(transactions);

  return (
    <>
      {data.length <= 0 ? (
        <Stack justify="center" ta='center' c='dimmed' w='100%' h='100%'>
          No data...
        </Stack>
      ) : (
        <Stack justify="center" px={20} w='100%' h='100%'>
          <BarChart
            h={300}
            data={data}
            dataKey="month"
            withLegend
            valueFormatter={(value) => FormatPrice(value)}
            series={[
              { name: 'Revenue', color: 'teal.6' },
              { name: 'Expense', color: 'red.6' },
            ]}
            tickLine="y"
            withYAxis={false}
          />
        </Stack>
      )}
    </>
  );
}
