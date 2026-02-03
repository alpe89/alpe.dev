'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import styles from './ContactForm.module.css';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

function ContactFormContent({ formspreeId }: { formspreeId: string }) {
  const [state, handleSubmit] = useForm(formspreeId);

  if (state.succeeded) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h4 className={styles.successTitle}>Message sent!</h4>
        <p className={styles.successText}>
          Thanks for reaching out! I&apos;ll get back to you soon.
          <br />
          <span className={styles.muted}>(Probably faster than my average deploy time)</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input label="Name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
      <ValidationError prefix="Name" field="name" errors={state.errors} className={styles.error} />

      <Input label="Email" name="email" type="email" placeholder="your@email.com" required autoComplete="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.error} />

      <Textarea label="Message" name="message" placeholder="What's on your mind?" required rows={5} />
      <ValidationError prefix="Message" field="message" errors={state.errors} className={styles.error} />

      <Button type="submit" disabled={state.submitting} loading={state.submitting} fullWidth>
        {state.submitting ? 'Sending...' : 'Send Message'}
      </Button>

      <p className={styles.disclaimer}>I promise not to spam you. I can barely keep up with my own inbox.</p>
    </form>
  );
}

export function ContactForm() {
  if (!FORMSPREE_ID) {
    return (
      <div className={styles.unavailable}>
        Contact form is currently unavailable. Please reach out via social links.
      </div>
    );
  }

  return <ContactFormContent formspreeId={FORMSPREE_ID} />;
}
