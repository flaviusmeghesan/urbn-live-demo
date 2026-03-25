import styles from './Footer.module.css'

const defaultColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Development', href: '#' },
      { label: 'Design', href: '#' },
      { label: 'Consulting', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
]

interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }

interface FooterProps {
  subheading?: string
  columns?: FooterColumn[]
  copyright?: string
}

function DevShiftLogo() {
  return (
    <svg
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.logoSvg}
      aria-label="DevShift"
    >
      <text
        x="0"
        y="64"
        className={styles.logoText}
      >
        Dev<tspan className={styles.logoS}>S</tspan>hift
      </text>
    </svg>
  )
}

export default function Footer({
  subheading = 'Lorem Ipsum dolor sit amet.',
  columns = defaultColumns,
  copyright = 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
}: FooterProps) {
  return (
    <footer className={styles.footer}>

      {/* Subheading in orange section */}
      <div className={styles.subheadingWrap}>
        <h3 className={styles.subheading}>{subheading}</h3>
      </div>

      {/* Footer grid: logo + badges | link columns */}
      <div className={styles.grid}>

        {/* LEFT — logo + badges */}
        <div className={styles.logoCol}>
          <div className={styles.logoWrap}>
            <DevShiftLogo />
          </div>
          <div className={styles.badges}>
            <div className={styles.badgeRow}>
              <span className={styles.badge}>ISO 9001</span>
              <span className={styles.badge}>ISO 27001</span>
            </div>
            <div className={styles.badgeRow}>
              <span className={styles.badgeSm}>ANPC</span>
              <span className={styles.badgeSm}>SOL</span>
            </div>
            <div className={styles.badgeRow}>
              <span className={styles.badgeSm}>SOL ONLINE</span>
            </div>
          </div>
        </div>

        {/* RIGHT — link columns */}
        <nav className={styles.colsWrap} aria-label="Footer navigation">
          {columns.map((col) => (
            <div key={col.title} className={styles.linkCol}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.link}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

      </div>

      {/* Copyright bar */}
      <div className={styles.copyrightBar}>
        <p className={styles.copyrightText}>{copyright}</p>
      </div>

    </footer>
  )
}
