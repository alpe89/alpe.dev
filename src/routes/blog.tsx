import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { PromptLine, TerminalHero } from '../components/Terminal';
import { getFortune } from '../lib/fortune';

export const Route = createFileRoute('/blog')({
  head: () => ({
    meta: [
      { title: 'blog :: alpe.dev' },
      {
        name: 'description',
        content: 'Blog rebooted, new posts compiling. Fresh nerd fortunes in the meantime.',
      },
    ],
  }),
  component: Blog,
});

function Blog() {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['fortune'],
    queryFn: () => getFortune(),
    staleTime: Infinity,
  });

  return (
    <main className="wrap">
      <TerminalHero path="~/blog">
        <PromptLine path="~/blog">ls -la ./posts</PromptLine>
        <p className="bio">
          total 0 · the old posts have been <span className="hl">rm -rf</span>'d on purpose. New writing is compiling,
          slowly, between naps (the baby's and mine).
        </p>
        <p className="bio">
          Stay tuned. Meanwhile, have a <span className="hl-c">fortune</span>:
        </p>

        <PromptLine path="~/blog" className="mt-8">
          fortune
        </PromptLine>
        <blockquote
          className="border-l-2 border-(--accent-dim) pl-4 transition-opacity duration-300"
          style={{ opacity: isFetching ? 0.3 : 1 }}
        >
          <p className="bio hl">{data ? data.quote : 'loading wisdom...'}</p>
          {data ? <p className="mt-2 text-[13px] text-(--muted)">// {data.author}</p> : null}
        </blockquote>

        <button
          type="button"
          className="more mt-6 cursor-pointer border-none bg-transparent font-[inherit]"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          fortune --again
        </button>
      </TerminalHero>
    </main>
  );
}
