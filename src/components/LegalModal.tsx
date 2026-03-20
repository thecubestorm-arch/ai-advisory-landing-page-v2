import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  type: 'impressum' | 'datenschutz' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: Props) {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-cremeweiss overflow-y-auto">
      <button 
        onClick={onClose} 
        className="fixed top-4 right-4 md:top-8 md:right-8 p-3 text-leder-schwarz/50 hover:text-leder-schwarz bg-leder-schwarz/5 hover:bg-leder-schwarz/10 rounded-full transition-colors z-[60]"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="min-h-screen container mx-auto px-4 py-12 md:py-20 max-w-3xl text-leder-schwarz">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          {type === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
        </h1>
        
        <div className="max-w-none text-leder-schwarz/80 space-y-6">
          {type === 'impressum' ? (
            <>
              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">Angaben gemäss Informationspflicht</h2>
              <p className="leading-relaxed">
                <strong>Raiku</strong><br />
                Musterstrasse 123<br />
                8000 Zürich<br />
                Schweiz
              </p>
              
              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Kontakt</h3>
              <p className="leading-relaxed">
                Telefon: +41 79 123 45 67<br />
                E-Mail: hello@raiku.com
              </p>
              
              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Vertretungsberechtigte Personen</h3>
              <p className="leading-relaxed">Max Mustermann, Geschäftsführer</p>
              
              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Handelsregistereintrag</h3>
              <p className="leading-relaxed">Eingetragener Firmenname: Raiku GmbH<br />
              Nummer: CHE-123.456.789<br />
              Handelsregisteramt: Zürich</p>
              
              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Haftungsausschluss</h3>
              <p className="leading-relaxed">Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="leading-relaxed">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
              
              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <h4 className="text-lg font-bold text-leder-schwarz mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p className="leading-relaxed">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
              
              <h4 className="text-lg font-bold text-leder-schwarz mt-4 mb-2">Wie erfassen wir Ihre Daten?</h4>
              <p className="leading-relaxed">Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
              
              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">2. Hosting</h2>
              <p className="leading-relaxed">Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Externer Hoster. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.</p>
              
              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Datenschutz</h3>
              <p className="leading-relaxed">Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
              
              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="leading-relaxed">Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmässigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
