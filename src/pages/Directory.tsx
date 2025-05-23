
import { Ruler, Square, Box, Scale, Thermometer, CircleDollarSign } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConverterCard from "@/components/ConverterCard";

// All converters in categories
const converters = {
  unit: [
    {
      title: "Length",
      description: "Convert between meters, feet, inches and more",
      icon: <Ruler className="w-6 h-6" />,
      to: "/unit-converters/length",
    },
    {
      title: "Area",
      description: "Convert between square meters, acres, hectares and more",
      icon: <Square className="w-6 h-6" />,
      to: "/unit-converters/area",
    },
    {
      title: "Volume",
      description: "Convert between liters, gallons, cubic meters and more",
      icon: <Box className="w-6 h-6" />,
      to: "/unit-converters/volume",
    },
    {
      title: "Weight",
      description: "Convert between kilograms, pounds, ounces and more",
      icon: <Scale className="w-6 h-6" />,
      to: "/unit-converters/weight",
    },
    {
      title: "Temperature",
      description: "Convert between celsius, fahrenheit, kelvin and more",
      icon: <Thermometer className="w-6 h-6" />,
      to: "/unit-converters/temperature",
    },
  ],
  finance: [
    {
      title: "Currency",
      description: "Convert between USD, EUR, GBP and other currencies",
      icon: <CircleDollarSign className="w-6 h-6" />,
      to: "/finance-calculators/currency",
    },
  ],
  utilities: [
    {
      title: "BMI Calculator",
      description: "Calculate Body Mass Index from height and weight",
      icon: <Scale className="w-6 h-6" />,
      to: "/utility-tools/bmi-calculator",
    },
    {
      title: "Age Calculator",
      description: "Calculate age in years, months, and days from birthdate",
      icon: <Scale className="w-6 h-6" />,
      to: "/utility-tools/age-calculator",
    },
  ],
};

const Directory = () => {
  return (
    <ConverterLayout
      title="All Tools Directory"
      description="Browse all available converters and calculators"
      backLink="/"
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unit">Units</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ...converters.unit,
              ...converters.finance,
              ...converters.utilities,
            ].map((converter) => (
              <ConverterCard key={converter.title} {...converter} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unit">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {converters.unit.map((converter) => (
              <ConverterCard key={converter.title} {...converter} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finance">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {converters.finance.map((converter) => (
              <ConverterCard key={converter.title} {...converter} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="utilities">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {converters.utilities.map((converter) => (
              <ConverterCard key={converter.title} {...converter} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </ConverterLayout>
  );
};

export default Directory;
