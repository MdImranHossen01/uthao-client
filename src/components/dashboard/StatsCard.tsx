import { LucideIcon } from "lucide-react";
// No longer need ReactNode, so we remove it from the import

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  helperText?: string;
  className?: string;
};

export default function StatsCard({ title, value, icon: Icon, className }: StatsCardProps) {
  return (
    <div className={`card bg-base-100 shadow-md ${className}`}>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-base-content/70">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="p-3 bg-primary/20 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}