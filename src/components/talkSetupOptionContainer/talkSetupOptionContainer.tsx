import { ReactNode } from "react";

type TalkOptionSetupContainerProps = {
  className?: string;
  children: ReactNode;
};

export default function TalkOptionSetupContainer({
  className,
  children,
}: TalkOptionSetupContainerProps) {
  return (
    <div
      className={`${className} w-full md:h-10 flex items-center gap-2  rounded-2xl border-stone-300`}
    >
      {children}
    </div>
  );
}

