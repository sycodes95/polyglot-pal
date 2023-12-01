import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
type MobileLogoProps = {
  className?: string;
}
export default function MobileLogo ({className} : MobileLogoProps) {
  return (
    <a href={import.meta.env.VITE_DOMAIN} className={`${className}`}>
      <Icon className="text-primary" path={mdiEarth} size={1.5} />
    </a>

  )
}