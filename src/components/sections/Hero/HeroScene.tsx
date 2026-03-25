'use client';

import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const ConstructionScene = dynamic(
  () => import('@/components/ui/ConstructionScene/ConstructionScene'),
  { ssr: false }
);

export default function HeroScene() {
  return (
    <div className={styles.sceneWrapper}>
      <div className={styles.glow} />
      <ConstructionScene className={styles.scene} />
    </div>
  );
}
