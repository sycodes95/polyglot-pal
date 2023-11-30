import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';

export default function Footer () {
  return (
    <div className="bottom-0 flex justify-center w-full h-12 bg-background">
      <div className="max-w-7xl">
        <div className="flex items-center h-full gap-1 text-primary">
          <span className='whitespace-nowrap'>Made with</span>
          <Icon className='text-red-600' path={mdiHeart} size={0.7} />
          <span className='whitespace-nowrap'>by</span>
          <a className="text-red-400 hover:underline" href="https://github.com/sycodes95" target="_blank">sycodes95</a>
        </div>
      </div>
    </div>
  )
} 