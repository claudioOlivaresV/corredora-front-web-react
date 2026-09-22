import { Plus, type LucideIcon } from "lucide-react";

interface HeaderSectionProps {
  label: string;
  title: string;
  subtitle: string;
  textButton: string;
  iconButton?: LucideIcon;
  onCreate: () => void;
}

export const HeaderSection = ({
  label,
  title,
  subtitle,
  textButton,
  iconButton: Icon = Plus,
  onCreate,
}: HeaderSectionProps) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-copper">
          {label}
        </span>

        <h1 className="font-headline-md text-headline-md text-obsidian">
          {title}
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCreate}
          className="cursor-pointer flex items-center gap-2 rounded bg-copper px-5 py-3 font-label-caps text-label-caps uppercase tracking-wider text-on-primary transition-colors hover:bg-jasper"
        >
          <Icon size={17} />
          {textButton}
        </button>
      </div>
    </div>
  );
};
