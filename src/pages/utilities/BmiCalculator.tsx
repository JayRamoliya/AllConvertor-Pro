
import { useState, useEffect } from "react";
import { Weight } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// BMI Categories
const bmiCategories = [
  { min: 0, max: 16, category: "Severe Thinness", color: "text-red-500" },
  { min: 16, max: 17, category: "Moderate Thinness", color: "text-orange-500" },
  { min: 17, max: 18.5, category: "Mild Thinness", color: "text-yellow-500" },
  { min: 18.5, max: 25, category: "Normal", color: "text-green-500" },
  { min: 25, max: 30, category: "Overweight", color: "text-yellow-500" },
  { min: 30, max: 35, category: "Obese Class I", color: "text-orange-500" },
  { min: 35, max: 40, category: "Obese Class II", color: "text-red-500" },
  { min: 40, max: Infinity, category: "Obese Class III", color: "text-red-700" },
];

const BmiCalculator = () => {
  const [system, setSystem] = useState("metric");
  const [height, setHeight] = useState({ value: "", unit: "cm" });
  const [weight, setWeight] = useState({ value: "", unit: "kg" });
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  // Handle height input based on the system
  const handleHeightChange = (value: string) => {
    if (value === "" || !isNaN(Number(value))) {
      setHeight({ ...height, value });
    }
  };

  // Handle feet input for imperial system
  const handleFeetChange = (value: string) => {
    if (value === "" || !isNaN(Number(value))) {
      setFeet(value);
    }
  };

  // Handle inches input for imperial system
  const handleInchesChange = (value: string) => {
    if (value === "" || !isNaN(Number(value))) {
      setInches(value);
    }
  };

  // Handle weight input
  const handleWeightChange = (value: string) => {
    if (value === "" || !isNaN(Number(value))) {
      setWeight({ ...weight, value });
    }
  };

  // Calculate BMI
  useEffect(() => {
    let heightInMeters: number | null = null;
    let weightInKg: number | null = null;

    // Process height based on system
    if (system === "metric") {
      if (height.value) {
        if (height.unit === "cm") {
          heightInMeters = Number(height.value) / 100;
        } else if (height.unit === "m") {
          heightInMeters = Number(height.value);
        }
      }
    } else {
      // Imperial system - convert feet and inches to meters
      if (feet || inches) {
        const feetValue = feet ? Number(feet) : 0;
        const inchesValue = inches ? Number(inches) : 0;
        const totalInches = feetValue * 12 + inchesValue;
        heightInMeters = totalInches * 0.0254; // inches to meters
      }
    }

    // Process weight based on system
    if (weight.value) {
      if (system === "metric") {
        if (weight.unit === "kg") {
          weightInKg = Number(weight.value);
        } else if (weight.unit === "g") {
          weightInKg = Number(weight.value) / 1000;
        }
      } else {
        // Imperial system - convert pounds to kg
        if (weight.unit === "lb") {
          weightInKg = Number(weight.value) * 0.453592;
        } else if (weight.unit === "st") {
          weightInKg = Number(weight.value) * 6.35029;
        }
      }
    }

    // Calculate BMI if we have both height and weight
    if (heightInMeters && weightInKg && heightInMeters > 0) {
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [system, height, weight, feet, inches]);

  // Get BMI category based on calculated BMI
  const getBmiCategory = () => {
    if (bmi === null) return null;
    
    const category = bmiCategories.find(
      (cat) => bmi >= cat.min && bmi < cat.max
    );
    
    return category;
  };

  const bmiCategory = getBmiCategory();

  // Reset inputs when changing system
  const handleSystemChange = (value: string) => {
    setSystem(value);
    if (value === "metric") {
      setHeight({ value: "", unit: "cm" });
      setWeight({ value: "", unit: "kg" });
    } else {
      setFeet("");
      setInches("");
      setWeight({ value: "", unit: "lb" });
    }
    setBmi(null);
  };

  return (
    <ConverterLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index based on height and weight"
      backLink="/utility-tools"
      backLabel="Utility Tools"
      icon={<Weight className="w-5 h-5" />}
    >
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>
            Calculate your Body Mass Index (BMI) based on your height and weight
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={system} 
            onValueChange={handleSystemChange} 
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial</Label>
            </div>
          </RadioGroup>

          <div className="space-y-4">
            <div>
              <Label>Height</Label>
              {system === "metric" ? (
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <Input 
                      value={height.value}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      placeholder="Enter height"
                    />
                  </div>
                  <Select 
                    value={height.unit}
                    onValueChange={(value) => setHeight({ ...height, unit: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <Label className="text-xs">Feet</Label>
                    <Input 
                      value={feet}
                      onChange={(e) => handleFeetChange(e.target.value)}
                      placeholder="ft"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs">Inches</Label>
                    <Input 
                      value={inches}
                      onChange={(e) => handleInchesChange(e.target.value)}
                      placeholder="in"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label>Weight</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex-1">
                  <Input 
                    value={weight.value}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    placeholder="Enter weight"
                  />
                </div>
                <Select 
                  value={weight.unit}
                  onValueChange={(value) => setWeight({ ...weight, unit: value })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {system === "metric" ? (
                      <>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="lb">lb</SelectItem>
                        <SelectItem value="st">stone</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {bmi !== null && (
            <div className="mt-6 p-4 border rounded-md bg-gray-50 text-center space-y-2">
              <h3 className="font-semibold text-lg">Your BMI</h3>
              <p className="text-3xl font-bold">{bmi.toFixed(1)}</p>
              {bmiCategory && (
                <p className={`font-medium ${bmiCategory.color}`}>
                  {bmiCategory.category}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col text-sm text-gray-600">
          <p>
            BMI is a measurement of a person's weight with respect to their height. It's a good, though imperfect, indicator of body fat for most people.
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">BMI Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {bmiCategories.map((category, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded flex justify-between">
              <span>{category.min === 0 ? "Below" : category.min} - {category.max === Infinity ? "Above" : category.max}</span>
              <span className={category.color}>{category.category}</span>
            </div>
          ))}
        </div>
      </div>
    </ConverterLayout>
  );
};

export default BmiCalculator;
