interface FormErrorBoxProps {
  message: string;
}


export const FormErrorBox = ({ message }: FormErrorBoxProps) => {
  return (
    <span className="flex justify-center rounded-md border border-red-600/20 w-full text-sm text-red-600 p-1 pr-4 pl-4 bg-red-600/10">
      {message}
    </span>
  );
};