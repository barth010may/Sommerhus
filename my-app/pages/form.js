import Head from 'next/head'
import DatePicker from '../components/DatePicker'
import { useState } from 'react'
import Script from 'next/script'
import { validate } from '../lib/form'

export default function form() {
  const [isValidFirst, setIsValidFirst] = useState(true);
  const [isValidLast, setIsValidLast] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="bg-gradient-to-t relative h-screen w-screen">
      <Head>
        <title>Book Sommerhus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50 blur-sm"
        alt="main background image"
        src="/Sommerhus_pic1.jpg"
      />
     
    <form method="post" className="absolute inset-0 flex flex-col justify-center items-center mx-auto text-center">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {isValidFirst ? (
            <div>
            <label for="first_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Fornavn</label>
            <input type="text" id="first_name" className="bg-light-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark" placeholder="John"/>
            </div>
          
          ) : (
            <div>
            <label for="username-error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Fornavn</label>
            <input 
              type="text" 
              id="username-error" 
              class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" 
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Invalid Fornavn</p>
          </div>
          )} 
          {isValidLast ? (
                <div>
                <label for="last_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Efternavn</label>
                <input 
                  type="text" 
                  id="last_name" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Deer"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  />
              </div>
            ) : (
              <div>
              <label for="username-error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Efternavn</label>
              <input type="text" id="username-erro" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" placeholder="" />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Invalid Efternavn</p>
            </div>
            )}
          
        </div>
        <div className='w-1/10'>
          <DatePicker />
        </div>
        <div className='my-5'>
            <button onClick={() => {validate({firstName, lastName, setIsValidFirst, setIsValidLast})}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
        </div>
    </form>

    <Script src='../lib/form' />

    </div>
  )
}

