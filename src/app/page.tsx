import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Links } from '@/components/sections/Links'
import { BlogPreview } from '@/components/sections/BlogPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Links />
      <BlogPreview />
    </>
  )
}
