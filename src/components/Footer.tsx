import Logo from './Logo';

interface Props {
  onOpenLegal: (type: 'impressum' | 'datenschutz') => void;
}

export default function Footer({ onOpenLegal }: Props) {
  return (
    <footer className="bg-leder-schwarz text-cremeweiss py-5">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <Logo variant="dark" />
        <div className="flex gap-6 text-sm font-medium">
          <button onClick={() => onOpenLegal('impressum')} className="text-cremeweiss/50 hover:text-alpine-gold transition-colors">Impressum</button>
          <button onClick={() => onOpenLegal('datenschutz')} className="text-cremeweiss/50 hover:text-alpine-gold transition-colors">Datenschutz</button>
          <a href="mailto:hi@raiku.ch" className="text-cremeweiss/50 hover:text-alpine-gold transition-colors">hi@raiku.ch</a>
        </div>
        <span className="text-xs text-cremeweiss/30">&copy; {new Date().getFullYear()} Buetikofer Digital</span>
      </div>
    </footer>
  );
}
