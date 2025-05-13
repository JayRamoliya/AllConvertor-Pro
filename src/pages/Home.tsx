
import { Ruler, Square, Box, Scale, Thermometer, CircleDollarSign, Percent } from "lucide-react";
import ConverterCard from "@/components/ConverterCard";
import SearchBox from "@/components/SearchBox";
import { useNavigate } from "react-router-dom";

const popularConverters = [
  {
    title: "Length",
    description: "Convert between meters, feet, inches and more",
    icon: <Ruler className="w-6 h-6" />,
    to: "/unit-converters/length",
  },
  {
    title: "Area",
    description: "Convert between square meters, acres, hectares and more",
    icon: <Square className="w-6 h-6" />,
    to: "/unit-converters/area",
  },
  {
    title: "Volume",
    description: "Convert between liters, gallons, cubic meters and more",
    icon: <Box className="w-6 h-6" />,
    to: "/unit-converters/volume",
  },
  {
    title: "Weight",
    description: "Convert between kilograms, pounds, ounces and more",
    icon: <Scale className="w-6 h-6" />,
    to: "/unit-converters/weight",
  },
  {
    title: "Temperature",
    description: "Convert between celsius, fahrenheit, kelvin and more",
    icon: <Thermometer className="w-6 h-6" />,
    to: "/unit-converters/temperature",
  },
  {
    title: "Currency",
    description: "Convert between USD, EUR, GBP and more currencies",
    icon: <CircleDollarSign className="w-6 h-6" />,
    to: "/finance-calculators/currency",
  },
];

const categorySections = [
  {
    title: "Unit Converters",
    to: "/unit-converters",
    icon: <Ruler className="w-5 h-5" />,
  },
  {
    title: "Math Converters",
    to: "/math-converters",
    icon: <Percent className="w-5 h-5" />,
  },
  {
    title: "Engineering",
    to: "/engineering-converters",
    icon: <Ruler className="w-5 h-5" />,
  },
  {
    title: "Finance",
    to: "/finance-calculators",
    icon: <CircleDollarSign className="w-5 h-5" />,
  },
  {
    title: "Utilities",
    to: "/utility-tools",
    icon: <Scale className="w-5 h-5" />,
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="animate-fade-in">
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-converter-primary to-converter-secondary bg-clip-text text-transparent">
          AllConvertor Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Your all-in-one solution for unit conversions, calculations, and more
        </p>
        
        <div className="max-w-md mx-auto">
          <SearchBox onSearch={handleSearch} />
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Converters</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularConverters.map((converter) => (
            <ConverterCard key={converter.title} {...converter} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categorySections.map((category) => (
            <ConverterCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              to={category.to}
              className="text-center"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
