
import { Square } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterForm, { Unit } from "@/components/converters/ConverterForm";

// Define units
const areaUnits: Unit[] = [
  { id: "m2", name: "Square Meter", symbol: "m²" },
  { id: "km2", name: "Square Kilometer", symbol: "km²" },
  { id: "cm2", name: "Square Centimeter", symbol: "cm²" },
  { id: "mm2", name: "Square Millimeter", symbol: "mm²" },
  { id: "ha", name: "Hectare", symbol: "ha" },
  { id: "acre", name: "Acre", symbol: "ac" },
  { id: "ft2", name: "Square Foot", symbol: "ft²" },
  { id: "in2", name: "Square Inch", symbol: "in²" },
  { id: "yd2", name: "Square Yard", symbol: "yd²" },
  { id: "mi2", name: "Square Mile", symbol: "mi²" },
];

// Conversion factors to base unit (square meter)
const conversionFactors: Record<string, number> = {
  m2: 1,
  km2: 1000000,
  cm2: 0.0001,
  mm2: 0.000001,
  ha: 10000,
  acre: 4046.86,
  ft2: 0.092903,
  in2: 0.00064516,
  yd2: 0.836127,
  mi2: 2589988.11,
};

// Conversion function
const convertArea = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert from source unit to base unit (square meter)
  const valueInBaseUnit = value * conversionFactors[fromUnit];
  
  // Convert from base unit to target unit
  return valueInBaseUnit / conversionFactors[toUnit];
};

const AreaConverter = () => {
  return (
    <ConverterLayout
      title="Area Converter"
      description="Convert between different units of area"
      backLink="/unit-converters"
      backLabel="Unit Converters"
      icon={<Square className="w-5 h-5" />}
    >
      <ConverterForm 
        title="Area Conversion"
        description="Enter a value and select units to convert between different measurements of area"
        units={areaUnits}
        convert={convertArea}
        initialFromUnit="m2"
        initialToUnit="ft2"
      />
      
      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Area Units</h3>
        <p className="text-gray-600 mb-4">
          Area is a quantity that expresses the extent of a two-dimensional surface. The SI unit of area is the square meter (m²).
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h4 className="font-medium">Common Conversions</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>1 square meter = 10.7639 square feet</li>
            <li>1 hectare = 2.47105 acres</li>
            <li>1 square kilometer = 0.386102 square miles</li>
            <li>1 acre = 43,560 square feet</li>
            <li>1 square mile = 640 acres</li>
          </ul>
        </div>
      </div>
    </ConverterLayout>
  );
};

export default AreaConverter;
