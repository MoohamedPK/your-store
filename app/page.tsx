import Hero from "@/components/Hero"
import Recommanded from "@/components/Featured"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Values from "@/components/Values"
import Cta from "@/components/Cta"

const Home = async () => {

  return (
    <main>
      <Hero/>
      <About/>
      <Testimonials/>
      <Recommanded/>
      <Values/>
      <Cta/>
    </main>
  )
}

export default Home