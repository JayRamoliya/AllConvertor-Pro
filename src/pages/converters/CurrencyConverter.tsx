
import React, { useState, useEffect } from "react";
import { Currency } from "lucide-react";
import ConverterLayout from "@/components/ConverterLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ExchangeRates {
  [key: string]: number;
}

// Mock exchange rates since we don't have an API integration yet
const mockExchangeRates: ExchangeRates = {
  USD: 1.0,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 150.14,
  CAD: 1.37,
  AUD: 1.53,
  CHF: 0.9,
  CNY: 7.24,
  INR: 83.37,
  MXN: 16.76,
  BRL: 5.07,
  RUB: 90.31,
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [rates, setRates] = useState<ExchangeRates>(mockExchangeRates);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  // Format the amount input
  const formatAmount = (value: string): string => {
    if (value === "" || value === ".") return value;
    return value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  // Perform conversion
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const numericAmount = parseFloat(amount);
      
      // Convert from source to USD (base currency)
      const amountInUSD = numericAmount / rates[fromCurrency];
      
      // Convert from USD to target currency
      const convertedAmount = amountInUSD * rates[toCurrency];
      
      setResult(convertedAmount);
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  // Handle currency swap
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Mock API refresh
  const handleRefreshRates = () => {
    // In a real app, this would call an API
    // For now, let's just simulate an update by slightly modifying the rates
    const updatedRates: ExchangeRates = { ...mockExchangeRates };
    Object.keys(updatedRates).forEach(key => {
      // Randomly adjust rates by ±1%
      updatedRates[key] *= (1 + (Math.random() * 0.02 - 0.01));
    });
    
    setRates(updatedRates);
    setLastUpdated(new Date());
    
    toast({
      title: "Exchange rates updated",
      description: "The latest exchange rates have been loaded.",
    });
  };

  // Format currency with symbol
  const getCurrencyWithSymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? `${currency.symbol} ${currency.code}` : code;
  };

  return (
    <ConverterLayout
      title="Currency Converter"
      description="Convert between different world currencies"
      backLink="/finance-calculators"
      backLabel="Finance Calculators"
      icon={<Currency className="w-5 h-5" />}
    >
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Currency Conversion</CardTitle>
            <CardDescription>Convert between world currencies</CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRefreshRates}
            className="text-xs"
          >
            Refresh Rates
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-xs text-gray-500 text-right">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="col-span-3">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(formatAmount(e.target.value))}
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwapCurrencies}
                className="rotate-90 sm:rotate-0"
              >
                <Currency className="h-5 w-5" />
                <span className="sr-only">Swap currencies</span>
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="col-span-3">
                <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <span className="w-full truncate text-muted-foreground">
                    {result !== null ? result.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) : "—"}
                  </span>
                </div>
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="EUR" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Other Conversions:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) !== 0 ? (
                currencies
                  .filter((c) => c.code !== toCurrency && c.code !== fromCurrency)
                  .slice(0, 4)
                  .map((currency) => {
                    const numericAmount = parseFloat(amount);
                    const amountInUSD = numericAmount / rates[fromCurrency];
                    const convertedAmount = amountInUSD * rates[currency.code];
                    
                    return (
                      <div key={currency.code} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>
                          {getCurrencyWithSymbol(fromCurrency)}
                        </span>
                        <span className="font-medium">
                          {convertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })} {currency.code}
                        </span>
                      </div>
                    );
                  })
              ) : (
                <p className="text-muted-foreground col-span-2">
                  Enter an amount to see other conversions
                </p>
              )}
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 pt-2">
            Note: This converter uses mock exchange rates for demonstration. In a production app, current rates would be fetched from a currency API.
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">About Currency Exchange</h3>
        <p className="text-gray-600 mb-4">
          Currency exchange rates fluctuate based on global markets, economic indicators, and geopolitical events. Rates shown here are for informational purposes only.
        </p>
      </div>
    </ConverterLayout>
  );
};

export default CurrencyConverter;
