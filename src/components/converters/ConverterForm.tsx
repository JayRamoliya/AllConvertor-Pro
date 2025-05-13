
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

export interface Unit {
  id: string;
  name: string;
  symbol: string;
}

interface ConverterFormProps {
  title: string;
  description?: string;
  units: Unit[];
  convert: (value: number, fromUnit: string, toUnit: string) => number;
  formatResult?: (value: number, toUnit: string) => string;
  initialFromUnit?: string;
  initialToUnit?: string;
}

const ConverterForm: React.FC<ConverterFormProps> = ({
  title,
  description,
  units,
  convert,
  formatResult,
  initialFromUnit = units[0]?.id,
  initialToUnit = units[1]?.id,
}) => {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState(initialFromUnit);
  const [toUnit, setToUnit] = useState(initialToUnit);
  const [result, setResult] = useState<number | null>(null);

  // Format the input value to handle decimal points
  const formatValue = (value: string): string => {
    if (value === "" || value === ".") return value;
    return value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  // Perform conversion when the value or units change
  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const numValue = parseFloat(value);
      const converted = convert(numValue, fromUnit, toUnit);
      setResult(converted);
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, convert]);

  // Handle switching units
  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Format the displayed result
  const displayResult = (): string => {
    if (result === null) return "";

    if (formatResult) {
      return formatResult(result, toUnit);
    }

    // Default formatting with appropriate precision
    return result < 0.01 || result > 10000
      ? result.toExponential(6)
      : result.toLocaleString(undefined, {
          maximumFractionDigits: 6,
        });
  };

  // Find unit object by ID
  const findUnit = (unitId: string): Unit | undefined => {
    return units.find(unit => unit.id === unitId);
  };

  // Get unit symbol for display
  const fromUnitSymbol = findUnit(fromUnit)?.symbol || "";
  const toUnitSymbol = findUnit(toUnit)?.symbol || "";

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-3">
              <Input
                value={value}
                onChange={(e) => setValue(formatValue(e.target.value))}
                placeholder="Enter value"
                className="text-lg"
              />
            </div>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder={units[0]?.name} />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapUnits}
              className="rotate-90 sm:rotate-0"
            >
              <ArrowDown className="h-5 w-5" />
              <span className="sr-only">Swap units</span>
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-3">
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <span className="w-full truncate text-muted-foreground">
                  {result !== null ? displayResult() : "—"}
                </span>
              </div>
            </div>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder={units[1]?.name} />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Quick Conversions:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {value && !isNaN(parseFloat(value)) && parseFloat(value) !== 0 ? (
              units
                .filter((unit) => unit.id !== toUnit && unit.id !== fromUnit)
                .slice(0, 4)
                .map((unit) => {
                  const convertedValue = convert(parseFloat(value), fromUnit, unit.id);
                  return (
                    <div key={unit.id} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>
                        {value} {fromUnitSymbol}
                      </span>
                      <span className="font-medium">
                        {convertedValue.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}{" "}
                        {unit.symbol}
                      </span>
                    </div>
                  );
                })
            ) : (
              <p className="text-muted-foreground col-span-2">
                Enter a value to see quick conversions
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConverterForm;
