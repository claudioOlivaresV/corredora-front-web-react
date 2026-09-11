interface KpiCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
}
export const UserKpiCards = ({ label, value, icon: Icon }: KpiCardProps) => {
  return (
    <div className="relative flex h-44 flex-col justify-between overflow-hidden rounded bg-surface-container-lowest p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
          {label}
        </span>

        <Icon size={20} className="text-outline" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-display tracking-tight text-obsidian">
          {value}
        </span>
      </div>
    </div>
  );
};
