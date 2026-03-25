import Image from 'next/image'
import styles from './CitySkyline.module.css'

export default function CitySkyline() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/devshift_bat_signal_v2_2.svg"
        alt=""
        width={1920}
        height={315}
        className={styles.svg}
        priority={false}
        aria-hidden="true"
      />
    </div>
  )
}
