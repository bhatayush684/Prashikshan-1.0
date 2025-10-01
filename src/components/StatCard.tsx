import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient?: boolean;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, gradient, trend }: StatCardProps) => {
  return (
    <Card className={`p-6 hover-lift cursor-pointer ${gradient ? 'card-gradient' : ''} group`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <p className="text-4xl font-bold text-foreground mb-1">{value}</p>
          {trend && (
            <p className={`text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-all">
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
