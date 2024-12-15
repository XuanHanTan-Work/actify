'use client'

import React from 'react'
import { motion } from 'motion/react'

const Logo = ({ height }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      height={height}
      className="fill-primary"
      viewBox="0 0 33.455 36.987"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        strokeWidth="2"
        className="stroke-on-primary"
        transform="translate(-28.272 365)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'reverse'
        }}
        d="M55.047-328.513l-5.238-13.822-14.323,5.317-3.243,8.5H29L42.821-364.5h4.359L61-328.513Zm-6.067-15.969.829,2.147-.829-2.147-5.308-13.745-7.123,18.445"
      />
    </svg>
  )
}

export default Logo
