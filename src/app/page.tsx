import Navbar from '@/components/sections/Navbar/Navbar'
import Hero from '@/components/sections/Hero/Hero'
import Gallery from '@/components/sections/Gallery/Gallery'
import Services from '@/components/sections/Services/Services'
import WhyUs from '@/components/sections/WhyUs/WhyUs'
import CTABanner from '@/components/sections/CTABanner/CTABanner'
import CitySkyline from '@/components/ui/CitySkyline/CitySkyline'
import Footer from '@/components/sections/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />
      <Services />
      <WhyUs />
      <CTABanner />
      <CitySkyline />
      <Footer />
    </>
  )
}
