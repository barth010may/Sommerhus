import Image from "next/image"
import logo from "../public/SommerhusLogo.jpg"

export default function Header() {
    return (
        
        <nav class="px-2 sm:px-4 py-2.5 rounded">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <div class="flex items-center">
                    <Image src={logo} width="50" class="h-6 mr-3 sm:h-9" alt="Sommerhus Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Book Sommerhus</span>
                </div>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Book
                </button>
                
                </div>
            </div>
        </nav>

    )
}