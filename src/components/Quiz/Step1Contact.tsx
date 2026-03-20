import { useState } from 'react';
import { QuizData } from './Quiz';
import { ArrowRight } from 'lucide-react';

interface Props {
  data: QuizData;
  updateData: (data: Partial<QuizData>) => void;
  onNext: () => void;
}

export default function Step1Contact({ data, updateData, onNext }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof QuizData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof QuizData, string>> = {};
    if (!data.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = 'Gültige E-Mail ist erforderlich';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-leder-schwarz">Lass uns starten</h2>
      <p className="text-leder-schwarz/70 mb-10 text-center text-lg">Wohin dürfen wir deine Auswertung senden?</p>

      <div className="space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-leder-schwarz/5">
        <div>
          <label className="block text-sm font-bold text-leder-schwarz mb-2">Vollständiger Name *</label>
          <input 
            type="text" 
            value={data.name}
            onChange={e => updateData({ name: e.target.value })}
            className={`w-full bg-cremeweiss border ${errors.name ? 'border-red-500' : 'border-leder-schwarz/10'} rounded-xl px-4 py-4 text-leder-schwarz focus:outline-none focus:ring-2 focus:ring-alpine-gold transition-all`}
            placeholder="Max Mustermann"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-leder-schwarz mb-2">E-Mail Adresse *</label>
          <input 
            type="email" 
            value={data.email}
            onChange={e => updateData({ email: e.target.value })}
            className={`w-full bg-cremeweiss border ${errors.email ? 'border-red-500' : 'border-leder-schwarz/10'} rounded-xl px-4 py-4 text-leder-schwarz focus:outline-none focus:ring-2 focus:ring-alpine-gold transition-all`}
            placeholder="max@unternehmen.ch"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-leder-schwarz mb-2">Telefonnummer (Optional)</label>
          <input 
            type="tel" 
            value={data.phone}
            onChange={e => updateData({ phone: e.target.value })}
            className="w-full bg-cremeweiss border border-leder-schwarz/10 rounded-xl px-4 py-4 text-leder-schwarz focus:outline-none focus:ring-2 focus:ring-alpine-gold transition-all"
            placeholder="+41 79 123 45 67"
          />
        </div>

        <button 
          onClick={handleNext}
          className="w-full mt-8 flex items-center justify-center px-8 py-4 text-lg font-bold text-cremeweiss bg-leder-schwarz rounded-xl hover:bg-leder-schwarz/90 transition-all shadow-lg"
        >
          Weiter zu den Best Practices
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
