import styles from './CTABanner.module.css'

interface CTABannerProps {
  heading?: string
}

export default function CTABanner({
  heading = 'Lorem Ipsum dolor sit amet.',
}: CTABannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>
      </div>
    </section>
  )
}
