type CountryFlagProps = {
  countryCode : string;
  className? : string;
}

import { useEffect, useState } from "react";
import defaultFlag from "../../assets/flag/default-flag.png"


export default function CountryFlag ({ countryCode, className } : CountryFlagProps) {
  const [flagImage, setFlagImage] = useState('')

  useEffect(()=> {
    setFlagImage(`https://flagsapi.com/${countryCode}/flat/64.png`)
  },[countryCode])
  return (
    <img className={`${className}`} src={flagImage} alt='' />
  )
}