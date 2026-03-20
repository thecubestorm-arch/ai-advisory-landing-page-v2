import { useState, useEffect } from 'react';

const COOKIE_KEY = 'buetikofer_cookie_consent';

type ConsentChoice = 'accepted' | 'declined';

interface Props {
  onOpenDatenschutz: () => void;
}

export default function CookieBanner({ onOpenDatenschutz }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_KEY, 'accepted' satisfies ConsentChoice);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(COOKIE_KEY, 'declined' satisfies ConsentChoice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-[70] bg-leder-schwarz text-cremeweiss px-4 py-5 md:py-6 shadow-2xl"
    >
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <p className="text-sm leading-relaxed text-cremeweiss/80 flex-1">
          Diese Website verwendet Cookies, um die Nutzererfahrung zu verbessern. Notwendige Cookies sind immer aktiv. Weitere Informationen finden Sie in unserer{' '}
          <button
            onClick={onOpenDatenschutz}
            className="underline underline-offset-2 hover:text-alpine-gold transition-colors"
          >
            Datenschutzerklärung
          </button>
          .
        </p>
        <div className="flex gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium border border-cremeweiss/20 text-cremeweiss/60 hover:text-cremeweiss hover:border-cremeweiss/40 rounded-lg transition-colors"
          >
            Nur notwendige
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-5 py-2 text-sm font-medium bg-alpine-gold text-leder-schwarz hover:bg-alpine-gold/90 rounded-lg transition-colors"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
