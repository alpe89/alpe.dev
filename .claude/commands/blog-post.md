# Blog Post Generator

Generate blog posts for alpe.dev following the site's tone and structure.

## Instructions

When the user asks to create a blog post, follow these steps:

1. **Gather Information**
   - Ask for the topic/subject if not provided
   - Ask for any specific points they want to cover
   - Ask for the target audience (developers, general tech, personal)

2. **Generate the Post**
   - Create the MDX file with proper frontmatter
   - Write content matching the site's voice
   - Save to `src/content/posts/[slug].mdx`

## MDX Frontmatter Structure

```mdx
---
title: 'Your Title Here'
description: 'A compelling 1-2 sentence description for SEO and previews'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2']
published: true
---
```

### Frontmatter Rules

- **title**: Catchy, concise, can include humor
- **description**: Hook the reader, hint at the tone, good for SEO
- **date**: Use current date in ISO format
- **tags**: 2-4 relevant lowercase tags
- **published**: Set to `true` unless user wants a draft

## Writing Guidelines

### Voice & Tone

The site has a **witty, self-deprecating, absurdist** tone. Blog posts should:

- Be conversational, not corporate
- Include developer humor and references
- Use self-deprecating jokes about coding struggles
- Reference gaming, tech culture, or developer life
- Be relatable to other developers
- Avoid being preachy or overly serious

### Hook-First Writing

Every post should be written with social distribution in mind:

- **First 2 lines ARE the post** for most people — craft them as if they're the only thing anyone will read. These become your LinkedIn hook, your tweet, your dev.to description.
- **Include at least one quotable one-liner** per post — something punchy enough to be a standalone tweet
- **End with a question or provocative statement** — this translates directly to engagement bait on social platforms
- **Front-load the spicy take** — bury the nuance deeper, lead with the opinion

### Structure Best Practices

1. **Opening Hook** - Start with something engaging, funny, or relatable (and social-media-ready!)
2. **Short Paragraphs** - 2-4 sentences max, easy to scan
3. **Use Headers** - Break up content with `##` and `###`
4. **Code Examples** - When relevant, use fenced code blocks with language
5. **Lists** - Use bullet points for scannable content
6. **Closing** - End with a memorable line, callback to opening, or call-to-action

### Formatting

- Use `**bold**` for emphasis sparingly
- Use `*italics*` for asides or inner thoughts
- Use `inline code` for technical terms, commands, file names
- Use `> blockquotes` for important callouts or quotes
- Add `---` horizontal rules to separate major sections if needed
- **NEVER use `-` or `—` (em dash / en dash) as punctuation inside sentences.** Use commas, periods, semicolons, or restructure the sentence instead. Dashes are only for bullet points and horizontal rules.

### Length Guidelines

- **Short posts**: 300-500 words (quick thoughts, announcements)
- **Standard posts**: 800-1200 words (tutorials, opinions)
- **Long-form**: 1500-2500 words (deep dives, guides)

## Example Tone References

**Good opening:**

> "This entire website was built in two days with the help of AI. Yes, you read that right. Two days. The same amount of time it used to take me just to center a div."

**Good self-deprecation:**

> "I'm not sure if this is a testament to how far AI has come, or a warning sign that I should start learning a new trade. Maybe plumbing. Pipes don't need to be centered."

**Good closing:**

> "_— Alberto (with a little help from my AI friend)_"

## Technical Content Guidelines

When writing technical posts:

1. **Explain the "why"** before the "how"
2. **Show real code** - not contrived examples
3. **Acknowledge tradeoffs** - nothing is perfect
4. **Include gotchas** - save readers from your mistakes
5. **Test your code** - ensure examples actually work

## Tags Reference

Common tags used on the site:

- `meta` - posts about the site itself
- `ai` - AI-related content
- `typescript` - TypeScript tips/content
- `react` - React-related posts
- `career` - Career advice/thoughts
- `gaming` - Gaming references/content
- `opinion` - Hot takes and opinions
- `tutorial` - How-to guides
- `til` - Today I Learned snippets

## Output

After generating the post:

1. Save it to `src/content/posts/[slug].mdx`
2. Use kebab-case for the filename (e.g., `my-post-title.mdx`)
3. Confirm the file was created
4. Remind user to review before publishing (`published: false` for drafts)

## Social Distribution

After publishing a blog post, **always remind the user**:

> 📢 **Ready to share this with the world?** Run `/social-media-manager` to generate LinkedIn, X, and dev.to versions of this post — optimized for each platform's algorithm and audience.

### Quick Shareability Checklist

Before finalizing any post, verify:

- [ ] First 2 lines work as a standalone social media hook
- [ ] At least one line is quotable enough to be a tweet
- [ ] Post ends with something that invites discussion
- [ ] Description is compelling enough for an RSS reader or dev.to feed
