import React, { Suspense, useEffect, useState } from 'react';
import { EmojiProps } from '../../interfaces/interfaces';
import { Heroicon } from '../heroicon/Heroicon';
import { CopyToClipboardComponent } from './CopyToClipboardComponent';

const EmojiImage = React.lazy(() => import('./EmojiImage'))
export const Emoji: React.FC<EmojiProps> = ({name, link, width, height}) => {
  const [displayNameLength, setDisplayNameLength] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if(screenWidth > 1024) {
        setDisplayNameLength(16);
      } else {
        setDisplayNameLength(10);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const displayName = name.length > displayNameLength ? name.slice(0, displayNameLength) + '...' : name;

  return (
    <div className='flex flex-col items-center cursor-pointer relative group'>
      <Suspense fallback={
        <span className='text-xs h-[50px] blur mt-2'>
          <Heroicon icon='photo' />
        </span>
      }>
        <EmojiImage link={link} name={name} width={width} height={height} />
      </Suspense>
      <span className='my-2 text-xs text-slate-700 select-none group-hover:opacity-10'>{displayName}</span>
      <div className='absolute w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[#F2EFE3] rounded-md border border-slate-200'>
        <CopyToClipboardComponent text={name} />
      </div>
    </div>
  );
}