
import { CircleDollarSign } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterCard from "@/components/ConverterCard";

const financeCalculators = [
  {
    title: "Currency",
    description: "Convert between USD, EUR, GBP and other currencies",
    icon: <CircleDollarSign className="w-6 h-6" />,
    to: "/finance-calculators/currency",
  },
];

const FinanceCalculators = () => {
  return (
    <ConverterLayout
      title="Finance Calculators"
      description="Tools for financial calculations and currency conversion"
      backLink="/"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {financeCalculators.map((calculator) => (
          <ConverterCard key={calculator.title} {...calculator} />
        ))}
      </div>
    </ConverterLayout>
  );
};

export default FinanceCalculators;
