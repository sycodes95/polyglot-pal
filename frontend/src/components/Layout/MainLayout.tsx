
import { useTheme } from "@/components/themeProvider/theme-provider"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { mdiHeart } from '@mdi/js';
import { Squash as Hamburger} from 'hamburger-react'

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const UserDropdownMenu = () => {

  const { user } = useAuth();
  const { logout } = useAuth();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);

  return (
    <>
      {
        user && 
        <button className="relative z-50 flex items-center gap-2 cursor-pointer text-primary" onClick={()=> setUserMenuIsOpen(!userMenuIsOpen)}>

          <span>{user?.userName}</span>

          {/* <img className="object-contain w-8 h-8 rounded-full" src={user.picture} alt="" /> */}

          {
          userMenuIsOpen &&
            <>
              <ul className="absolute right-0 z-50 flex flex-col gap-1 p-4 border rounded-lg cursor-default border-border bg-background whitespace-nowrap top-full ">
                <li className="z-50 text-sm text-red-400 transition-all cursor-pointer hover:text-red-600" onClick={
                  ()=> {
                  window.onbeforeunload = null;
                  logout();
                  return false;
                }}>Log Out</li>
              </ul>
            </>
            
          }
        </button>
      }

      {
      userMenuIsOpen && 
        <div className="fixed top-0 left-0 w-full h-full" onClick={()=> setUserMenuIsOpen(false)}></div>
      }
    
    </>
  );
};

type LogoProps = {
  showMobileSidebar: boolean;
  setShowMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showHamburger?: boolean;
};

const Logo = ({
  showMobileSidebar,
  setShowMobileSidebar,
  showHamburger = true,
}: LogoProps) => {
  return (
    <div className="flex">
      {
      showHamburger &&
      <div className="md:hidden text-primary">
        <Hamburger toggled={showMobileSidebar} toggle={()=> setShowMobileSidebar(!showMobileSidebar)} />
      </div>
      }
      
      <a href={import.meta.env.VITE_DOMAIN} className="items-center hidden gap-2 md:flex left-1/2">
        <Icon className="text-primary " path={mdiEarth} size={1.5} />
        <span className="hidden text-lg md:flex md:text-3xl font-logo text-primary whitespace-nowrap">
          Polyglot Pal
        </span>
      </a>

    </div>
  );
};


type MobileLogoProps = {
  className?: string;
}

export const MobileLogo = ({ className } : MobileLogoProps) => {
  return (
    <a href={import.meta.env.VITE_DOMAIN} className={`${className}`}>
      <Icon className="text-primary" path={mdiEarth} size={1.5} />
    </a>

  );
};

const ModeToggle = () => {
  
  const { setTheme } = useTheme()
  return (
    <div className="hidden md:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-black dark:text-foreground hover:dark:text-yellow-100 hover:bg-foreground border-border" variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1" align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


type HeaderProps = {
  mobileSideBarContext: {
    showMobileSidebar: boolean;
    setShowMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const Header = ({ 
  mobileSideBarContext
}: HeaderProps) => {

  const { showMobileSidebar, setShowMobileSidebar } = mobileSideBarContext;
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="top-0 z-10 flex items-center justify-center w-full h-16 border-b border-border/20 bg-black/20">
      {
      user ? 
      <div className="relative flex justify-between w-full p-4 max-w-full">
        
        <Logo 
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
        />
        <MobileLogo className="absolute gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:hidden" />       
        
        <div className="flex justify-end w-full gap-8">
          <ModeToggle />
          <UserDropdownMenu />
        </div>
        
      </div>
      :
      <div className="relative flex items-center justify-between w-full p-4 max-w-7xl">
        <Logo 
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
        showHamburger={false}
        />
        <MobileLogo className="flex items-center md:hidden" />
        <div className="flex items-center justify-end w-full ">
          <button className="h-8 p-2 text-sm font-normal transition-all duration-300 bg-red-400 border border-red-500 rounded-lg w-fit bg-opacity-20 text-primary font-main flex items-center " onClick={()=> {
            navigate("/login");
            }}>
            Log In / Sign Up
          </button>
          
        </div>

      </div>
      }
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bottom-0 flex justify-center w-full h-10 border-t bg-black/20 border-border/20">
      <div className="max-w-7xl">
        <div className="flex items-center h-full gap-1 text-sm text-primary">
          <span className='whitespace-nowrap'>Made with</span>
          <Icon className='text-red-600' path={mdiHeart} size={0.7} />
          <span className='whitespace-nowrap'>by</span>
          <a className="text-red-400 hover:underline" href="https://github.com/sycodes95" target="_blank">sycodes95</a>
        </div>
      </div>
    </div>
  ); 
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ( { children }: MainLayoutProps ) => {

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { user } = useAuth();

  const handleResize = () => {
    if(window.innerWidth > 768){
      setShowMobileSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen max-h-screen w-full h-full flex flex-col items-center bg-background">
      <Header mobileSideBarContext={{ showMobileSidebar, setShowMobileSidebar }} />
      <main className="max-w-full w-full h-full  flex grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};