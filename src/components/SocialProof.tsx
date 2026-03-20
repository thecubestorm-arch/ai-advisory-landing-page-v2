export default function SocialProof() {
  return (
    <section className="border-y border-leder-schwarz/10 bg-white/50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-leder-schwarz mb-1">100+</span>
            <span className="text-xs text-leder-schwarz/60 uppercase tracking-widest font-semibold">Unternehmen analysiert</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-leder-schwarz mb-1">Ø 6h</span>
            <span className="text-xs text-leder-schwarz/60 uppercase tracking-widest font-semibold">Pro Woche eingespart</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-leder-schwarz mb-1">100%</span>
            <span className="text-xs text-leder-schwarz/60 uppercase tracking-widest font-semibold">Für KMUs & Mittelstand</span>
          </div>
        </div>
      </div>
    </section>
  );
}
