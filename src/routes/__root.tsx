import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/400-italic.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Alberto Pertusi :: alpe.dev' },
      {
        name: 'description',
        content: 'Alberto Pertusi, Full Stack Software Engineer in Milan. Can lead humans, prefers dogs.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'alpe.dev' },
      { property: 'og:title', content: 'Alberto Pertusi :: alpe.dev' },
      {
        property: 'og:description',
        content: 'Full Stack Software Engineer in Milan. Can lead humans, prefers dogs.',
      },
      { property: 'og:url', content: 'https://alpe.dev' },
      { property: 'og:image', content: 'https://alpe.dev/avatar.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Alberto Pertusi :: alpe.dev' },
      { name: 'twitter:image', content: 'https://alpe.dev/avatar.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'alternate icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="vignette" aria-hidden="true" />
        <Nav />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
