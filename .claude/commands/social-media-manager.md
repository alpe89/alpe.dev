# Social Media Manager

Generate platform-optimized social posts from a blog post to maximize reach and engagement.

## Instructions

When the user runs this command, generate social media content for **all 3 platforms** (LinkedIn, X, dev.to) in one shot.

### Input

The user will provide either:

- A blog post slug (e.g., `hello-world`)
- Nothing — in which case, read the most recent post from `src/content/posts/`

**Always read the full blog post content** before generating. Don't just rephrase the title.

---

## Platform 1: LinkedIn

### Format

```
[LINKEDIN POST]

<post body>

[FIRST COMMENT]

<comment with blog link>
```

### Rules

- **Hook first**: Bold/contrarian statement in first 2 lines (under 210 characters — that's the truncation point before "...see more")
- **No external links in the post body**: End with "🔗 Link in comments" — LinkedIn throttles posts with links
- **Format**: 1-2 sentence paragraphs, line breaks between every thought, use "→" or "•" bullets
- **End with a question**: Comments >>> likes for algorithm reach
- **Tone**: Witty, self-deprecating, opinionated — but slightly more professional than X. Never corporate.
- **Length**: 800-1300 characters (LinkedIn sweet spot for engagement)
- **Hashtags**: 3-5 relevant ones at the bottom
- **First comment**: Separate text block with the actual blog link (`https://alpe.dev/blog/[slug]`) and a brief teaser

---

## Platform 2: X (Twitter)

### Generate TWO formats:

#### Single Tweet (under 280 chars)

- Punchy, opinionated, quotable hot take from the post
- Link at the end (X doesn't throttle links like LinkedIn)
- No hashtags (they look tryhard on X)

#### Thread (3-7 tweets)

```
[X THREAD]

🧵 1/ <hook>

2/ <point>

3/ <point>

...

N/ <CTA + blog link>
```

- Tweet 1: Hook + "🧵" — must make people stop scrolling
- Middle tweets: One idea per tweet, each should stand alone as a banger
- Last tweet: CTA + blog link
- **Tone**: Most casual/unhinged of all platforms. Memes, tech jokes, hot takes. Full roast mode.

---

## Platform 3: dev.to

### Format

```
[DEV.TO POST]

---
title: "Post Title"
published: true
description: "Compelling description"
tags: tag1, tag2, tag3, tag4
canonical_url: https://alpe.dev/blog/[slug]
---

<full blog post content in standard markdown>
```

### Rules

- **canonical_url**: ALWAYS set to `https://alpe.dev/blog/[slug]` — this points SEO back to the main site, no duplicate content penalty
- **Content**: Full blog post adapted from MDX to standard markdown
  - Strip any custom React/MDX components
  - Convert to plain markdown equivalents
  - Keep all code blocks, images, and formatting
- **Tags**: Map to dev.to's tag system (max 4 tags). Use popular ones: `webdev`, `javascript`, `typescript`, `react`, `ai`, `career`, `programming`, `beginners`
- **Description**: Compelling hook for dev.to's feed (under 200 chars)

---

## Voice & Tone (All Platforms)

- Maintain the author's voice: **witty, self-deprecating, absurdist**
- Each platform version should feel **native**, not like a copy-paste
- Reference specific content from the post — don't be vague
- Include at least one quotable one-liner per platform

---

## Posting Tips (include at end of output)

After generating all content, add a brief strategy section:

```
---
📋 POSTING STRATEGY

LinkedIn:
- Best times: Tue-Thu, 8-10am or 12-1pm (your timezone)
- Post first, then immediately drop the first comment with the link
- Reply to every comment in the first hour — algorithm loves it

X:
- Best times: Mon-Fri, 8-10am or 5-7pm
- Post the single tweet first. If it gets traction, drop the thread 2-4 hours later
- Quote-tweet your own thread with a spicy take for extra reach

dev.to:
- Publish any day, dev.to is less time-sensitive
- The canonical URL means Google won't penalize duplicate content
- Engage with comments — dev.to community rewards interaction
---
```

## Output

Present all 3 platform outputs clearly separated with headers, ready to copy-paste.
