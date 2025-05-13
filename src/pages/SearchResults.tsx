
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConverterLayout from "@/components/ConverterLayout";
import ConverterCard from "@/components/ConverterCard";
import { Search, Ruler, Square, Box, Scale, Thermometer, CircleDollarSign, Percent, GitCompare, Zap, Gauge } from "lucide-react";

// All converters with searchable terms
const allConverters = [
  {
    title: "Length",
    description: "Convert between meters, feet, inches and more",
    icon: <Ruler className="w-6 h-6" />,
    to: "/unit-converters/length",
    keywords: ["length", "distance", "meter", "foot", "inch", "cm", "mm", "km", "mile"],
  },
  {
    title: "Area",
    description: "Convert between square meters, acres, hectares and more",
    icon: <Square className="w-6 h-6" />,
    to: "/unit-converters/area",
    keywords: ["area", "square", "meter", "acre", "hectare"],
  },
  {
    title: "Volume",
    description: "Convert between liters, gallons, cubic meters and more",
    icon: <Box className="w-6 h-6" />,
    to: "/unit-converters/volume",
    keywords: ["volume", "liter", "gallon", "cubic", "fluid"],
  },
  {
    title: "Weight",
    description: "Convert between kilograms, pounds, ounces and more",
    icon: <Scale className="w-6 h-6" />,
    to: "/unit-converters/weight",
    keywords: ["weight", "mass", "kilogram", "kg", "pound", "lb", "ounce", "oz", "ton"],
  },
  {
    title: "Temperature",
    description: "Convert between celsius, fahrenheit, kelvin and more",
    icon: <Thermometer className="w-6 h-6" />,
    to: "/unit-converters/temperature",
    keywords: ["temperature", "celsius", "fahrenheit", "kelvin"],
  },
  {
    title: "Currency",
    description: "Convert between USD, EUR, GBP and other currencies",
    icon: <CircleDollarSign className="w-6 h-6" />,
    to: "/finance-calculators/currency",
    keywords: ["currency", "money", "dollar", "euro", "pound", "exchange", "forex", "usd", "eur", "gbp"],
  },
  {
    title: "BMI Calculator",
    description: "Calculate Body Mass Index from height and weight",
    icon: <Scale className="w-6 h-6" />,
    to: "/utility-tools/bmi-calculator",
    keywords: ["bmi", "body", "mass", "index", "weight", "health"],
  },
  {
    title: "Age Calculator",
    description: "Calculate age in years, months, and days from birthdate",
    icon: <Scale className="w-6 h-6" />,
    to: "/utility-tools/age-calculator",
    keywords: ["age", "birthday", "date", "born", "years"],
  },
];

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(allConverters);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);

    if (query) {
      const filtered = allConverters.filter(
        (converter) =>
          converter.title.toLowerCase().includes(query.toLowerCase()) ||
          converter.description.toLowerCase().includes(query.toLowerCase()) ||
          converter.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query.toLowerCase())
          )
      );
      setResults(filtered);
    } else {
      setResults(allConverters);
    }
  }, [location.search]);

  return (
    <ConverterLayout
      title={`Search Results: "${searchQuery}"`}
      description={`Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
      backLink="/"
      icon={<Search className="w-5 h-5" />}
    >
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((converter) => (
            <ConverterCard
              key={converter.title}
              title={converter.title}
              description={converter.description}
              icon={converter.icon}
              to={converter.to}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No converters found</h3>
          <p className="text-gray-500">
            Try searching with different keywords or browse all converters in the directory.
          </p>
        </div>
      )}
    </ConverterLayout>
  );
};

export default SearchResults;
