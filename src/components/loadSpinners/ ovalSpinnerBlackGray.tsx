import { Oval } from "react-loader-spinner";

export default function OvalSpinnerBlackGray () {
  return (
    <Oval
      height={25}
      width={25}
      color="#000000"
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