import { useEffect, useState } from 'react';
import './App.css';
import { getEmojis } from './services/githubApiService';
import { Emoji } from './components/emoji/Emoji';
import { EmojiData } from './interfaces/interfaces';

function App() {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const emojis = await getEmojis();
      const emojiArray = Object.entries(emojis).map(([key, value]) => ({
        name: key,
        link: value,
      }));
      setEmojis(emojiArray);
    }

    fetchData()
  }, []);

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <h2 className='text-4xl mt-12 mb-8 text-slate-700'>
        GitHub Emojis
      </h2>

      <div className='flex flex-wrap w-full justify-items-center'>
        {
          emojis.map((emoji, key) => <Emoji name={emoji.name} link={emoji.link} width={50} height={50} key={key} />)
        }
      </div>
      <p className='my-8 text-slate-700'>Made with ❤️ by <a target='_blank' rel='noreferrer' href='https://github.com/peppapig13132'>Pepp</a></p>
    </div>
  );
}

export default App;
