import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-center w-full h-20 bg-white">
      <div className="w-full max-w-5xl p-4">
        <div className="flex items-center gap-2">
          <Icon className="text-stone-700" path={mdiEarth} size={1.5} />
          <span className="text-4xl font-logo text-stone-700">
            Polyglot Pal
          </span>
        </div>
      </div>
    </div>
  );
}
