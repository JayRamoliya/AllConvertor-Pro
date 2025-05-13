
import { Weight } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterForm, { Unit } from "@/components/converters/ConverterForm";

// Define units
const weightUnits: Unit[] = [
  { id: "kg", name: "Kilogram", symbol: "kg" },
  { id: "g", name: "Gram", symbol: "g" },
  { id: "mg", name: "Milligram", symbol: "mg" },
  { id: "t", name: "Metric Ton", symbol: "t" },
  { id: "lb", name: "Pound", symbol: "lb" },
  { id: "oz", name: "Ounce", symbol: "oz" },
  { id: "st", name: "Stone", symbol: "st" },
  { id: "ton_us", name: "US Ton", symbol: "ton (US)" },
  { id: "ton_uk", name: "UK Ton", symbol: "ton (UK)" },
];

// Conversion factors to base unit (kilogram)
const conversionFactors: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  t: 1000,
  lb: 0.453592,
  oz: 0.0283495,
  st: 6.35029,
  ton_us: 907.185,
  ton_uk: 1016.05,
};

// Conversion function
const convertWeight = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert from source unit to base unit (kilogram)
  const valueInBaseUnit = value * conversionFactors[fromUnit];
  
  // Convert from base unit to target unit
  return valueInBaseUnit / conversionFactors[toUnit];
};

const WeightConverter = () => {
  return (
    <ConverterLayout
      title="Weight Converter"
      description="Convert between different units of weight and mass"
      backLink="/unit-converters"
      backLabel="Unit Converters"
      icon={<Weight className="w-5 h-5" />}
    >
      <ConverterForm 
        title="Weight Conversion"
        description="Enter a value and select units to convert between different measurements of weight"
        units={weightUnits}
        convert={convertWeight}
        initialFromUnit="kg"
        initialToUnit="lb"
      />
      
      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Weight Units</h3>
        <p className="text-gray-600 mb-4">
          Weight is the measure of the gravitational force acting on an object. Mass is a measure of the amount of matter in an object. The SI unit of mass is the kilogram (kg).
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h4 className="font-medium">Common Conversions</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>1 kilogram = 2.20462 pounds</li>
            <li>1 pound = 16 ounces</li>
            <li>1 stone = 14 pounds</li>
            <li>1 metric ton = 1000 kilograms</li>
            <li>1 US ton = 2000 pounds</li>
          </ul>
        </div>
      </div>
    </ConverterLayout>
  );
};

export default WeightConverter;
