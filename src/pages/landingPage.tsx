import { useAuth0 } from "@auth0/auth0-react";
import Globe from "react-globe.gl";
import earthNight from "../assets/earth/earth-night.jpg"
import { useEffect, useState } from "react";
import LandingPageHeader from "../features/landingPage/landingPageHeader";
import TextsmsIcon from '@mui/icons-material/Textsms';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import TranslateIcon from '@mui/icons-material/Translate';
import StairsIcon from '@mui/icons-material/Stairs';
import aiVoiceImage from '../assets/images/aiVoiceArt.png'
import mechKeyboard from '../assets/images/mechKeyboard.png'
import translationImage from '../assets/images/translation.png'
import AtroposEffect from "@/components/atropos/atroposEffect";
import cefrLevelImage from '../assets/images/cefrImage.png'
import SignUpButton from "../features/landingPage/signUpButton";

export default function LandingPage () {
  const { loginWithRedirect } = useAuth0();

  const infoCards = [
    { 
      name: 'AI Voice', 
      icon: <VoiceChatIcon className="text-lg text-red-400"/>, 
      description: 'Choose from many realistic voice options for your AI pal for any available language.',
      imageElement: <img className="z-10 object-contain h-48 grayscale"  src={aiVoiceImage} alt="" data-atropos-offset="10" data-atropos-opacity="1;0.6"/>,
      imageSrc: aiVoiceImage

    },
    { 
      name: 'Text', 
      icon: <TextsmsIcon className="text-lg text-red-400"/>, 
      description: 'If you wish to text instead of using your voice, you can.',
      imageElement: <img className="z-10 object-contain h-48 grayscale"  src={mechKeyboard} alt="" data-atropos-offset="10" data-atropos-opacity="1;0.6"/>,
      imageSrc: mechKeyboard

    },
    { 
      name: 'CEFR', 
      icon: <StairsIcon className="text-lg text-red-400"/>, 
      description: 'Adjust language proficieny level of AI to match your needs.',
      imageElement: <img className="z-10 object-contain h-48 grayscale"  src={cefrLevelImage} alt="" data-atropos-offset="10" data-atropos-opacity="1;0.6"/>,
      imageSrc: cefrLevelImage

    },
    { 
      name: 'Translations', 
      icon: <TranslateIcon className="text-lg text-red-400"/>, 
      description: 'Translate any response from AI to your native language with a click of a button.',
      imageElement: <img className="z-10 object-contain h-48 grayscale"  src={translationImage} alt="" data-atropos-offset="10" data-atropos-opacity="1;0.6"/>,
      imageSrc: translationImage
    }
  ]

  
  return (
    <div className="relative z-[60] flex flex-col items-center w-full h-full  dark">
      <div className="absolute top-0 z-10 w-64 h-0 glow-box-red-top"></div>
      <div className="flex flex-col w-full h-full gap-16 p-4 pt-12 pb-12 border-l border-r md:pt-24 md:pb-24 max-w-7xl border-border bg-dark-gradient">
          
        <div className="relative flex flex-col items-center justify-start h-full gap-8 text-4xl font-semibold text-white transition-all duration-500 md:text-6xl text-opacity-80 font-display-2">
          <div className="z-50 flex flex-col items-center">
            <p className="text-center">
              Practice conversation skills 
            </p>
            <p className="text-center text-red-300">
              in the language of your choice 
            </p>
            
          </div>

          <div className="flex flex-col items-center max-w-2xl gap-2 p-4 text-sm text-center rounded-lg font-main border-border ">
            <span className="text-xs font-semibold text-center md:text-sm" style={{lineHeight: '200%'}}>
              Polyglot Pal is an application that helps language learners improve their speaking abilities.
              With voice chat ability and an AI powered bot with realistic sounding TTS capabilities,
              it's a way to get the practice in without having to travel.

            </span>
          </div>

          <SignUpButton/>
        </div>
          

        <div className="grid w-full h-full gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4 font-display-2">  

          {
          infoCards.map((card, index) => (
            <AtroposEffect key={index} index={index}>
              <div className="flex flex-col items-center h-full gap-4 p-8 transition-colors duration-300 border rounded-lg bg-foreground border-border hover:border-stone-700 hover:bg-opacity-30 hover:bg-black group">
                <div className="flex items-center justify-center gap-2 p-2 border rounded-lg bg-background border-border w-fit font-display-2" data-atropos-offset="5" data-atropos-opacity="1;0.6">
                  {card.icon}
                </div>
                <span className="text-lg font-bold text-primary" data-atropos-offset="3" data-atropos-opacity="1;0.6">{card.name}</span>
                <span 
                className="text-xs font-semibold text-center text-zinc-500" 
                style={{lineHeight: '1.5'}}
                data-atropos-offset="1" data-atropos-opacity="1;0.6"
                >
                {card.description}
                
                </span>
                {
                card.imageElement &&
                <div className="relative flex items-center justify-center w-full h-full">
                  {card.imageElement}
                  <div className={`absolute top-0 left-0 z-0 grid w-full h-full ${card.name === 'Text' ? 'grid-rows-2' : 'grid-cols-2'} gap-16`} data-atropos-offset="-10" data-atropos-opacity="1;0.3">
                    {
                    Array.from({length : 2}).map((_, index) => (
                      <div className="flex items-center justify-center w-full h-full" key={index}>
                        <img className={`${card.name === 'Text' ? 'w-28 h-28' : 'w-full h-full'} object-contain   invert grayscale saturate-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500`} src={card.imageSrc} alt="" />
                      </div>
                    ))
                    }
                  </div>
                </div>
                }

              </div>
            </AtroposEffect>
          ))
          }
        </div>

        <div className="flex flex-col items-center gap-8 text-white text-opacity-80">
          <span className="text-5xl font-semibold font-display-2">Why?</span>

          <span className="max-w-sm text-xs text-center text-zinc-500 md:text-sm" style={{lineHeight: '200%'}}>
            Learning or maintaining language conversation skills can be difficult if you can't travel much.
            We understand conversing with AI is not the same as conversing with real people.
            However it can be a great way to keep your skills sharp and get the practice in when options are limited.
          </span>

          <SignUpButton/>

        </div>



          {/* <div className="absolute top-0 left-0 w-full h-full" >
            

          </div> */}

        

        
      </div>
      
    </div>
  )
}

// export default function LandingPage () {
//   const { loginWithRedirect } = useAuth0();

//   // const handleLoginClick = async () => {
//   //   await loginWithRedirect();
//   // };

//   return (
//     <div className="absolute top-0 left-0 z-50 flex w-full h-full bg-white min-h-screen-d">
//       <div className="relative hidden w-full h-full p-4 md:flex md:flex-col">
//         <div className="flex gap-2">
//           <Icon className="text-stone-700" path={mdiEarth} size={1.5} />
//           <span className="text-4xl font-logo text-stone-700">
//             Polyglot Pal
//           </span>
//         </div>
//         <div className="relative flex flex-col justify-center h-full p-8 font-display">
//           <div className="z-50">
//             <p className="text-4xl text-stone-700">
//               Practice conversation skills 
//             </p>
//             <p className="text-4xl text-stone-700">
//               in the language of your choice 
//             </p>
//             <p className="text-4xl text-stone-700">
//               from the comfort of your home.
//             </p>
//           </div>
          
//           <div className="fixed left-0 -translate-y-1/2 top-1/2">
//             <Globe
//             height={800} 
//             backgroundColor="rgba(0,0,0,0)"
//             />
//           </div>

//         </div>

//       </div>
//       <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-black md:w-1/3">
//         <div className="absolute top-0 left-0 flex items-center gap-2 p-2 text-white md:hidden">
//           <Icon className="" path={mdiEarth} size={1} />
//           <span className="text-2xl font-logo ">
//             Polyglot Pal
//           </span>
//         </div>
//         <span className="text-2xl text-white font-display">Get Started</span>
//         <button className="w-40 h-12 bg-red-400 rounded-lg " onClick={()=> {
//           loginWithRedirect();
//           }}>
//           Log In
//         </button>

//       </div>
      
//     </div>
//   )
// }