import React, { Suspense } from 'react';
import { EmojiProps } from '../../interfaces/interfaces';
import { Heroicon } from '../../heroicon/Heroicon';

const EmojiImage = React.lazy(() => import('./EmojiImage'))
export const Emoji: React.FC<EmojiProps> = ({name, link, width, height}) => {
  const displayName = name.length > 16 ? name.slice(0, 16) + '...' : name;
  return (
    <div className='m-4 min-w-[120px] flex flex-col items-center'>
      <Suspense fallback={
        <span className='text-xs h-[50px] blur'>
          <Heroicon icon='photo' />
        </span>
      }>
        <EmojiImage link={link} name={name} width={width} height={height} />
      </Suspense>
      <span className='text-xs'>{displayName}</span>
    </div>
  );
}