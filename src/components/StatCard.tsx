import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient?: boolean;
}

const StatCard = ({ title, value, icon: Icon, gradient }: StatCardProps) => {
  return (
    <Card className={`p-6 hover:shadow-md transition-all hover:-translate-y-1 ${gradient ? 'bg-gradient-card' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
