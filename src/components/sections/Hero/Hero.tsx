import NetworkBackground from '@/components/ui/NetworkBackground/NetworkBackground';
import HeroScene from './HeroScene';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <NetworkBackground />

      <div className={styles.inner}>
        {/* LEFT — text */}
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Construim <span className={styles.accent}>prezenta digitala</span> a firmei tale
          </h1>
          <p className={styles.body}>
            Marketing performant orientat exclusiv firmelor de constructii.
            Aducem clientii potriviti direct la tine.
          </p>
          <a href="#contact" className={styles.cta}>
            Incepe acum
          </a>
        </div>

        {/* RIGHT — 3D scene + glow */}
        <HeroScene />
      </div>
    </section>
  );
}
