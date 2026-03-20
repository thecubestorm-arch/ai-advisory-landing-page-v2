import { ClipboardList, Target, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8 text-alpine-gold" />,
      title: "Kostenlose Potenzialanalyse",
      description: "Beantworten Sie kurze Fragen zu Ihrem aktuellen Setup und Ihren Zielen."
    },
    {
      icon: <Target className="w-8 h-8 text-alpine-gold" />,
      title: "Strategische Bewertung",
      description: "Erfahren Sie sofort, wo Ihr Unternehmen im Branchenvergleich steht und wo die grössten Hebel liegen."
    },
    {
      icon: <Rocket className="w-8 h-8 text-alpine-gold" />,
      title: "Massgeschneiderter Aktionsplan",
      description: "Erhalten Sie konkrete Handlungsempfehlungen und Best Practices für schnelle Erfolge."
    }
  ];

  return (
    <section className="py-24 bg-cremeweiss text-leder-schwarz">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Unser Beratungs-Framework</h2>
          <p className="text-leder-schwarz/70 max-w-2xl mx-auto text-lg">In drei einfachen Schritten von der Analyse zur messbaren KI-Integration.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative p-8 rounded-2xl bg-white border border-leder-schwarz/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-leder-schwarz rounded-full flex items-center justify-center text-xl font-bold text-alpine-gold shadow-lg">
                {index + 1}
              </div>
              <div className="mb-6 bg-alpine-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-leder-schwarz/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
