interface OptionsLayout {
  children?: React.ReactNode;
  className?: string;
}

export const OptionsLayout = ({ children, className }: OptionsLayout) => {
  return (
    <div className={`${className} flex flex-col w-fit gap-4 absolute top-4 left-4 z-10 backdrop-blur-md rounded-md`}>
      {children}
    </div>
  );
};