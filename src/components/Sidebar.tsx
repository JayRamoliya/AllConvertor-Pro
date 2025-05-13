
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Ruler, Square, Box, Scale, Thermometer, CircleDollarSign, 
  Search, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
    icon: Ruler,
    children: [
      { title: "Length", path: "/unit-converters/length", icon: Ruler },
      { title: "Area", path: "/unit-converters/area", icon: Square },
      { title: "Volume", path: "/unit-converters/volume", icon: Box },
      { title: "Weight", path: "/unit-converters/weight", icon: Scale },
      { title: "Temperature", path: "/unit-converters/temperature", icon: Thermometer },
    ],
  },
  {
    title: "Finance",
    path: "/finance-calculators",
    icon: CircleDollarSign,
    children: [
      { title: "Currency", path: "/finance-calculators/currency", icon: CircleDollarSign },
    ],
  },
  {
    title: "Utilities",
    path: "/utility-tools",
    icon: Scale,
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
          "fixed top-16 bottom-0 left-0 z-30 w-64 bg-white border-r shadow-sm transition-transform duration-300 md:translate-x-0 md:z-0 dark:bg-gray-800 dark:border-gray-700",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-end p-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100%-3rem)] py-4">
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
                        ? "bg-converter-light text-converter-primary dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
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
                              ? "bg-converter-light text-converter-primary font-medium dark:bg-gray-700 dark:text-white"
                              : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
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
