export const StatCard = ({
  icon,
  value,
  label,
  valueClass = "",
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  valueClass?: string;
}) => {
  return (
    <div className="group rounded-xl border border-border bg-muted/40 dark:bg-sidebar/30 
      backdrop-blur-sm p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300">
      
      {/* Icon Bubble */}
      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center
        group-hover:scale-105 transition">
        {icon}
      </div>

      {/* Number */}
      <p className={`font-display text-2xl font-bold tracking-tight ${valueClass}`}>
        {value}
      </p>

      {/* Label */}
      <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
};
