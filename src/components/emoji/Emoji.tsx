import React, { Suspense, useEffect, useState } from 'react';
import { EmojiProps } from '../../interfaces/interfaces';
import { Heroicon } from '../../heroicon/Heroicon';

const EmojiImage = React.lazy(() => import('./EmojiImage'))
export const Emoji: React.FC<EmojiProps> = ({name, link, width, height}) => {
  const [displayNameLength, setDisplayNameLength] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if(screenWidth > 640) {
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
    <div className='flex flex-col items-center'>
      <Suspense fallback={
        <span className='text-xs h-[50px] blur'>
          <Heroicon icon='photo' />
        </span>
      }>
        <EmojiImage link={link} name={name} width={width} height={height} />
      </Suspense>
      <span className='mt-2 my-4 text-xs'>{displayName}</span>
    </div>
  );
}