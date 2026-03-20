import { useState } from 'react';
import { QuizData } from './Quiz';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  data: QuizData;
  updateData: (data: Partial<QuizData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3Situation({ data, updateData, onNext, onPrev }: Props) {
  const [showError, setShowError] = useState(false);
  const questions = [
    { id: 's1', text: '1. Was beschreibt deine aktuelle Situation am besten?', options: ['Student', '< 5 Jahre im Beruf', 'Führungskraft', 'Unternehmer/Gründer', 'Sonstiges'] },
    { id: 's2', text: '2. Welches Ziel möchtest du in den nächsten 90 Tagen erreichen?', options: ['10h/Woche automatisieren', 'AI-Produkt launchen', 'Team schulen', 'Kosten senken', 'Sonstiges'] },
    { id: 's3', text: '3. Was hält dich aktuell am meisten zurück?', options: ['Fehlende Zeit', 'Fehlendes Know-how', 'Budget', 'Datenschutz-Bedenken', 'Sonstiges'] },
    { id: 's4', text: '4. Welche Lösung würde dir am besten helfen?', options: ['Aus- & Weiterbildung', '1:1 Coaching', 'Software-Implementierung', 'Workshop', 'Sonstiges'] },
  ];

  const isComplete = data.s1 && data.s2 && data.s3 && data.s4 && 
    (data.s1 !== 'Sonstiges' || data.s1_other) &&
    (data.s2 !== 'Sonstiges' || data.s2_other) &&
    (data.s3 !== 'Sonstiges' || data.s3_other) &&
    (data.s4 !== 'Sonstiges' || data.s4_other);

  const handleNext = () => {
    if (isComplete) {
      setShowError(false);
      onNext();
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-leder-schwarz">Deine Situation & Ziele</h2>
        <p className="text-leder-schwarz/70 text-lg">Fast geschafft! Lass uns deine individuellen Ziele definieren.</p>
      </div>

      <div className="space-y-6">
        {questions.map(q => (
          <div key={q.id} className="p-6 md:p-8 bg-white border border-leder-schwarz/5 rounded-3xl shadow-sm">
            <label className="block text-lg font-bold text-leder-schwarz mb-6">{q.text}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {q.options.map(opt => (
                <button
                  key={opt}
                  className={`p-4 rounded-xl border-2 text-left transition-all font-medium ${
                    data[q.id as keyof QuizData] === opt 
                      ? 'bg-alpine-gold border-alpine-gold text-leder-schwarz font-bold shadow-md' 
                      : 'bg-cremeweiss border-leder-schwarz/10 text-leder-schwarz/70 hover:bg-leder-schwarz/5 hover:border-leder-schwarz/30'
                  }`}
                  onClick={() => {
                    updateData({ [q.id]: opt });
                    setShowError(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            {data[q.id as keyof QuizData] === 'Sonstiges' && (
              <input
                type="text"
                placeholder="Bitte spezifizieren..."
                value={data[`${q.id}_other` as keyof QuizData] as string || ''}
                onChange={e => updateData({ [`${q.id}_other`]: e.target.value })}
                className="w-full bg-cremeweiss border border-leder-schwarz/10 rounded-xl px-4 py-3 text-leder-schwarz focus:outline-none focus:border-alpine-gold focus:ring-1 focus:ring-alpine-gold mt-2"
              />
            )}
          </div>
        ))}

        <div className="p-6 md:p-8 bg-white border border-leder-schwarz/5 rounded-3xl shadow-sm">
          <label className="block text-lg font-bold text-leder-schwarz mb-4">5. Gibt es noch etwas, das wir über dich oder dein Business wissen sollten?</label>
          <textarea
            value={data.s5}
            onChange={e => updateData({ s5: e.target.value })}
            rows={4}
            className="w-full bg-cremeweiss border border-leder-schwarz/10 rounded-xl px-4 py-3 text-leder-schwarz focus:outline-none focus:border-alpine-gold focus:ring-1 focus:ring-alpine-gold"
            placeholder="Deine Anmerkungen..."
          />
        </div>

        <div className="flex flex-col gap-4 pt-8">
          {showError && (
            <div className="text-red-500 font-medium text-center bg-red-50 p-3 rounded-xl border border-red-100">
              Bitte beantworte alle Fragen, um fortzufahren.
            </div>
          )}
          <div className="flex gap-4">
            <button 
              onClick={onPrev}
              className="px-6 py-4 text-leder-schwarz/60 hover:text-leder-schwarz bg-white border border-leder-schwarz/10 hover:bg-leder-schwarz/5 rounded-xl transition-all flex items-center font-bold"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Zurück
            </button>
            <button 
              onClick={handleNext}
              className="flex-1 flex items-center justify-center px-8 py-4 text-lg font-bold text-cremeweiss rounded-xl transition-all shadow-lg bg-leder-schwarz hover:bg-leder-schwarz/90"
            >
              Ergebnisse generieren
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
