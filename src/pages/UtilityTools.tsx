
import { Weight } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterCard from "@/components/ConverterCard";

const utilityTools = [
  {
    title: "BMI Calculator",
    description: "Calculate Body Mass Index from height and weight",
    icon: <Weight className="w-6 h-6" />,
    to: "/utility-tools/bmi-calculator",
  },
  {
    title: "Age Calculator",
    description: "Calculate age in years, months, and days from birthdate",
    icon: <Weight className="w-6 h-6" />,
    to: "/utility-tools/age-calculator",
  },
];

const UtilityTools = () => {
  return (
    <ConverterLayout
      title="Utility Tools"
      description="Useful calculators and converters for everyday use"
      backLink="/"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilityTools.map((tool) => (
          <ConverterCard key={tool.title} {...tool} />
        ))}
      </div>
    </ConverterLayout>
  );
};

export default UtilityTools;
