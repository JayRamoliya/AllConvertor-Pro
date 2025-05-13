
import { Zap, Gauge } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterCard from "@/components/ConverterCard";

const engineeringConverters = [
  {
    title: "Torque",
    description: "Convert between newton meters, pound-feet and more",
    icon: <Gauge className="w-6 h-6" />,
    to: "/engineering-converters/torque",
  },
  {
    title: "Electric Current",
    description: "Convert between amperes, milliamperes and more",
    icon: <Zap className="w-6 h-6" />,
    to: "/engineering-converters/electric",
  },
];

const EngineeringConverters = () => {
  return (
    <ConverterLayout
      title="Engineering Converters"
      description="Specialized conversions for engineering applications"
      backLink="/"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineeringConverters.map((converter) => (
          <ConverterCard key={converter.title} {...converter} />
        ))}
      </div>
    </ConverterLayout>
  );
};

export default EngineeringConverters;
