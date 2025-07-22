'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'gradient-primary text-white hover:shadow-medium focus:ring-primary-500',
      secondary: 'gradient-secondary text-white hover:shadow-medium focus:ring-secondary-500',
      accent: 'gradient-accent text-white hover:shadow-medium focus:ring-accent-500',
      ghost: 'bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-neutral-500',
      glass: 'glass hover:shadow-medium focus:ring-neutral-500'
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    const { onAnimationStart, onAnimationEnd, ...motionProps } = props

    return (
      <motion.button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -2 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        ref={ref}
        {...motionProps}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
          {children}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
