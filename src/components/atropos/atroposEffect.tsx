import { ReactNode, useEffect } from "react";
import Atropos from 'atropos';

type AtroposEffectProps = {
  children: ReactNode;
  index: number;
}

export default function AtroposEffect ({children, index} : AtroposEffectProps) {
  useEffect(() => {
    const myAtropos = Atropos({
      el: `.my-atropos-${index}`,
      activeOffset: 80,
      shadow: true,
      shadowOffset: 100,
      shadowScale: 2,
      highlight: false,
    });
    return () => {
      myAtropos.destroy();
    }
  }, [index]); 
  return (
    <div className={`w-full h-full atropos my-atropos-${index}`}>
       <div className="h-full atropos-scale">
        <div className="h-full atropos-rotate">
          <div className="h-full atropos-inner" >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}