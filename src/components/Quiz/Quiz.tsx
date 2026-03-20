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
  bp1: string; bp2: string; bp3: string; bp4: string; bp5: string;
  bp6: string; bp7: string; bp8: string; bp9: string; bp10: string;
  s1: string; s1_other: string;
  s2: string; s2_other: string;
  s3: string; s3_other: string;
  s4: string; s4_other: string;
  s5: string;
}

const initialData: QuizData = {
  name: '', email: '', phone: '',
  bp1: '', bp2: '', bp3: '', bp4: '', bp5: '',
  bp6: '', bp7: '', bp8: '', bp9: '', bp10: '',
  s1: '', s1_other: '', s2: '', s2_other: '', s3: '', s3_other: '', s4: '', s4_other: '', s5: ''
};

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
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
    console.log('Quiz completed with data:', data);
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
