import { Loader, LoaderProps } from './loader'
import { cn } from '@/lib/utils'

function Spinner({ className, size = "sm", ...props }: LoaderProps) {
  return (
    <Loader
      role="status"
      aria-label="Loading"
      className={cn('size-4', className)}
      size={size}
      {...props}
    />
  )
}

export { Spinner }
