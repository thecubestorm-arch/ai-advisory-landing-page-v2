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
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-alpine-gold">
          <path d="M12 36L24 16L36 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 36L24 22L32 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 36L24 28L28 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="12" r="3" fill="currentColor"/>
        </svg>
        <div className={`text-2xl font-extrabold tracking-tight ${textColor}`}>
          alpine<span className="text-alpine-gold">.</span>boost
        </div>
      </div>
      <div className={`text-[0.6rem] tracking-[0.2em] uppercase ${subTextColor} mt-1 ml-11 font-semibold`}>
        KI-Beratung & Expertise
      </div>
    </div>
  );
}
