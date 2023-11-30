import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { Squash as Hamburger} from 'hamburger-react'

type LogoProps = {
  showMobileSideBar: boolean;
  setShowMobileSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  showHamburger?: boolean;
}

export default function Logo ({
  showMobileSideBar,
  setShowMobileSideBar,
  showHamburger = true,
}: LogoProps) {
  return (
    <div className="flex">
      {
      showHamburger &&
      <div className="md:hidden text-primary">
        <Hamburger toggled={showMobileSideBar} toggle={()=> setShowMobileSideBar(!showMobileSideBar)} />
      </div>
      }
      
      <a href={import.meta.env.VITE_DOMAIN} className="items-center hidden gap-2 md:flex left-1/2">
        <Icon className="text-primary " path={mdiEarth} size={1.5} />
        <span className="hidden text-lg md:flex md:text-3xl font-logo text-primary whitespace-nowrap">
          Polyglot Pal
        </span>
      </a>

    </div>
  )
}