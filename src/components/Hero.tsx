import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenQuiz?: () => void;
}

export default function Hero({ onOpenQuiz }: Props) {
  return (
    <section className="relative overflow-hidden bg-cremeweiss pt-32 pb-20 text-leder-schwarz flex-grow flex flex-col justify-center">
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-leder-schwarz">
          Finde heraus, wie gut dein Unternehmen bereits KI nutzt
        </h1>
        <p className="text-xl md:text-2xl text-leder-schwarz/70 mb-10 max-w-3xl mx-auto font-medium">
          Mache das kurze KI-Assessment und entdecke deinen aktuellen Reifegrad, zentrale Lücken und wo Automatisierung oder KI den grössten Business-Impact erzielen können.
        </p>
        
        <div className="flex flex-col items-center md:items-start gap-4 mb-12 text-left max-w-md mx-auto">
          <div className="flex items-center gap-3 text-leder-schwarz/80 font-medium text-lg">
            <CheckCircle2 className="w-6 h-6 text-alpine-gold shrink-0" />
            <span>Erkenne deinen aktuellen KI-Reifegrad</span>
          </div>
          <div className="flex items-center gap-3 text-leder-schwarz/80 font-medium text-lg">
            <CheckCircle2 className="w-6 h-6 text-alpine-gold shrink-0" />
            <span>Identifiziere zentrale Lücken & Potenziale</span>
          </div>
          <div className="flex items-center gap-3 text-leder-schwarz/80 font-medium text-lg">
            <CheckCircle2 className="w-6 h-6 text-alpine-gold shrink-0" />
            <span>Finde die grössten Hebel für Automatisierung</span>
          </div>
        </div>

        <button 
          onClick={onOpenQuiz}
          className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-cremeweiss bg-alpine-gold rounded-xl hover:bg-alpine-gold/90 transition-all hover:scale-105 shadow-xl"
        >
          KI-Assessment starten
          <ArrowRight className="ml-3 w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
