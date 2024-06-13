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
      <h2 className='text-6xl mt-12 mb-8 text-slate-700'>
        GitHub Emojis
      </h2>

      <div className='container'>
        <div className='mx-2 grid xl:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 grid-cols-4 gap-4'>
          {
            emojis.map((emoji, key) => <Emoji name={emoji.name} link={emoji.link} width={50} height={50} key={key} />)
          }
        </div>
      </div>
      <p className='my-8 text-slate-700'>Made with ❤️ by <a target='_blank' rel='noreferrer' href='https://github.com/peppapig13132'>Pepp</a></p>
    </div>
  );
}

export default App;
