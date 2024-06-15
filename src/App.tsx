import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getEmojis } from './services/githubApiService';
import { Emoji } from './components/emoji/Emoji';
import { EmojiData } from './interfaces/interfaces';
import { useInView } from 'react-intersection-observer';
import GithubCorner from 'react-github-corner';

function App() {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);
  const [visibleEmojis, setVisibleEmojis] = useState<EmojiData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const emojis = await getEmojis();
      
      const _emojis = Object.entries(emojis).map(([key, value]) => ({
        name: key,
        link: value,
      }));
      setTotal(_emojis.length);
      setEmojis(_emojis);
      setVisibleEmojis(_emojis.slice(0, 84));
    }

    fetchData();
  }, []);

  const loadMoreEmojis = useCallback(() => {
    if(loading || visibleEmojis.length >= total) return;

    setLoading(true);
    setTimeout(() => {
      setVisibleEmojis(prev => [
        ...prev,
        ...emojis.slice(prev.length, prev.length + 36),
      ]);
      setLoading(false);
    }, 200);
  }, [loading, visibleEmojis, emojis, total]);

  useEffect(() => {
    if(inView) {
      loadMoreEmojis();
    }
  }, [inView, loadMoreEmojis]);

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <h2 className='md:text-6xl text-4xl mt-12 mb-4 text-slate-700 select-none'>
        GitHub Emojis
      </h2>

      <p className='text-lg my-4 text-slate-700 select-none'>Total: {new Intl.NumberFormat().format(total)}</p>

      <div className='container'>
        <div className='mx-2 grid xl:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 grid-cols-4 gap-4'>
          {
            visibleEmojis.map((emoji, key) => <Emoji name={emoji.name} link={emoji.link} width={50} height={50} key={key} />)
          }
        </div>
        <div ref={ref}></div>
        {loading && <div className='w-full my-4 text-slate-700 text-center'><p>Loading more emojis...</p></div>}
      </div>
      <p className='my-8 text-slate-700 select-none'>Made with ❤️ by <a target='_blank' rel='noreferrer' href='https://github.com/peppapig13132'>Pepp</a></p>
      <GithubCorner
        href='https://github.com/peppapig13132/GitHub-Emojis'
        size={120}
        bannerColor='#334155'
      />
    </div>
  );
}

export default App;
