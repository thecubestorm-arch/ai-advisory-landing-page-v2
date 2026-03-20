import { useState } from 'react';
import { QuizData } from './Quiz';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  data: QuizData;
  updateData: (data: Partial<QuizData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  multi?: boolean;
  hasOther?: boolean;
}

export default function Step2BestPractices({ data, updateData, onNext, onPrev }: Props) {
  const [showError, setShowError] = useState(false);

  const questions: Question[] = [
    { id: 'bp1', text: '1. Wie oft nutzt du oder dein Team AI-Tools im Arbeitsalltag?', options: ['Täglich', 'Wöchentlich', 'Selten', 'Nie'] },
    { id: 'bp2', text: '2. Für welche Kernbereiche nutzt ihr AI am meisten?', options: ['Texterstellung & Content', 'Datenanalyse & Reports', 'Programmierung & IT', 'Kundenservice', 'HR & Recruiting', 'Marketing', 'Sonstiges'], multi: true, hasOther: true },
    { id: 'bp3', text: '3. Habt ihr offizielle AI-Richtlinien (Compliance/Datenschutz) im Unternehmen?', options: ['Ja, klare Regeln', 'In Arbeit', 'Nein'] },
    { id: 'bp4', text: '4. Nutzt ihr kostenpflichtige AI-Versionen (z.B. ChatGPT Plus, Copilot)?', options: ['Ja, mehrere', 'Ja, eine', 'Nein'] },
    { id: 'bp5', text: '5. Wie oft schult ihr Mitarbeiter im Umgang mit AI?', options: ['Regelmässig', 'Einmalig', 'Nie'] },
    { id: 'bp6', text: '6. Sind AI-Funktionen in eure eigenen Produkte oder Services integriert?', options: ['Ja', 'Geplant', 'Nein'] },
    { id: 'bp7', text: '7. Messt ihr den ROI (Return on Investment) eurer AI-Initiativen?', options: ['Ja', 'Nein', 'Weiss nicht wie'] },
    { id: 'bp8', text: '8. Was ist eure grösste Sorge beim AI-Einsatz?', options: ['Datenschutz & Sicherheit', 'Halluzinationen & Fehler', 'Mitarbeiter-Widerstand', 'Keine Sorgen', 'Sonstiges'], hasOther: true },
    { id: 'bp9', text: '9. Wie hoch ist der Automatisierungsgrad eurer Standardprozesse durch AI?', options: ['Hoch', 'Mittel', 'Gering', 'Null'] },
    { id: 'bp10', text: '10. Wie stark unterstützt die Geschäftsführung AI-Initiativen?', options: ['Sehr stark', 'Mittel', 'Kaum/Gar nicht'] },
  ];

  const toggleMulti = (id: string, opt: string) => {
    const current = (data[id as keyof QuizData] as string[]) || [];
    const updated = current.includes(opt)
      ? current.filter(v => v !== opt)
      : [...current, opt];
    updateData({ [id]: updated });
    setShowError(false);
  };

  const isComplete = questions.every(q => {
    if (q.multi) {
      const val = data[q.id as keyof QuizData] as string[];
      if (!val || val.length === 0) return false;
      if (q.hasOther && val.includes('Sonstiges')) return !!(data[`${q.id}_other` as keyof QuizData] as string);
      return true;
    }
    const val = data[q.id as keyof QuizData] as string;
    if (!val) return false;
    if (q.hasOther && val === 'Sonstiges') return !!(data[`${q.id}_other` as keyof QuizData] as string);
    return true;
  });

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
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-leder-schwarz">AI Best Practices</h2>
        <p className="text-leder-schwarz/70 text-lg">Lass uns herausfinden, wie dein Unternehmen AI aktuell einsetzt.</p>
      </div>

      <div className="space-y-6">
        {questions.map(q => {
          const isMulti = !!q.multi;
          const multiVal = data[q.id as keyof QuizData] as string[];
          const singleVal = data[q.id as keyof QuizData] as string;
          const showOther = isMulti ? multiVal?.includes('Sonstiges') : singleVal === 'Sonstiges';

          return (
            <div key={q.id} className="p-6 md:p-8 bg-white border border-leder-schwarz/5 rounded-3xl shadow-sm">
              <label className="block text-lg font-bold text-leder-schwarz mb-2">{q.text}</label>
              {isMulti && <p className="text-sm text-leder-schwarz/50 mb-4">Mehrfachauswahl möglich</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map(opt => {
                  const selected = isMulti ? multiVal?.includes(opt) : singleVal === opt;
                  return (
                    <button
                      key={opt}
                      className={`p-4 rounded-xl border-2 text-left transition-all font-medium ${
                        selected
                          ? 'bg-alpine-gold border-alpine-gold text-leder-schwarz font-bold shadow-md'
                          : 'bg-cremeweiss border-leder-schwarz/10 text-leder-schwarz/70 hover:bg-leder-schwarz/5 hover:border-leder-schwarz/30'
                      }`}
                      onClick={() => {
                        if (isMulti) {
                          toggleMulti(q.id, opt);
                        } else {
                          updateData({ [q.id]: opt });
                          setShowError(false);
                        }
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {q.hasOther && showOther && (
                <input
                  type="text"
                  placeholder="Bitte spezifizieren..."
                  value={data[`${q.id}_other` as keyof QuizData] as string || ''}
                  onChange={e => updateData({ [`${q.id}_other`]: e.target.value })}
                  className="w-full mt-3 bg-cremeweiss border border-leder-schwarz/10 rounded-xl px-4 py-3 text-leder-schwarz focus:outline-none focus:border-alpine-gold focus:ring-1 focus:ring-alpine-gold"
                />
              )}
            </div>
          );
        })}

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
              Weiter zur Situation
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
