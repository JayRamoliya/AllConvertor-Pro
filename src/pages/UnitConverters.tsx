
import { Length, Area, Volume, Weight, Temperature } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterCard from "@/components/ConverterCard";

const unitConverters = [
  {
    title: "Length",
    description: "Convert between meters, feet, inches and more",
    icon: <Length className="w-6 h-6" />,
    to: "/unit-converters/length",
  },
  {
    title: "Area",
    description: "Convert between square meters, acres, hectares and more",
    icon: <Area className="w-6 h-6" />,
    to: "/unit-converters/area",
  },
  {
    title: "Volume",
    description: "Convert between liters, gallons, cubic meters and more",
    icon: <Volume className="w-6 h-6" />,
    to: "/unit-converters/volume",
  },
  {
    title: "Weight",
    description: "Convert between kilograms, pounds, ounces and more",
    icon: <Weight className="w-6 h-6" />,
    to: "/unit-converters/weight",
  },
  {
    title: "Temperature",
    description: "Convert between celsius, fahrenheit, kelvin and more",
    icon: <Temperature className="w-6 h-6" />,
    to: "/unit-converters/temperature",
  },
];

const UnitConverters = () => {
  return (
    <ConverterLayout
      title="Unit Converters"
      description="Convert between different units of measurement"
      backLink="/"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {unitConverters.map((converter) => (
          <ConverterCard key={converter.title} {...converter} />
        ))}
      </div>
    </ConverterLayout>
  );
};

export default UnitConverters;
