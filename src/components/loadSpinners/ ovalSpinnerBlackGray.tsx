import { Oval } from "react-loader-spinner";
import { useTheme } from "../themeProvider/theme-provider";

export default function OvalSpinnerBlackGray () {
  const { theme } = useTheme()
  return (
    <Oval
      height={20}
      width={20}
      color={`${theme === 'light' ? "#000000" : "#FFFFFF"}`}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#212121"
      strokeWidth={6}
      strokeWidthSecondary={6}

    />
  )
}