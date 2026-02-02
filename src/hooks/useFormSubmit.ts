'use client'

import { useForm } from '@formspree/react'

export function useFormSubmit(formId: string) {
  const [state, handleSubmit] = useForm(formId)

  return {
    succeeded: state.succeeded,
    submitting: state.submitting,
    errors: state.errors,
    handleSubmit,
  }
}
