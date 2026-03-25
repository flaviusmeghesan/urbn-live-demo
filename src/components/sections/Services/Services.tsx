import styles from './Services.module.css'

const cards = [
  {
    number: 1,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
    bullets: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    number: 2,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
    bullets: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    number: 3,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
    bullets: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    number: 4,
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet.',
    bullets: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
]

function ConstructionIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 40V20L24 8L40 20V40H28V28H20V40H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 22L24 6L44 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 6V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M36 12V6H40V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Services() {
  return (
    <section className={styles.section} id="servicii">
      <div className={styles.inner}>

        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>
            <span className={styles.accent}>Lorem</span> Ipsum
          </h2>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.number} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.badge}>{card.number}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>
              <p className={styles.cardDesc}>{card.description}</p>
              <ul className={styles.bullets}>
                {card.bullets.map((b, i) => (
                  <li key={i} className={styles.bullet}>{b}</li>
                ))}
              </ul>
              <div className={styles.iconWrapper}>
                <ConstructionIcon />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
