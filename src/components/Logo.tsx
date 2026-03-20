interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "", variant = 'light' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-leder-schwarz' : 'text-cremeweiss';
  const subTextColor = variant === 'light' ? 'text-leder-schwarz/60' : 'text-cremeweiss/60';
  
  return (
    <div className={`flex flex-col items-center md:items-start ${className}`}>
      <div className="flex items-center gap-3">
        <svg width="22" height="32" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="4"  y1="6"  x2="24" y2="6"  stroke="#C8A96E" strokeWidth="2" strokeLinecap="square"/>
          <line x1="0"  y1="20" x2="28" y2="20" stroke="#C8A96E" strokeWidth="2" strokeLinecap="square"/>
          <line x1="6"  y1="34" x2="22" y2="34" stroke="#C8A96E" strokeWidth="2" strokeLinecap="square"/>
          <line x1="14" y1="6"  x2="14" y2="34" stroke="#C8A96E" strokeWidth="1" strokeLinecap="square"/>
        </svg>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-extrabold italic tracking-tight ${textColor}`}>Raiku</span>
          <span className="w-1.5 h-1.5 rounded-full bg-alpine-gold mb-1 shrink-0" />
        </div>
      </div>
      <div className={`text-[0.6rem] tracking-[0.2em] uppercase ${subTextColor} mt-1 ml-10 font-semibold`}>
        KI-Beratung & Expertise
      </div>
    </div>
  );
}
