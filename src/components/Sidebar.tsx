
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Length, Area, Volume, Weight, Temperature, Currency, 
  Percent, Ratio, Electric, Torque, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Category type for our navigation items
interface Category {
  title: string;
  path: string;
  icon: React.ElementType;
  children?: Array<{
    title: string;
    path: string;
    icon?: React.ElementType;
  }>;
}

const categories: Category[] = [
  {
    title: "Unit Converters",
    path: "/unit-converters",
    icon: Length,
    children: [
      { title: "Length", path: "/unit-converters/length", icon: Length },
      { title: "Area", path: "/unit-converters/area", icon: Area },
      { title: "Volume", path: "/unit-converters/volume", icon: Volume },
      { title: "Weight", path: "/unit-converters/weight", icon: Weight },
      { title: "Temperature", path: "/unit-converters/temperature", icon: Temperature },
    ],
  },
  {
    title: "Math Converters",
    path: "/math-converters",
    icon: Percent,
    children: [
      { title: "Number Base", path: "/math-converters/number-base" },
      { title: "Roman Numeral", path: "/math-converters/roman-numeral" },
      { title: "Fractions", path: "/math-converters/fractions" },
      { title: "Percentage", path: "/math-converters/percentage" },
      { title: "Ratio", path: "/math-converters/ratio", icon: Ratio },
    ],
  },
  {
    title: "Engineering",
    path: "/engineering-converters",
    icon: Electric,
    children: [
      { title: "Torque", path: "/engineering-converters/torque", icon: Torque },
      { title: "Electric", path: "/engineering-converters/electric", icon: Electric },
    ],
  },
  {
    title: "Finance",
    path: "/finance-calculators",
    icon: Currency,
    children: [
      { title: "Currency", path: "/finance-calculators/currency", icon: Currency },
      { title: "Loan Calculator", path: "/finance-calculators/loan" },
    ],
  },
  {
    title: "Utilities",
    path: "/utility-tools",
    icon: Weight,
    children: [
      { title: "BMI Calculator", path: "/utility-tools/bmi-calculator" },
      { title: "Age Calculator", path: "/utility-tools/age-calculator" },
    ],
  },
  { title: "All Tools", path: "/directory", icon: Search },
  { title: "Feedback", path: "/feedback", icon: Search },
];

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-30 w-64 bg-white border-r shadow-sm transition-transform md:translate-x-0 md:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full py-4">
          <div className="px-4 space-y-4">
            {categories.map((category) => (
              <div key={category.title} className="space-y-2">
                <NavLink
                  to={category.path}
                  end={category.children ? true : undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-converter-light text-converter-primary"
                        : "text-gray-500 hover:bg-gray-100"
                    )
                  }
                  onClick={() => setOpen(false)}
                >
                  {category.icon && (
                    <category.icon className="h-4 w-4" />
                  )}
                  {category.title}
                </NavLink>

                {category.children && (
                  <div className="pl-4 space-y-1">
                    {category.children.map((subItem) => (
                      <NavLink
                        key={subItem.title}
                        to={subItem.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors",
                            isActive
                              ? "bg-converter-light text-converter-primary font-medium"
                              : "text-gray-500 hover:bg-gray-100"
                          )
                        }
                        onClick={() => setOpen(false)}
                      >
                        {subItem.icon && (
                          <subItem.icon className="h-3 w-3" />
                        )}
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                )}

                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
