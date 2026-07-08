import { createServerFn } from '@tanstack/react-start';

const fortunes = [
  {
    quote:
      'There are only two hard things in Computer Science: cache invalidation, naming things, and off-by-one errors.',
    author: 'unknown, probably tired',
  },
  {
    quote: 'It works on my machine.',
    author: 'every developer, moments before disaster',
  },
  {
    quote:
      'A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 99999999 beers. Orders -1 beers. Orders a lizard.',
    author: 'classic QA folklore',
  },
  {
    quote: 'Weeks of coding can save you hours of planning.',
    author: 'ancient scrum proverb',
  },
  {
    quote: "There is no cloud. It's just someone else's computer.",
    author: 'sticker wisdom',
  },
  {
    quote: "!false (it's funny because it's true)",
    author: 'boolean humor department',
  },
  {
    quote: 'The best thing about a boolean is that even if you are wrong, you are only off by a bit.',
    author: 'unknown',
  },
  {
    quote: 'I would love to change the world, but they will not give me the source code.',
    author: 'every engineer ever',
  },
  {
    quote: 'Java is to JavaScript what car is to carpet.',
    author: 'Chris Heilmann',
  },
  {
    quote: 'Programming is 10% writing code and 90% understanding why it is not working.',
    author: 'unknown',
  },
  {
    quote: 'Real programmers count from 0.',
    author: 'unknown',
  },
  {
    quote: 'Sleep is deprecated and will be removed in a future release.',
    author: 'dad.service changelog',
  },
  {
    quote: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    quote:
      'The most effective debugging tool is still careful thought, coupled with judiciously placed print statements.',
    author: 'Brian Kernighan',
  },
  {
    quote: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
  },
];

export const getFortune = createServerFn({ method: 'GET' }).handler(() => {
  const index = Math.floor(Math.random() * fortunes.length);
  return { ...fortunes[index], index };
});
