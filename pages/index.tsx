import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from "../components/Sidebar"
// import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
        <title>Jazzify</title>
      <main>
        <Sidebar />
        {/*Center*/}
      </main>

      <div>{/*player*/}</div>
    </div>
    
  )
}

export default Home
