import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  const [theme, setTheme] = useState("dark");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`relative selection:bg-zinc-400 flex flex-col ${theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Hero theme={theme}/>
      <AiTools theme={theme}/>
      <Testimonial theme={theme}/>
      <Plan theme={theme}/>
      <Footer theme={theme}/>
    </div>
  )
}

export default Home;
