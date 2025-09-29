import { Hero } from '@/components/sections/Hero'
import { FeaturedFrames } from '@/components/sections/FeaturedFrames'
import { QuizSection } from '@/components/sections/QuizSection'
import { Features } from '@/components/sections/Features'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedFrames />
      <QuizSection />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
