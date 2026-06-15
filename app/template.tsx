"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageTransition } from '@/lib/animations'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}