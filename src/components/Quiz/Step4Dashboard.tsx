import { jsPDF } from 'jspdf';
import { QuizData } from './Quiz';
import { Calendar, Lightbulb, Target, Zap, AlertTriangle, CheckCircle2, Mail, Download, TrendingUp } from 'lucide-react';
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
      const ziel = data.s2 === 'Sonstiges' ? data.s2_other : data.s2;
      const huerden = data.s3 === 'Sonstiges' ? data.s3_other : data.s3;
      insights.push({ icon: <Target className="text-alpine-gold" />, title: "Fokus auf Umsetzung", text: `Dein Ziel "${ziel}" ist greifbar. Wir müssen nur die Hürde "${huerden}" systematisch abbauen.` });
    }

    return insights;
  };

  const insights = getInsights();

  // Text-only insights for PDF (no JSX icons)
  const insightTexts = insights.map(({ title, text }) => ({ title, text }));

  const downloadReport = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const gold = [200, 169, 110] as [number, number, number];
    const dark = [26, 23, 20] as [number, number, number];
    const grey = [120, 113, 108] as [number, number, number];
    const pageW = 210;
    const margin = 20;
    let y = 0;

    // Header bar
    doc.setFillColor(...gold);
    doc.rect(0, 0, pageW, 18, 'F');
    doc.setFontSize(11);
    doc.setTextColor(26, 23, 20);
    doc.setFont('helvetica', 'bold');
    doc.text('RAIKU', margin, 12);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Readiness Report', pageW / 2, 12, { align: 'center' });
    doc.text(new Date().toLocaleDateString('de-CH'), pageW - margin, 12, { align: 'right' });

    y = 36;

    // Title
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Dein AI-Readiness Report', margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grey);
    doc.text(`Erstellt für: ${data.name}  |  ${data.email}`, margin, y);
    y += 16;

    // Divider
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 12;

    // Score section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Scores', margin, y);
    y += 10;

    const scores = [
      { label: 'Gesamt-Score', value: totalScore },
      { label: 'Strategie', value: strategyScore },
      { label: 'Ausführung', value: executionScore },
      { label: 'Kultur', value: cultureScore },
    ];

    scores.forEach(({ label, value }) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grey);
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...gold);
      doc.text(`${value} / 100`, margin + 60, y);
      // Bar background
      doc.setFillColor(230, 225, 215);
      doc.roundedRect(margin + 90, y - 5, 80, 6, 2, 2, 'F');
      // Bar fill
      doc.setFillColor(...gold);
      doc.roundedRect(margin + 90, y - 5, (value / 100) * 80, 6, 2, 2, 'F');
      y += 12;
    });

    y += 6;
    doc.setDrawColor(230, 225, 215);
    doc.line(margin, y, pageW - margin, y);
    y += 12;

    // Insights
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Deine 3 Kern-Insights', margin, y);
    y += 10;

    insightTexts.forEach(({ title, text }) => {
      doc.setFillColor(...gold);
      doc.circle(margin + 1.5, y - 2, 1.5, 'F');
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...dark);
      doc.text(title, margin + 6, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grey);
      const lines = doc.splitTextToSize(text, pageW - margin * 2 - 6);
      doc.text(lines, margin + 6, y);
      y += lines.length * 6 + 6;
    });

    y += 2;
    doc.setDrawColor(230, 225, 215);
    doc.line(margin, y, pageW - margin, y);
    y += 12;

    // Footer CTA
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Ihr nächster Schritt', margin, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...grey);
    const ctaText = `Buchen Sie jetzt Ihr kostenloses Erstgespräch und erfahren Sie, wie wir Ihr Ziel "${data.s2 === 'Sonstiges' ? data.s2_other : data.s2}" gemeinsam erreichen.`;
    const ctaLines = doc.splitTextToSize(ctaText, pageW - margin * 2);
    doc.text(ctaLines, margin, y);
    y += ctaLines.length * 6 + 8;

    doc.setTextColor(...gold);
    doc.text('hi@raiku.ch', margin, y);

    // Bottom bar
    doc.setFillColor(...dark);
    doc.rect(0, 287, pageW, 10, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gold);
    doc.text('© Buetikofer Digital', pageW / 2, 293, { align: 'center' });

    doc.save(`RAIKU_AI-Readiness-Report_${data.name.replace(/\s+/g, '_')}.pdf`);
  };

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

      {/* Urgency / Competitor Benchmark */}
      {(() => {
        const marketAvg = 52;
        const urgency = totalScore > 70
          ? {
              headline: 'Sie sind vorne — aber der Vorsprung ist gefährdet.',
              text: 'Topunternehmen im DACH-Raum investieren 2025 massiv in AI-Skalierung und Mitarbeiterschulung. Wer jetzt nicht aktiv ausbaut, verliert seinen Vorsprung innert 12 Monaten — denn die Konkurrenz holt schnell auf.',
            }
          : totalScore > 40
          ? {
              headline: 'Die Schere öffnet sich — jetzt ist der Moment zu handeln.',
              text: 'Während Sie diesen Report lesen, implementieren Mitbewerber neue AI-Workflows und schulen ihre Teams. Die Lücke wird grösser, nicht kleiner — wer jetzt nicht handelt, kämpft morgen mit doppeltem Rückstand.',
            }
          : {
              headline: 'Kritischer Rückstand — jede Woche zählt.',
              text: '3 von 4 Unternehmen in Ihrer Branche haben AI bereits aktiv im Einsatz. Jede Woche ohne klare Strategie bedeutet wachsenden Wettbewerbsnachteil, der mit der Zeit immer schwerer aufzuholen ist.',
            };

        return (
          <div className="mb-16 bg-leder-schwarz rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-alpine-gold" />

            {/* Stat row */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
              <div className="flex-shrink-0 text-center">
                <div className="text-6xl md:text-7xl font-extrabold text-alpine-gold leading-none">77%</div>
                <div className="text-cremeweiss/50 text-sm mt-2 max-w-[140px] leading-snug">der DACH-Unternehmen haben AI-Investitionen 2024 erhöht</div>
              </div>
              <div className="w-px h-16 bg-cremeweiss/10 hidden md:block" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-alpine-gold" />
                  <span className="text-cremeweiss/60 text-sm font-semibold uppercase tracking-widest">Marktvergleich</span>
                </div>
                <div className="space-y-3 mt-4">
                  {/* Market average bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cremeweiss/50">Marktdurchschnitt</span>
                      <span className="text-cremeweiss/50 font-bold">{marketAvg}</span>
                    </div>
                    <div className="w-full bg-cremeweiss/10 rounded-full h-2">
                      <div className="bg-cremeweiss/30 h-2 rounded-full" style={{ width: `${marketAvg}%` }} />
                    </div>
                  </div>
                  {/* User score bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cremeweiss font-semibold">Ihr Score</span>
                      <span className="text-alpine-gold font-bold">{totalScore}</span>
                    </div>
                    <div className="w-full bg-cremeweiss/10 rounded-full h-2">
                      <div className="bg-alpine-gold h-2 rounded-full transition-all duration-1000" style={{ width: `${totalScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic urgency message */}
            <div className="border-t border-cremeweiss/10 pt-8">
              <h4 className="text-xl md:text-2xl font-bold text-cremeweiss mb-3">{urgency.headline}</h4>
              <p className="text-cremeweiss/70 leading-relaxed max-w-3xl">{urgency.text}</p>
            </div>

            <p className="text-cremeweiss/20 text-xs mt-6">Quellen: McKinsey Global AI Survey 2024, WEF Future of Jobs Report 2025</p>
          </div>
        );
      })()}

      {/* Email Confirmation & Download */}
      <div className="text-center mb-16">
        <p className="text-leder-schwarz/70 text-lg mb-6">
          Der Report wurde soeben per E-Mail zugestellt. Falls Sie ihn trotzdem downloaden möchten:
        </p>
        <button
          onClick={downloadReport}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-cremeweiss bg-leder-schwarz rounded-full hover:bg-leder-schwarz/80 transition-all hover:scale-105 shadow-lg"
        >
          <Download className="mr-2 w-5 h-5" />
          Report herunterladen
        </button>
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
            href="https://calendly.com/raiku-swiss/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-leder-schwarz bg-alpine-gold rounded-full hover:bg-alpine-gold/90 transition-all hover:scale-105 shadow-xl w-full sm:w-auto"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Kostenloses Erstgespräch buchen
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-cremeweiss/10 flex justify-center items-center text-cremeweiss/50 font-medium">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            hi@raiku.ch
          </div>
        </div>
      </div>
    </div>
  );
}
