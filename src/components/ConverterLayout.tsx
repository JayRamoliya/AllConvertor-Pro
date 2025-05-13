
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ConverterLayoutProps {
  title: string;
  description?: string;
  backLink?: string;
  backLabel?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ConverterLayout = ({
  title,
  description,
  backLink,
  backLabel = "Back",
  icon,
  children,
  className,
}: ConverterLayoutProps) => {
  return (
    <div className="animate-fade-in">
      {backLink && (
        <Link
          to={backLink}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {backLabel}
        </Link>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {icon && (
            <div className="p-2 bg-converter-light rounded-md text-converter-primary">
              {icon}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        {description && <p className="text-gray-500 max-w-3xl">{description}</p>}
      </header>

      <div className={cn("max-w-4xl", className)}>{children}</div>
    </div>
  );
};

export default ConverterLayout;
