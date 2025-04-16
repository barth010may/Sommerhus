import Head from 'next/head'
import React from 'react'

export default function ExampleComponent() {
  return (
    <>
      <Head>
        <link rel="dns-prefetch" href="//unpkg.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"/>
        <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer />
      </Head>

      <style jsx>
        {`
          [x-cloak] {
            display: none;
          }
        `}
      </style>

      <div className="antialiased sans-serif bg-gray-100 h-screen">
        {/* Alpine.js code goes here */}
      </div>
    </>
  )
}
