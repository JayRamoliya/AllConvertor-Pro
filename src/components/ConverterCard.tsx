
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ConverterCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
}

const ConverterCard = ({
  title,
  description,
  icon,
  to,
  className,
}: ConverterCardProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "group flex flex-col items-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-converter-primary/20",
        className
      )}
    >
      <div className="mb-4 p-3 bg-converter-light rounded-full text-converter-primary group-hover:bg-converter-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 text-center">{description}</p>}
    </Link>
  );
};

export default ConverterCard;
