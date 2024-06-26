'use client'

import React, {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useState
} from 'react'

import { Icon } from './../Icon'
import { ListContext } from './ListContext'
import { motion } from 'framer-motion'
import { tv } from 'tailwind-variants'

const variants = tv({
  base: 'px-4 cursor-pointer relative isolate'
})

interface ListItemProps extends React.ComponentProps<'li'> {
  label?: string
  icon?: React.ReactNode
}

const ListGroup = (props: ListItemProps) => {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { className, label, icon, children, ...rest } = props

  const { layoutId } = useContext(ListContext)

  return (
    <li {...rest} className={variants({ className })}>
      <div
        className="h-14 flex items-center justify-between"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={() => setOpen(!open)}
      >
        {icon}
        {label}
        <div className={`transition-transform ${open ? 'rotate-90' : ''}`}>
          <Icon>keyboard_arrow_down</Icon>
        </div>
      </div>
      {hovered && (
        <motion.div
          layoutId={layoutId}
          className="h-14 absolute inset-0 bg-surface-variant z-[-1]"
        />
      )}
      <div
        className={`transition-all duration-300 ease-in-out grid ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <ul className="overflow-hidden">
          {Children.map(
            children,
            (child) =>
              isValidElement(child) &&
              cloneElement(child, {
                ...child.props
              })
          )}
        </ul>
      </div>
    </li>
  )
}

ListGroup.displayName = 'Actify.ListGroup'

export { ListGroup }
