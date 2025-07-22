import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { ServicesSection } from '../components/sections/ServicesSection'
import { BlogSection } from '../components/sections/BlogSection'
import { ContactSection } from '../components/sections/ContactSection'
import { Navigation } from '../components/layout/Navigation'
import { Footer } from '../components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <GalleryPreview />
      <ServicesSection />
      <BlogSection featured={true} maxPosts={3} />
      <ContactSection />
      <Footer />
    </main>
  )
}
