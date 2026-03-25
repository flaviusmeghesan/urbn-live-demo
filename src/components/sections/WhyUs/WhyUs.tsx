import { Rocket, Wrench, Radio, ShieldCheck } from 'lucide-react'
import styles from './WhyUs.module.css'

const cards = [
  {
    icon: Rocket,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    icon: Wrench,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    icon: Radio,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    icon: ShieldCheck,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
  },
]

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* LEFT — text */}
        <div className={styles.content}>
          <h2 className={styles.heading}>
            <span className={styles.accent}>Lorem</span> Ipsum
          </h2>
          <p className={styles.body}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
            Consectetur adipiscing elit quisque faucibus ex sapien vitae.
          </p>
        </div>

        {/* RIGHT — cards */}
        <div className={styles.cards}>
          {cards.map(({ icon: Icon, title, description }) => (
            <div key={title + description} className={styles.card}>
              <div className={styles.iconBox}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
