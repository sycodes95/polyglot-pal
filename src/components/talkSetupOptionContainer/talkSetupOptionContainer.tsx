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
      className={`${className} flex items-center gap-2 border-2 rounded-2xl border-stone-300 p-1`}
    >
      {children}
    </div>
  );
}

