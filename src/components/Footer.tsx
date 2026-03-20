import Logo from './Logo';

interface Props {
  onOpenLegal: (type: 'impressum' | 'datenschutz') => void;
}

export default function Footer({ onOpenLegal }: Props) {
  return (
    <footer className="bg-leder-schwarz text-cremeweiss py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Logo variant="dark" />
            <p className="mt-6 text-cremeweiss/60 max-w-xs text-center md:text-left">
              Ihre Experten für strategische KI-Beratung und messbaren Unternehmenserfolg.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <button onClick={() => onOpenLegal('impressum')} className="text-cremeweiss/60 hover:text-alpine-gold transition-colors">Impressum</button>
            <button onClick={() => onOpenLegal('datenschutz')} className="text-cremeweiss/60 hover:text-alpine-gold transition-colors">Datenschutz</button>
            <a href="mailto:hello@alpineboost.ch" className="text-cremeweiss/60 hover:text-alpine-gold transition-colors">alpineboost.ch</a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-cremeweiss/10 text-center text-sm text-cremeweiss/40">
          &copy; {new Date().getFullYear()} alpine.boost. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
