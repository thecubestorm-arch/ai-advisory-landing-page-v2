/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Hero from './components/Hero';
import Quiz from './components/Quiz/Quiz';
import Footer from './components/Footer';
import Logo from './components/Logo';
import LegalModal from './components/LegalModal';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'impressum' | 'datenschutz' | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-cremeweiss font-sans selection:bg-alpine-gold/30">
      <header className="absolute top-0 left-0 w-full z-40 py-6">
        <div className="container mx-auto px-4 flex justify-center md:justify-start items-center">
          <Logo variant="light" />
        </div>
      </header>
      
      <main className="flex-grow flex flex-col justify-center">
        <Hero onOpenQuiz={() => setIsQuizOpen(true)} />
      </main>

      <Footer onOpenLegal={(type) => setLegalModal(type)} />
      <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
