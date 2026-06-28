import { usePromptLimit } from '../../hooks/usePromptLimit'
import { MAX_PROMPT } from '../../config/env'

export function PromptCounter() {
  const { count, isExceeded } = usePromptLimit()

  return (
    <div className="border-b border-[#334155] px-6 py-3">
      <p className="text-center text-sm text-gray-400">
        Prompt Today{' '}
        <span className={isExceeded ? 'font-semibold text-red-500' : 'font-semibold text-green-500'}>
          {count} / {MAX_PROMPT}
        </span>
      </p>
    </div>
  )
}
