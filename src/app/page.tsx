import { ListColumn } from '@/components/list-column';
import { ExternalLink } from '@/components/external-link';
import { getLatestPlayedGames } from '@/services/steam';

const minutesToHours = (minutes: number) => (minutes / 60).toFixed(2);

export default async function Home() {
  const games = await getLatestPlayedGames({ count: 3 });
  const formattedGames =
    games?.map(game => ({
      ...game,
      playtime_2weeks: minutesToHours(game.playtime_2weeks),
      playtime_forever: minutesToHours(game.playtime_forever),
      url: `https://store.steampowered.com/app/${game.appid}`,
    })) ?? [];

  return (
    <main className='flex flex-col gap-8 max-w-lg mx-auto'>
      <header className='w-full py-8'>
        <div className='mx-auto border rounded-md text-center w-fit px-2 h-8 grid place-items-center'>
          <abbr title='Work in progress'>wip</abbr>
        </div>
      </header>
      <section className='mt-12'>
        <p className='leading-4'>Guilherme Victor</p>
        <h1 className='text-3xl sm:text-2xl text-primary font-serif'>
          empathetic frontend developer.
          <br />
          learning golang. <br />
          neovim user.
        </h1>
        <p>
          You can find me on{' '}
          <ExternalLink href='https://x.com/oguivictor'>Twitter</ExternalLink>{' '}
          or{' '}
          <ExternalLink href='https://linkedin.com/in/guilhermeviictor'>
            Linkedin
          </ExternalLink>{' '}
          and see my code on{' '}
          <ExternalLink href='https://github.com/guivictorr'>
            Github
          </ExternalLink>
        </p>
      </section>
      <section className='grid grid-cols-1 gap-2 space-y-8 sm:space-y-0 sm:grid-cols-3 mt-14'>
        <ListColumn title='Crafts'>
          <ListColumn.Item
            title='Animated Tabs'
            description='Animated Tabs built with framer motion'
            href='/writing/post'
          />
        </ListColumn>

        <ListColumn title='Writing'>
          <ListColumn.Item
            title='Accessibility on web'
            description='How to build accessible websites'
            href='/writing/post'
          />
        </ListColumn>

        <ListColumn title='Gaming'>
          {formattedGames.map(game => (
            <ListColumn.Item
              key={game.appid}
              title={game.name}
              description={`${game.playtime_2weeks}h past two weeks`}
              href={game.url}
            />
          ))}
        </ListColumn>
      </section>
    </main>
  );
}
