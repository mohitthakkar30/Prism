import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/main.module.css"
import Navbar from '../components/Navbar'
import HeroSection from "../components/HeroSection"

export default function Home() {
  return (
    
    <main>
      <Navbar/>
      <HeroSection/>
    </main>
  )
}
