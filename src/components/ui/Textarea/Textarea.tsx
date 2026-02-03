'use client'

import { forwardRef } from 'react'
import styles from './Textarea.module.css'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, required, className = '', id, ...props },
    ref
  ) => {
    const textareaId = id || props.name
    const hasError = !!error

    return (
      <div
        className={`${styles.wrapper} ${hasError ? styles.error : ''} ${className}`}
      >
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={styles.textarea}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />
        {error && (
          <span
            id={`${textareaId}-error`}
            className={styles.errorMessage}
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={`${textareaId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
