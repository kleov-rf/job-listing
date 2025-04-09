import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../utils/cn.ts'
import {ComponentPropsWithoutRef, ComponentRef} from "react";

const Label = React.forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
