import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenQuiz?: () => void;
}

export default function Hero({ onOpenQuiz }: Props) {
  return (
    <section className="relative overflow-hidden bg-cremeweiss pt-32 pb-20 text-leder-schwarz flex-grow flex flex-col justify-center">
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-leder-schwarz">
          Die Gewinner von morgen arbeiten nicht härter – sie arbeiten mit KI.
        </h1>
        <p className="text-xl md:text-2xl text-leder-schwarz/70 mb-10 max-w-3xl mx-auto font-medium">
          Mach das kostenlose 3-Minuten-Assessment und sieh sofort, wo dein Team täglich Zeit verschwendet – und wie du das mit KI änderst.
        </p>

        <div className="flex flex-col items-center md:items-start gap-4 mb-6 text-left max-w-md mx-auto">
          <div className="flex items-center gap-3 text-leder-schwarz/80 font-medium text-lg">
            <CheckCircle2 className="w-6 h-6 text-alpine-gold shrink-0" />
            <span>Erkenne, welche Aufgaben bei euch 40% der Zeit fressen</span>
          </div>
          <div className="flex items-center gap-3 text-leder-schwarz/80 font-medium text-lg">
            <CheckCircle2 className="w-6 h-6 text-alpine-gold shrink-0" />
            <span>Sieh konkret, wo ChatGPT & Claude sofort helfen können</span>
          </div>
          <div className="flex items-center gap-3 text-leder-schwarz/80 font-medium text-lg">
            <CheckCircle2 className="w-6 h-6 text-alpine-gold shrink-0" />
            <span>Bekomm einen klaren ersten Schritt – kein Buzzword-Bingo</span>
          </div>
        </div>

        <p className="text-sm text-leder-schwarz/50 mb-8">
          Bereits 100+ KMUs aus Operations, HR und Admin haben ihr KI-Potenzial entdeckt.
        </p>

        <button
          onClick={onOpenQuiz}
          className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-cremeweiss bg-alpine-gold rounded-xl hover:bg-alpine-gold/90 transition-all hover:scale-105 shadow-xl"
        >
          Mein KI-Potenzial entdecken
          <ArrowRight className="ml-3 w-6 h-6" />
        </button>
        <p className="mt-4 text-sm text-leder-schwarz/40">Kostenlos · Kein Anmelden · Dauert 3 Minuten</p>
      </div>
    </section>
  );
}
