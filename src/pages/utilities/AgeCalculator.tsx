
import { useState, useEffect } from "react";
import { Weight } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalWeeks: number;
  totalHours: number;
}

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [age, setAge] = useState<AgeResult | null>(null);

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayFormatted = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Initialize the end date to today
  useEffect(() => {
    setEndDate(getTodayFormatted());
  }, []);

  // Calculate age whenever birthdate or end date changes
  useEffect(() => {
    if (birthdate && endDate) {
      const birthDate = new Date(birthdate);
      const calculationDate = new Date(endDate);

      // Validate the dates
      if (birthDate > calculationDate) {
        setAge(null);
        return;
      }

      // Calculate the difference in milliseconds
      const diffMs = calculationDate.getTime() - birthDate.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalMonths = totalDays / 30.44; // Average days in a month
      const totalWeeks = totalDays / 7;
      const totalHours = totalDays * 24;

      // Calculate years, months, and days
      let years = calculationDate.getFullYear() - birthDate.getFullYear();
      let months = calculationDate.getMonth() - birthDate.getMonth();
      let days = calculationDate.getDate() - birthDate.getDate();

      // Adjust for negative months or days
      if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastMonth = new Date(calculationDate.getFullYear(), calculationDate.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setAge({
        years,
        months,
        days,
        totalDays,
        totalMonths: Math.floor(totalMonths),
        totalWeeks: Math.floor(totalWeeks),
        totalHours: Math.floor(totalHours),
      });
    } else {
      setAge(null);
    }
  }, [birthdate, endDate]);

  const handleSetToday = () => {
    setEndDate(getTodayFormatted());
  };

  return (
    <ConverterLayout
      title="Age Calculator"
      description="Calculate exact age and time periods between dates"
      backLink="/utility-tools"
      backLabel="Utility Tools"
      icon={<Weight className="w-5 h-5" />}
    >
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Age Calculator</CardTitle>
          <CardDescription>
            Calculate your exact age or the time between two dates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input 
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="enddate">End Date</Label>
              <Button 
                variant="link" 
                size="sm" 
                onClick={handleSetToday}
                className="text-xs p-0 h-auto"
              >
                Set to Today
              </Button>
            </div>
            <Input 
              id="enddate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2"
            />
          </div>

          {age ? (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-converter-light rounded-md">
                  <span className="block text-2xl font-bold text-converter-primary">{age.years}</span>
                  <span className="text-sm text-gray-600">Years</span>
                </div>
                <div className="p-3 bg-converter-light rounded-md">
                  <span className="block text-2xl font-bold text-converter-primary">{age.months}</span>
                  <span className="text-sm text-gray-600">Months</span>
                </div>
                <div className="p-3 bg-converter-light rounded-md">
                  <span className="block text-2xl font-bold text-converter-primary">{age.days}</span>
                  <span className="text-sm text-gray-600">Days</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Alternative Expressions:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded flex justify-between">
                    <span>Total Years:</span>
                    <span className="font-medium">{(age.totalDays / 365.25).toFixed(2)}</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex justify-between">
                    <span>Total Months:</span>
                    <span className="font-medium">{age.totalMonths}</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex justify-between">
                    <span>Total Weeks:</span>
                    <span className="font-medium">{age.totalWeeks}</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex justify-between">
                    <span>Total Days:</span>
                    <span className="font-medium">{age.totalDays}</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex justify-between col-span-2">
                    <span>Total Hours:</span>
                    <span className="font-medium">{age.totalHours.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : birthdate && endDate ? (
            <p className="text-center text-red-500">
              Please select a birth date that is before the end date.
            </p>
          ) : (
            <p className="text-center text-gray-500">
              Please select both dates to calculate age or time period.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Age Calculation</h3>
        <p className="text-gray-600 mb-4">
          This calculator determines the exact age or time period between two dates, accounting for leap years and varying month lengths. It provides both precise years/months/days and alternative expressions of the same time period.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Common Uses:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Calculate your age to the day</li>
            <li>Determine time periods for contracts or agreements</li>
            <li>Plan for anniversaries or milestone dates</li>
            <li>Calculate exact age for legal or administrative requirements</li>
          </ul>
        </div>
      </div>
    </ConverterLayout>
  );
};

export default AgeCalculator;
