import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Step1Contact from './Step1Contact';
import Step2BestPractices from './Step2BestPractices';
import Step3Situation from './Step3Situation';
import Step4Dashboard from './Step4Dashboard';

export interface QuizData {
  name: string;
  email: string;
  phone: string;
  bp1: string;
  bp2: string[]; bp2_other: string;
  bp3: string; bp4: string; bp5: string;
  bp6: string; bp7: string;
  bp8: string; bp8_other: string;
  bp9: string; bp10: string;
  s1: string; s1_other: string;
  s2: string; s2_other: string;
  s3: string; s3_other: string;
  s4: string; s4_other: string;
  s5: string;
}

const initialData: QuizData = {
  name: '', email: '', phone: '',
  bp1: '',
  bp2: [], bp2_other: '',
  bp3: '', bp4: '', bp5: '',
  bp6: '', bp7: '',
  bp8: '', bp8_other: '',
  bp9: '', bp10: '',
  s1: '', s1_other: '', s2: '', s2_other: '', s3: '', s3_other: '', s4: '', s4_other: '', s5: ''
};

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

function calcScore(answers: string[], good: string[], medium: string[]) {
  if (!answers.length) return 0;
  let score = 0;
  answers.forEach(a => {
    if (good.includes(a)) score += 100;
    else if (medium.includes(a)) score += 50;
  });
  return Math.round(score / answers.length);
}

function buildResults(data: QuizData) {
  const strategyScore = calcScore(
    [data.bp3, data.bp6, data.bp7, data.bp10],
    ['Ja, klare Regeln', 'Ja', 'Sehr stark'],
    ['In Arbeit', 'Geplant', 'Mittel']
  );
  const executionScore = calcScore(
    [data.bp1, data.bp4, data.bp9],
    ['Täglich', 'Ja, mehrere', 'Hoch'],
    ['Wöchentlich', 'Ja, eine', 'Mittel']
  );
  const cultureScore = calcScore(
    [data.bp5, data.bp8],
    ['Regelmässig', 'Keine Sorgen'],
    ['Einmalig', 'Mitarbeiter-Widerstand']
  );
  const totalScore = Math.round((strategyScore + executionScore + cultureScore) / 3);
  const tier = totalScore > 70 ? 'Oberes Drittel' : totalScore > 40 ? 'Mittleres Drittel' : 'Unteres Drittel';

  const insights: { title: string; text: string }[] = [];

  if (data.bp3 === 'Nein') {
    insights.push({ title: 'Schatten-IT Risiko', text: 'Ohne klare Richtlinien nutzen Mitarbeiter AI auf eigene Faust. Erstelle zeitnah eine AI-Policy, um Datenlecks zu vermeiden.' });
  } else {
    insights.push({ title: 'Sicheres Fundament', text: 'Eure Richtlinien schützen das Unternehmen. Jetzt gilt es, die Nutzung aktiv zu fördern.' });
  }

  if (data.bp5 === 'Nie') {
    insights.push({ title: 'Team-Enablement fehlt', text: 'Tools allein bringen keinen ROI. Investiere in Prompt-Engineering-Schulungen für dein Team.' });
  } else {
    insights.push({ title: 'Starke Lernkultur', text: 'Regelmässiges Training sichert euren Wettbewerbsvorteil in einer sich schnell wandelnden AI-Welt.' });
  }

  if (data.s3 === 'Fehlende Zeit') {
    insights.push({ title: 'Zeit-Paradoxon lösen', text: 'Starte mit kleinen Automatisierungen (z.B. E-Mail-Triage), um sofort Zeit für strategische AI-Projekte freizuschaufeln.' });
  } else if (data.s3 === 'Fehlendes Know-how') {
    insights.push({ title: 'Wissenslücke schliessen', text: 'Nutze externe Expertise, um teure Anfängerfehler zu vermeiden und direkt Best Practices zu implementieren.' });
  } else {
    const ziel = data.s2 === 'Sonstiges' ? data.s2_other : data.s2;
    const huerden = data.s3 === 'Sonstiges' ? data.s3_other : data.s3;
    insights.push({ title: 'Fokus auf Umsetzung', text: `Dein Ziel "${ziel}" ist greifbar. Wir müssen nur die Hürde "${huerden}" systematisch abbauen.` });
  }

  return { strategyScore, executionScore, cultureScore, totalScore, tier, insights };
}

export default function Quiz({ isOpen, onClose }: QuizProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>(initialData);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const updateData = (fields: Partial<QuizData>) => setData(prev => ({ ...prev, ...fields }));
  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => prev - 1);
  };

  const handleComplete = () => {
    const results = buildResults(data);

    fetch('https://n8n.srv1019856.hstgr.cloud/webhook/c00631d6-504a-45db-9962-65738d78887e', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kontakt: {
          name: data.name,
          email: data.email,
          telefon: data.phone,
        },
        best_practices: {
          bp1_haeufigkeit: data.bp1,
          bp2_kernbereiche: data.bp2,
          bp2_sonstiges: data.bp2_other,
          bp3_richtlinien: data.bp3,
          bp4_bezahlte_tools: data.bp4,
          bp5_schulungen: data.bp5,
          bp6_produkt_integration: data.bp6,
          bp7_roi_messung: data.bp7,
          bp8_groesste_sorge: data.bp8,
          bp8_sonstiges: data.bp8_other,
          bp9_automatisierungsgrad: data.bp9,
          bp10_geschaeftsfuehrung: data.bp10,
        },
        situation: {
          s1_rolle: data.s1 === 'Sonstiges' ? data.s1_other : data.s1,
          s2_ziel: data.s2 === 'Sonstiges' ? data.s2_other : data.s2,
          s3_huerden: data.s3 === 'Sonstiges' ? data.s3_other : data.s3,
          s4_loesung: data.s4 === 'Sonstiges' ? data.s4_other : data.s4,
          s5_anmerkungen: data.s5,
        },
        ergebnisse: {
          gesamt_score: results.totalScore,
          tier: results.tier,
          strategie_score: results.strategyScore,
          ausfuehrung_score: results.executionScore,
          kultur_score: results.cultureScore,
          insights: results.insights,
        },
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});

    nextStep();
  };

  return (
    <div className="fixed inset-0 z-50 bg-cremeweiss overflow-y-auto">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-8 md:right-8 p-3 text-leder-schwarz/50 hover:text-leder-schwarz bg-leder-schwarz/5 hover:bg-leder-schwarz/10 rounded-full transition-colors z-[60]"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="min-h-screen container mx-auto px-4 py-12 md:py-20 relative">
        {step < 4 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between text-sm text-leder-schwarz/60 mb-3 font-semibold uppercase tracking-wider">
              <span>Schritt {step} von 3</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-leder-schwarz/10 rounded-full h-1.5">
              <div
                className="bg-alpine-gold h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {step === 1 && <Step1Contact data={data} updateData={updateData} onNext={nextStep} />}
        {step === 2 && <Step2BestPractices data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
        {step === 3 && <Step3Situation data={data} updateData={updateData} onNext={handleComplete} onPrev={prevStep} />}
        {step === 4 && <Step4Dashboard data={data} />}
      </div>
    </div>
  );
}
