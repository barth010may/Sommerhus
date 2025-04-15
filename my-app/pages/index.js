import Head from 'next/head'
import { useState } from 'react'
import Button from '../components/Button'
import Link from "next/link"

export default function IndexPage() {  
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-gradient-to-t relative h-screen w-screen">
      <Head>
        <title>Book Sommerhus</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50 blur-sm"
        alt="main background image"
        src="/Sommerhus_pic1.jpg"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 max-w-lg mx-auto text-center">
          <div className="space-y-8">
            <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight py-10">
              Book Din SommerFerie
            </h1>
            <Link href={"/form"} >
              <Button />
            </Link>
          </div>
      </div>


    </div>
  )
}


