
import { Length, Area, Volume, Weight, Temperature, Currency, Percent, Ratio, Electric, Torque } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConverterCard from "@/components/ConverterCard";

// All converters in categories
const converters = {
  unit: [
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
  ],
  math: [
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
  ],
  engineering: [
    {
      title: "Torque",
      description: "Convert between newton meters, pound-feet and more",
      icon: <Torque className="w-6 h-6" />,
      to: "/engineering-converters/torque",
    },
    {
      title: "Electric Current",
      description: "Convert between amperes, milliamperes and more",
      icon: <Electric className="w-6 h-6" />,
      to: "/engineering-converters/electric",
    },
  ],
  finance: [
    {
      title: "Currency",
      description: "Convert between USD, EUR, GBP and other currencies",
      icon: <Currency className="w-6 h-6" />,
      to: "/finance-calculators/currency",
    },
    {
      title: "Loan Calculator",
      description: "Calculate monthly payments, interest and total cost",
      icon: <Currency className="w-6 h-6" />,
      to: "/finance-calculators/loan",
    },
  ],
  utilities: [
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
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unit">Units</TabsTrigger>
          <TabsTrigger value="math">Math</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ...converters.unit,
              ...converters.math,
              ...converters.engineering,
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

        <TabsContent value="math">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {converters.math.map((converter) => (
              <ConverterCard key={converter.title} {...converter} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engineering">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {converters.engineering.map((converter) => (
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
