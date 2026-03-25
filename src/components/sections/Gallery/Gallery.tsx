import Image from 'next/image'
import styles from './Gallery.module.css'

const images = [
  {
    src: '/images/gallery-1.webp',
    alt: 'Santier de constructii cu macara la apus',
  },
  {
    src: '/images/gallery-2.webp',
    alt: 'Cladire de birouri in constructie',
  },
  {
    src: '/images/gallery-3.webp',
    alt: 'Macara si santier urban',
  },
]

export default function Gallery() {
  return (
    <section className={styles.section} id="proiecte">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Lorem Ipsum dolor sit amet.
          </h2>
          <p className={styles.body}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
            Consectetur adipiscing elit quisque faucibus ex sapien vitae.
          </p>
        </div>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`${styles.card} ${i === 1 ? styles.cardFeatured : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
