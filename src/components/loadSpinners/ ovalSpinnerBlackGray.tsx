import { Oval } from "react-loader-spinner";

export default function OvalSpinnerBlackGray () {
  return (
    <Oval
      height={20}
      width={20}
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