import React from 'react';

interface EmojiImageProps {
  link: string;
  name: string;
  width: number;
  height: number;
}

const EmojiImage: React.FC<EmojiImageProps> = ({ link, name, width, height }) => {
  return <img src={link} alt={name} width={width} height={height} className='select-none' />;
}

export default EmojiImage;