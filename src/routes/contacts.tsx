import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/contacts')({
  head: () => ({
    meta: [{ title: 'contacts :: alpe.dev' }, { name: 'description', content: 'Say hello to Alberto Pertusi.' }],
  }),
  component: Contacts,
});

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

interface ContactPayload {
  email: string;
  message: string;
}

async function sendMessage(payload: ContactPayload) {
  if (!FORMSPREE_ID) {
    throw new Error('form endpoint not configured');
  }
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`formspree responded ${res.status}`);
  }
  return res.json() as Promise<unknown>;
}

function Contacts() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const mutation = useMutation({ mutationFn: sendMessage });

  return (
    <main className="wrap">
      <header className="py-20">
        <div className="term">
          <div className="term-bar">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="title">alpe@dev: ~/contacts</span>
          </div>
          <div className="term-body">
            <div className="prompt-line">
              <span className="u">alpe@dev</span>:~/contacts$ curl -X POST /say-hello
            </div>

            {mutation.isSuccess ? (
              <p className="bio">
                <span className="hl">201 Created</span> · message queued. I answer faster than my deploy pipeline,
                usually.
              </p>
            ) : (
              <form
                className="flex max-w-[480px] flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate({ email, message });
                }}
              >
                <label className="flex flex-col gap-1 text-[13px] text-(--muted)">
                  --from
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-md border border-(--border) bg-(--bg-3) px-3 py-2 font-[inherit] text-[14px] text-(--text) outline-none focus:border-(--accent-dim)"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[13px] text-(--muted)">
                  --data
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="your message, plain text or JSON, I don't judge"
                    className="resize-y rounded-md border border-(--border) bg-(--bg-3) px-3 py-2 font-[inherit] text-[14px] text-(--text) outline-none focus:border-(--accent-dim)"
                  />
                </label>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="more cursor-pointer self-start border-none bg-transparent font-[inherit] disabled:opacity-50"
                >
                  {mutation.isPending ? 'sending...' : 'send --now'}
                </button>
                {mutation.isError ? (
                  <p className="text-[13px] text-(--warn)">
                    exit 1: {(mutation.error as Error).message}. Try again or ping me on LinkedIn.
                  </p>
                ) : null}
              </form>
            )}

            <div className="prompt-line mt-10">
              <span className="u">alpe@dev</span>:~/contacts$ ./resume --generate-pdf
            </div>
            <p className="bio">
              <span className="hl-c">coming soon</span>: this will compile my resume to PDF on the fly, straight from
              structured data. Feature flag currently off while I argue with myself about the layout.
            </p>
          </div>
        </div>
      </header>
    </main>
  );
}
