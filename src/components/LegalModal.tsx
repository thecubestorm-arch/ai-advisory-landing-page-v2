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
                <strong>Buetikofer Digital</strong><br />
                Rosengasse 31<br />
                4600 Olten<br />
                Schweiz
              </p>

              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Kontakt</h3>
              <p className="leading-relaxed">
                E-Mail: <a href="mailto:hi@raiku.ch" className="underline hover:text-leder-schwarz transition-colors">hi@raiku.ch</a>
              </p>

              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Haftungsausschluss</h3>
              <p className="leading-relaxed">Der Betreiber dieser Website übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der bereitgestellten Informationen. Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen.</p>

              <h3 className="text-xl font-bold text-leder-schwarz mt-8 mb-4">Urheberrecht</h3>
              <p className="leading-relaxed">Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem Urheberrecht. Jede Vervielfältigung, Bearbeitung, Verbreitung und Verwertung ausserhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors.</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">1. Verantwortliche Stelle</h2>
              <p className="leading-relaxed">
                Verantwortlich für die Datenbearbeitung auf dieser Website gemäss Schweizer Datenschutzgesetz (DSG):<br /><br />
                <strong>Buetikofer Digital</strong><br />
                Rosengasse 31<br />
                4600 Olten<br />
                Schweiz<br />
                E-Mail: <a href="mailto:hi@raiku.ch" className="underline hover:text-leder-schwarz transition-colors">hi@raiku.ch</a>
              </p>

              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">2. Datenerfassung auf dieser Website</h2>

              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="leading-relaxed">Wir nehmen den Schutz Ihrer persönlichen Daten ernst und behandeln Ihre personenbezogenen Daten vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften (Schweizer DSG) und dieser Datenschutzerklärung.</p>

              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Server-Logfiles</h3>
              <p className="leading-relaxed">Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie IP-Adresse. Diese Daten sind nicht anderen Datenquellen zuordnebar und werden nach spätestens 30 Tagen gelöscht. Rechtsgrundlage ist das berechtigte Interesse am sicheren Betrieb der Website (Art. 31 DSG).</p>

              <h3 className="text-xl font-bold text-leder-schwarz mt-6 mb-3">Quiz / Kontaktanfragen</h3>
              <p className="leading-relaxed">Wenn Sie unser Quiz ausfüllen oder eine Anfrage stellen, werden die von Ihnen eingegebenen Daten (z. B. Angaben zu Ihrem Unternehmen und Ihren Bedürfnissen) bei uns gespeichert, um Ihre Anfrage zu bearbeiten und Sie zu kontaktieren. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 DSG).</p>

              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">3. Cookies</h2>
              <p className="leading-relaxed">Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.</p>
              <p className="leading-relaxed mt-3"><strong>Notwendige Cookies</strong> sind für den Betrieb der Website technisch erforderlich und werden ohne Ihre Einwilligung gesetzt (z. B. Speicherung Ihrer Cookie-Präferenzen).</p>
              <p className="leading-relaxed mt-3"><strong>Optionale Cookies</strong> (z. B. für Analyse oder Marketing) werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Cookie-Einstellungen im Banner neu setzen oder Cookies in Ihrem Browser löschen.</p>

              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">4. Hosting</h2>
              <p className="leading-relaxed">Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Vercel kann beim Aufruf der Website automatisch Verbindungsdaten erfassen. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-leder-schwarz transition-colors">vercel.com/legal/privacy-policy</a>. Die Übermittlung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission.</p>

              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">5. Ihre Rechte</h2>
              <p className="leading-relaxed">Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
              <ul className="list-disc list-inside space-y-1 mt-3 leading-relaxed">
                <li>Recht auf Auskunft (Art. 25 DSG)</li>
                <li>Recht auf Berichtigung unrichtiger Daten</li>
                <li>Recht auf Löschung Ihrer Daten</li>
                <li>Recht auf Einschränkung der Bearbeitung</li>
                <li>Recht auf Datenherausgabe (Datenportabilität)</li>
                <li>Recht auf Widerruf einer erteilten Einwilligung</li>
              </ul>
              <p className="leading-relaxed mt-3">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:hi@raiku.ch" className="underline hover:text-leder-schwarz transition-colors">hi@raiku.ch</a></p>
              <p className="leading-relaxed mt-3">Sie haben ausserdem das Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren: <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-leder-schwarz transition-colors">www.edoeb.admin.ch</a></p>

              <h2 className="text-2xl font-bold text-leder-schwarz mt-8 mb-4">6. Aktualität</h2>
              <p className="leading-relaxed">Diese Datenschutzerklärung ist aktuell gültig und datiert vom März 2025. Wir behalten uns das Recht vor, diese Datenschutzerklärung bei Bedarf anzupassen.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
