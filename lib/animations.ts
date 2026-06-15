import type { Transition, Variants } from 'framer-motion'

export const easing = [0.22, 1, 0.36, 1] as const

export const premiumTransition: Transition = {
  duration: 0.45,
  ease: easing
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: easing, when: 'beforeChildren', staggerChildren: 0.08, delayChildren: 0.04 } },
  exit: { opacity: 0, y: 16, filter: 'blur(8px)', transition: { duration: 0.3, ease: easing } }
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06
    }
  }
}

export const staggerContainerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03
    }
  }
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: premiumTransition
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.35, ease: easing }
  }
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: premiumTransition
  }
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: premiumTransition
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easing }
  }
}

export const wordStagger = (delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay
    }
  }
})

export const letterBounce: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.85, rotateX: -32 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 220, damping: 18, mass: 0.8 }
  }
}

export const cardHover = {
  y: -10,
  scale: 1.03,
  transition: { type: 'spring', stiffness: 260, damping: 22 }
}

export const gentleFloat = {
  y: [0, -12, 0],
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const }
}

export const slowGradient = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const }
}

export const subtleGradientShift = {
  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
  transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' as const }
}
