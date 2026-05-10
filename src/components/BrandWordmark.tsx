type BrandWordmarkProps = {
  compact?: boolean;
  className?: string;
};

const BrandWordmark = ({ compact = false, className = "" }: BrandWordmarkProps) => {
  const sizeClass = compact ? "h-[150px] w-[150px]" : "h-[150px] w-[150px]";

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/louies-logo.png"
        alt="Louies logo"
        className={`${sizeClass} object-contain`}
      />
    </div>
  );
};

export default BrandWordmark;
