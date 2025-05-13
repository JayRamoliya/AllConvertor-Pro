
import { Percent, Ratio } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterCard from "@/components/ConverterCard";

const mathConverters = [
  {
    title: "Number Base",
    description: "Convert between decimal, binary, hexadecimal and octal",
    icon: <Percent className="w-6 h-6" />,
    to: "/math-converters/number-base",
  },
  {
    title: "Roman Numeral",
    description: "Convert between roman numerals and decimal numbers",
    icon: <Percent className="w-6 h-6" />,
    to: "/math-converters/roman-numeral",
  },
  {
    title: "Fractions",
    description: "Convert between decimals and fractions",
    icon: <Percent className="w-6 h-6" />,
    to: "/math-converters/fractions",
  },
  {
    title: "Percentage",
    description: "Calculate percentages, increases and decreases",
    icon: <Percent className="w-6 h-6" />,
    to: "/math-converters/percentage",
  },
  {
    title: "Ratio",
    description: "Convert ratios to decimals, percentages and fractions",
    icon: <Ratio className="w-6 h-6" />,
    to: "/math-converters/ratio",
  },
];

const MathConverters = () => {
  return (
    <ConverterLayout
      title="Math Converters"
      description="Tools for numerical conversions and calculations"
      backLink="/"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mathConverters.map((converter) => (
          <ConverterCard key={converter.title} {...converter} />
        ))}
      </div>
    </ConverterLayout>
  );
};

export default MathConverters;
