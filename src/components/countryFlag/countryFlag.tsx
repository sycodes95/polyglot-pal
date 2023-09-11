type CountryFlagProps = {
  countryCode : string;
  className? : string;
}

export default function CountryFlag ({ countryCode, className } : CountryFlagProps) {
  return (
    <img className={`${className}`} src={`https://flagsapi.com/${countryCode}/flat/64.png`}/>
  )
}