export function PhotoGallery() {
  const photos = [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", caption: "Our first trip to Bali", rotation: "-rotate-2" },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800", caption: "Coffee dates", rotation: "rotate-3" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800", caption: "The proposal", rotation: "-rotate-1" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800", caption: "Pre-wedding shoot", rotation: "rotate-2" },
  ];

  return (
    <section className="relative py-32 bg-cream overflow-hidden">
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--color-charcoal) 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="relative max-w-[1200px] mx-auto px-6 z-10">
        <div className="text-center mb-24 animate-on-scroll stagger">
          <p className="font-sans text-[var(--text-sub)] tracking-[var(--tracking-wide)] uppercase text-muted mb-4">
            Memories
          </p>
          <h2 className="font-display text-[var(--text-section)] font-light text-charcoal">
            Our Moments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 px-4">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className={`bg-white p-4 pb-12 shadow-xl border border-gray-100 ${photo.rotation} transition-transform hover:scale-105 hover:rotate-0 duration-500 hover:z-20 relative animate-on-scroll`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img 
                  src={photo.src} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover filter contrast-[0.95]"
                  loading="lazy"
                />
              </div>
              <p className="font-sans absolute bottom-4 left-0 w-full text-center text-gray-600 italic">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
