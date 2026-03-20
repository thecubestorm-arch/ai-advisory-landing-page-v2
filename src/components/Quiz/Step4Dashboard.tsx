import { QuizData } from './Quiz';
import { Calendar, Lightbulb, Target, Zap, AlertTriangle, CheckCircle2, Mail, Phone } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  data: QuizData;
}

export default function Step4Dashboard({ data }: Props) {
  // Calculate Scores
  const calcScore = (answers: string[], good: string[], medium: string[]) => {
    let score = 0;
    answers.forEach(a => {
      if (good.includes(a)) score += 100;
      else if (medium.includes(a)) score += 50;
    });
    return Math.round(score / answers.length);
  };

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

  const chartData = [
    { subject: 'Strategie', A: strategyScore, fullMark: 100 },
    { subject: 'Ausführung', A: executionScore, fullMark: 100 },
    { subject: 'Kultur', A: cultureScore, fullMark: 100 },
  ];

  const getInsights = () => {
    const insights = [];
    
    if (data.bp3 === 'Nein') {
      insights.push({ icon: <AlertTriangle className="text-alpine-gold" />, title: "Schatten-IT Risiko", text: "Ohne klare Richtlinien nutzen Mitarbeiter AI auf eigene Faust. Erstelle zeitnah eine AI-Policy, um Datenlecks zu vermeiden." });
    } else {
      insights.push({ icon: <CheckCircle2 className="text-alpine-gold" />, title: "Sicheres Fundament", text: "Eure Richtlinien schützen das Unternehmen. Jetzt gilt es, die Nutzung aktiv zu fördern." });
    }

    if (data.bp5 === 'Nie') {
      insights.push({ icon: <Lightbulb className="text-alpine-gold" />, title: "Team-Enablement fehlt", text: "Tools allein bringen keinen ROI. Investiere in Prompt-Engineering-Schulungen für dein Team." });
    } else {
      insights.push({ icon: <Zap className="text-alpine-gold" />, title: "Starke Lernkultur", text: "Regelmässiges Training sichert euren Wettbewerbsvorteil in einer sich schnell wandelnden AI-Welt." });
    }

    if (data.s3 === 'Fehlende Zeit') {
      insights.push({ icon: <Target className="text-alpine-gold" />, title: "Zeit-Paradoxon lösen", text: "Starte mit kleinen Automatisierungen (z.B. E-Mail-Triage), um sofort Zeit für strategische AI-Projekte freizuschaufeln." });
    } else if (data.s3 === 'Fehlendes Know-how') {
      insights.push({ icon: <Target className="text-alpine-gold" />, title: "Wissenslücke schliessen", text: "Nutze externe Expertise, um teure Anfängerfehler zu vermeiden und direkt Best Practices zu implementieren." });
    } else {
      insights.push({ icon: <Target className="text-alpine-gold" />, title: "Fokus auf Umsetzung", text: `Dein Ziel "${data.s2}" ist greifbar. Wir müssen nur die Hürde "${data.s3}" systematisch abbauen.` });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 max-w-6xl mx-auto text-leder-schwarz">
      {/* Big Reveal */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-leder-schwarz tracking-tight">
          Dein AI-Readiness Report
        </h2>
        <p className="text-xl text-leder-schwarz/70 max-w-2xl mx-auto font-medium">
          Basierend auf deinen Antworten haben wir dein Unternehmensprofil analysiert. Hier ist dein Status Quo.
        </p>
      </div>

      {/* Score Cards & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white border border-leder-schwarz/5 shadow-sm rounded-3xl p-8 md:p-12 flex flex-col justify-center items-center text-center">
          <div className="text-sm text-leder-schwarz/50 uppercase tracking-[0.2em] font-bold mb-4">Gesamt-Score</div>
          <div className="text-8xl md:text-9xl font-extrabold text-alpine-gold mb-6 leading-none">{totalScore}</div>
          <p className="text-leder-schwarz/70 max-w-sm">
            Dein Unternehmen befindet sich im {totalScore > 70 ? 'oberen' : totalScore > 40 ? 'mittleren' : 'unteren'} Drittel der AI-Readiness.
          </p>
        </div>
        
        <div className="bg-white border border-leder-schwarz/5 shadow-sm rounded-3xl p-8 flex flex-col justify-center items-center h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#1A1714" strokeOpacity={0.1} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#1A1714', fontSize: 14, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="A" stroke="#C8A96E" strokeWidth={3} fill="#C8A96E" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <h3 className="text-3xl font-bold mb-8 text-center text-leder-schwarz">Deine 3 Kern-Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white border border-leder-schwarz/5 shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-alpine-gold/10 rounded-2xl flex items-center justify-center mb-6">
              {insight.icon}
            </div>
            <h4 className="text-xl font-bold mb-4 text-leder-schwarz">{insight.title}</h4>
            <p className="text-leder-schwarz/70 leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>

      {/* Next Steps & CTA */}
      <div className="bg-leder-schwarz text-cremeweiss rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-alpine-gold" />
        <h3 className="text-3xl md:text-4xl font-bold mb-6">Dein nächster Schritt</h3>
        <p className="text-xl text-cremeweiss/70 mb-10 max-w-3xl mx-auto font-medium">
          Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Ziel (<strong className="text-alpine-gold">{data.s2 === 'Sonstiges' ? data.s2_other : data.s2}</strong>) durch gezielte <strong className="text-alpine-gold">{data.s4 === 'Sonstiges' ? data.s4_other : data.s4}</strong> strategisch und effizient erreichen können.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); alert('Calendly öffnet sich'); }}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-leder-schwarz bg-alpine-gold rounded-full hover:bg-alpine-gold/90 transition-all hover:scale-105 shadow-xl w-full sm:w-auto"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Kostenloses Erstgespräch buchen
          </a>
        </div>
        
        <div className="mt-12 pt-8 border-t border-cremeweiss/10 flex flex-col sm:flex-row justify-center items-center gap-8 text-cremeweiss/50 font-medium">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            hello@alpineboost.ch
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            +41 79 123 45 67
          </div>
        </div>
      </div>
    </div>
  );
}
