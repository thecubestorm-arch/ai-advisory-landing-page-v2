import { Brain, TrendingUp, Building2 } from 'lucide-react';

export default function Benefits() {
  return (
    <section className="py-24 bg-white text-leder-schwarz border-t border-leder-schwarz/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-alpine-gold/10 rounded-full flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-alpine-gold" />
            </div>
            <h3 className="text-xl font-bold mb-3">Kein IT-Studium nötig</h3>
            <p className="text-leder-schwarz/70">Praxistools, die sofort einsetzbar sind. Wir übersetzen Tech-Jargon in Business-Value.</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-alpine-gold/10 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-alpine-gold" />
            </div>
            <h3 className="text-xl font-bold mb-3">ROI in Wochen, nicht Jahren</h3>
            <p className="text-leder-schwarz/70">Messbare Zeitersparnis ab Tag 1. Wir fokussieren uns auf Quick Wins mit maximalem Hebel.</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-alpine-gold/10 rounded-full flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8 text-alpine-gold" />
            </div>
            <h3 className="text-xl font-bold mb-3">Für echte Unternehmen</h3>
            <p className="text-leder-schwarz/70">Kein Startup-Hype, sondern Substanz. Lösungen, die im echten Mittelstands-Alltag funktionieren.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
