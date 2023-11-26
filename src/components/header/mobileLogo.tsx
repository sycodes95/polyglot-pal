import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";

export default function MobileLogo () {
  return (
    <a href={import.meta.env.VITE_DOMAIN} className="absolute gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:hidden">
      <Icon className="text-primary" path={mdiEarth} size={1.5} />
    </a>

  )
}