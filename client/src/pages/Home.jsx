
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import { Globe } from "@/components/magicui/globe";

const Home = () => {
  return (
    <div className="relative flex flex-col bg-zinc-800">
      <Globe />
      <Navbar/>
      <Hero/>
      <AiTools/>
      <Testimonial/>
      <Plan/>
      <Footer/>
    </div>
  )
}

export default Home
