
import { Volume } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterForm, { Unit } from "@/components/converters/ConverterForm";

// Define units
const volumeUnits: Unit[] = [
  { id: "l", name: "Liter", symbol: "L" },
  { id: "ml", name: "Milliliter", symbol: "mL" },
  { id: "m3", name: "Cubic Meter", symbol: "m³" },
  { id: "cm3", name: "Cubic Centimeter", symbol: "cm³" },
  { id: "mm3", name: "Cubic Millimeter", symbol: "mm³" },
  { id: "gal_us", name: "US Gallon", symbol: "gal (US)" },
  { id: "gal_uk", name: "UK Gallon", symbol: "gal (UK)" },
  { id: "qt_us", name: "US Quart", symbol: "qt (US)" },
  { id: "pt_us", name: "US Pint", symbol: "pt (US)" },
  { id: "fl_oz_us", name: "US Fluid Ounce", symbol: "fl oz (US)" },
  { id: "fl_oz_uk", name: "UK Fluid Ounce", symbol: "fl oz (UK)" },
  { id: "cup_us", name: "US Cup", symbol: "cup (US)" },
  { id: "tbsp_us", name: "US Tablespoon", symbol: "tbsp (US)" },
  { id: "tsp_us", name: "US Teaspoon", symbol: "tsp (US)" },
];

// Conversion factors to base unit (liter)
const conversionFactors: Record<string, number> = {
  l: 1,
  ml: 0.001,
  m3: 1000,
  cm3: 0.001,
  mm3: 0.000001,
  gal_us: 3.78541,
  gal_uk: 4.54609,
  qt_us: 0.946353,
  pt_us: 0.473176,
  fl_oz_us: 0.0295735,
  fl_oz_uk: 0.0284131,
  cup_us: 0.24,
  tbsp_us: 0.0147868,
  tsp_us: 0.00492892,
};

// Conversion function
const convertVolume = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert from source unit to base unit (liter)
  const valueInBaseUnit = value * conversionFactors[fromUnit];
  
  // Convert from base unit to target unit
  return valueInBaseUnit / conversionFactors[toUnit];
};

const VolumeConverter = () => {
  return (
    <ConverterLayout
      title="Volume Converter"
      description="Convert between different units of volume and capacity"
      backLink="/unit-converters"
      backLabel="Unit Converters"
      icon={<Volume className="w-5 h-5" />}
    >
      <ConverterForm 
        title="Volume Conversion"
        description="Enter a value and select units to convert between different measurements of volume"
        units={volumeUnits}
        convert={convertVolume}
        initialFromUnit="l"
        initialToUnit="gal_us"
      />
      
      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Volume Units</h3>
        <p className="text-gray-600 mb-4">
          Volume is the quantity of three-dimensional space enclosed by a closed surface. The SI unit of volume is the cubic meter (m³), though liters (L) are commonly used for liquids.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h4 className="font-medium">Common Conversions</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>1 liter = 0.264172 US gallons</li>
            <li>1 US gallon = 3.78541 liters</li>
            <li>1 cubic meter = 1000 liters</li>
            <li>1 US cup = 8 US fluid ounces</li>
            <li>1 US tablespoon = 3 US teaspoons</li>
          </ul>
        </div>
      </div>
    </ConverterLayout>
  );
};

export default VolumeConverter;
