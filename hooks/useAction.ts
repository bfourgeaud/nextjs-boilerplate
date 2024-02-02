import { useState, useCallback } from "react";
import { ActionState, FieldErrors } from "@/lib/actions";

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void,
  onError?: (errors: string) => void,
  onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [data,setData] = useState<TOutput | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const execute = useCallback(
    async (input: TInput) => {
      setLoading(true)
      try {
        const result = await action(input)
        if(!result) return

        if(result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }

        if(result.error) {
          setError(result.error)
          options.onError?.(result.error)
        }
        if(result.data) {
          setData(result.data)
          setError(undefined)
          setFieldErrors(undefined)
          options.onSuccess?.(result.data)
        }

      } finally {
        setLoading(false)
        options.onComplete?.()
      }
    },
    [action, options]
  )

  const reset = () => {
    setError(undefined)
    setFieldErrors(undefined)
    setLoading(false)
    setData(undefined)
  }

  return {
    execute,
    reset,
    fieldErrors,
    error,
    data,
    loading
  }
}