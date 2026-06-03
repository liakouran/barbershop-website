import {MotionSection} from './Motion';

export default function Section({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <MotionSection
      className="mx-auto max-w-7xl px-5 py-20 md:px-8"
      initial={{opacity: 0, y: 28}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-120px'}}
      transition={{duration: 0.7, ease: 'easeOut'}}
    >
      <p className="text-sm uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <div className="mt-3 grid gap-6 md:grid-cols-[0.85fr_1fr] md:items-end">
        <h2 className="font-display text-4xl font-semibold md:text-6xl">{title}</h2>
        {intro ? <p className="max-w-2xl text-base leading-7 text-cream/70">{intro}</p> : null}
      </div>
      <div className="mt-10">{children}</div>
    </MotionSection>
  );
}
