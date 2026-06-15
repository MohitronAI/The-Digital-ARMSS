"use client"

import { ArrowUp } from 'lucide-react'
import { motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useEffect(() => scrollY.on('change', (value) => setShow(value > 600)), [scrollY])

  if (!show) return null

  return (
    <motion.div initial={{ opacity: 0, scale: 0.88, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.88, y: 12 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="fixed bottom-6 right-6 z-50">
      <Button
        variant="secondary"
        className="h-12 w-12 rounded-full p-0 shadow-soft"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </motion.div>
  )
}