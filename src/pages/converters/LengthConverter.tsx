
import { Ruler } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterForm, { Unit } from "@/components/converters/ConverterForm";

// Define units
const lengthUnits: Unit[] = [
  { id: "m", name: "Meter", symbol: "m" },
  { id: "km", name: "Kilometer", symbol: "km" },
  { id: "cm", name: "Centimeter", symbol: "cm" },
  { id: "mm", name: "Millimeter", symbol: "mm" },
  { id: "mi", name: "Mile", symbol: "mi" },
  { id: "yd", name: "Yard", symbol: "yd" },
  { id: "ft", name: "Foot", symbol: "ft" },
  { id: "in", name: "Inch", symbol: "in" },
  { id: "nm", name: "Nautical Mile", symbol: "NM" },
];

// Conversion factors to base unit (meter)
const conversionFactors: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
  nm: 1852,
};

// Conversion function
const convertLength = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert from source unit to base unit (meter)
  const valueInBaseUnit = value * conversionFactors[fromUnit];
  
  // Convert from base unit to target unit
  return valueInBaseUnit / conversionFactors[toUnit];
};

const LengthConverter = () => {
  return (
    <ConverterLayout
      title="Length Converter"
      description="Convert between different units of length and distance"
      backLink="/unit-converters"
      backLabel="Unit Converters"
      icon={<Ruler className="w-5 h-5" />}
    >
      <ConverterForm 
        title="Length Conversion"
        description="Enter a value and select units to convert between different measurements of length"
        units={lengthUnits}
        convert={convertLength}
        initialFromUnit="m"
        initialToUnit="ft"
      />
      
      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Length Units</h3>
        <p className="text-gray-600 mb-4">
          Length is a measure of distance. In the International System of Units (SI), the base unit is the meter (m).
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h4 className="font-medium">Common Conversions</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>1 meter = 3.28084 feet</li>
            <li>1 kilometer = 0.621371 miles</li>
            <li>1 inch = 2.54 centimeters</li>
            <li>1 foot = 0.3048 meters</li>
            <li>1 mile = 1.60934 kilometers</li>
          </ul>
        </div>
      </div>
    </ConverterLayout>
  );
};

export default LengthConverter;
