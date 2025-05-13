
import { Thermometer } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterForm, { Unit } from "@/components/converters/ConverterForm";

// Define units
const temperatureUnits: Unit[] = [
  { id: "c", name: "Celsius", symbol: "°C" },
  { id: "f", name: "Fahrenheit", symbol: "°F" },
  { id: "k", name: "Kelvin", symbol: "K" },
  { id: "r", name: "Rankine", symbol: "°R" },
];

// Temperature requires special conversion formulas
const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  // First convert to Celsius as the intermediate unit
  let celsius: number;

  switch (fromUnit) {
    case "c":
      celsius = value;
      break;
    case "f":
      celsius = (value - 32) * 5 / 9;
      break;
    case "k":
      celsius = value - 273.15;
      break;
    case "r":
      celsius = (value - 491.67) * 5 / 9;
      break;
    default:
      celsius = value;
  }

  // Then convert from Celsius to the target unit
  switch (toUnit) {
    case "c":
      return celsius;
    case "f":
      return celsius * 9 / 5 + 32;
    case "k":
      return celsius + 273.15;
    case "r":
      return (celsius + 273.15) * 9 / 5;
    default:
      return celsius;
  }
};

// Format temperature result
const formatTemperature = (value: number, toUnit: string): string => {
  // Round to 2 decimal places for most results
  const roundedValue = Math.round(value * 100) / 100;
  
  // Add the appropriate symbol based on the unit
  switch (toUnit) {
    case "c":
      return `${roundedValue}°C`;
    case "f":
      return `${roundedValue}°F`;
    case "k":
      return `${roundedValue} K`;  // Kelvin has no degree symbol
    case "r":
      return `${roundedValue}°R`;
    default:
      return `${roundedValue}`;
  }
};

const TemperatureConverter = () => {
  return (
    <ConverterLayout
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, Kelvin, and Rankine scales"
      backLink="/unit-converters"
      backLabel="Unit Converters"
      icon={<Thermometer className="w-5 h-5" />}
    >
      <ConverterForm 
        title="Temperature Conversion"
        description="Enter a temperature value and select scales to convert between"
        units={temperatureUnits}
        convert={convertTemperature}
        formatResult={formatTemperature}
        initialFromUnit="c"
        initialToUnit="f"
      />
      
      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Temperature Scales</h3>
        <p className="text-gray-600 mb-4">
          Temperature is a physical quantity expressing hot and cold. Different scales are used to measure temperature, with Celsius being the most common worldwide.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <h4 className="font-medium">Common Reference Points</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Water freezes: 0°C = 32°F = 273.15K</li>
            <li>Body temperature: ~37°C = ~98.6°F</li>
            <li>Water boils: 100°C = 212°F = 373.15K</li>
            <li>Absolute zero: -273.15°C = -459.67°F = 0K</li>
            <li>Room temperature: ~20-25°C = ~68-77°F</li>
          </ul>
        </div>
      </div>
    </ConverterLayout>
  );
};

export default TemperatureConverter;
