'use client';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  color?: string; // use this prop to change the background color
  sizes?: 'sm' | 'md' | 'lg' | 'xl'; // use this prop to adjust the spinner's dimension
};

/**
 * Use the spinner component as a loader indicator in your projects when fetching data based on an animated SVG using the utility classes from Tailwind CSS
 * @docs https://flowbite.com/docs/components/spinner/
 */
export function Spinner({ sizes = 'sm', color = 'text-white', className }: Props) {
  return (
    <div role="status">
      <svg
        className={cn(
          'animate-spin',
          color,
          {
            'h-4 w-4': sizes === 'sm',
            'h-6 w-6': sizes === 'md',
            'h-8 w-8': sizes === 'lg',
            'h-10 w-10': sizes === 'xl',
          },
          className,
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
