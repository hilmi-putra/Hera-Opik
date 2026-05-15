export function ScallopDivider({ className = "", fill = "var(--color-cream)" }: { className?: string; fill?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
        <path d="M0,30 Q45,0 90,30 T180,30 T270,30 T360,30 T450,30 T540,30 T630,30 T720,30 T810,30 T900,30 T990,30 T1080,30 T1170,30 T1260,30 T1350,30 T1440,30 L1440,60 L0,60 Z" fill={fill}/>
      </svg>
    </div>
  );
}
