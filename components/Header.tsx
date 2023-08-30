import Image from "next/image";
import { MagnifyingGlassCircleIcon, GlobeEuropeAfricaIcon, Bars3Icon, UserCircleIcon, UsersIcon } from "@heroicons/react/24/solid";

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-3 md:px-10">

      {/* left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="/FPL_Mstr.png"
          layout="fill"
          objectFit="contain"
          alt="banner"
        />
      </div>
      {/* middle */}
      <div className="flex items-center md:border-2 rounded-full py-2 px-1">
        <input type="text" placeholder="Search for player" className="flex-grow pl-5 transparent outline-none text-sm text-gray-600 placeholder-gray-400"/>
        <MagnifyingGlassCircleIcon className="hidden md:inline-flex h-8 text-red-400 cursor-pointer md:mx-2"/>
      </div>
      {/* right */}
      <div className="flex items-center justify-end space-x-4">
        <p className="hidden md:inline cursor-pointer">Try FPL Master</p>
        <GlobeEuropeAfricaIcon className="h-6 cursor-pointer"/>

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer"/>
          <UserCircleIcon className="h-6 cursor-pointer"/>
        </div>
      </div>
    </header>
  );
}

export default Header;