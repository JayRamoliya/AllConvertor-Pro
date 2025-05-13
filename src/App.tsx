
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UnitConverters from "./pages/UnitConverters";
import LengthConverter from "./pages/converters/LengthConverter";
import AreaConverter from "./pages/converters/AreaConverter";
import VolumeConverter from "./pages/converters/VolumeConverter";
import WeightConverter from "./pages/converters/WeightConverter";
import TemperatureConverter from "./pages/converters/TemperatureConverter";
import CurrencyConverter from "./pages/converters/CurrencyConverter";
import BmiCalculator from "./pages/utilities/BmiCalculator";
import AgeCalculator from "./pages/utilities/AgeCalculator";
import Directory from "./pages/Directory";
import SearchResults from "./pages/SearchResults";
import Feedback from "./pages/Feedback";
import MathConverters from "./pages/MathConverters";
import EngineeringConverters from "./pages/EngineeringConverters";
import FinanceCalculators from "./pages/FinanceCalculators";
import UtilityTools from "./pages/UtilityTools";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="unit-converters" element={<UnitConverters />} />
            <Route path="unit-converters/length" element={<LengthConverter />} />
            <Route path="unit-converters/area" element={<AreaConverter />} />
            <Route path="unit-converters/volume" element={<VolumeConverter />} />
            <Route path="unit-converters/weight" element={<WeightConverter />} />
            <Route path="unit-converters/temperature" element={<TemperatureConverter />} />
            <Route path="math-converters" element={<MathConverters />} />
            <Route path="engineering-converters" element={<EngineeringConverters />} />
            <Route path="finance-calculators" element={<FinanceCalculators />} />
            <Route path="finance-calculators/currency" element={<CurrencyConverter />} />
            <Route path="utility-tools" element={<UtilityTools />} />
            <Route path="utility-tools/bmi-calculator" element={<BmiCalculator />} />
            <Route path="utility-tools/age-calculator" element={<AgeCalculator />} />
            <Route path="directory" element={<Directory />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
