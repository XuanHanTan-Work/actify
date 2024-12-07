'use client'

import { useControllableState, useOnClickOutside } from '../../hooks'

import { EASING } from '../../animations'
import { Elevation } from '../Elevation'
import React from 'react'
import clsx from 'clsx'
import styles from './menu.module.css'

interface PopoverMenuContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}
export const PopoverMenuContext =
  React.createContext<PopoverMenuContextProps | null>(null)

export interface PopoverMenuRef {
  show: () => void
  close: () => void
  toggle: () => void
}

interface PopoverMenuProps extends Omit<React.ComponentProps<'div'>, 'ref'> {
  anchor?: string
  positioning?: 'absolute' | 'popover' | 'fixed' | 'document'
  /** Skips the opening and closing animations */
  quick?: boolean
  typeaheadDelay?: number
  anchorCorner?: string
  menuCorner?: string
  stayOpenOnOutsideClick?: boolean
  stayOpenOnFocusout?: boolean
  skipRestoreFocus?: boolean
  defaultFocus?: string
  noNavigationWrap?: boolean
  isSubmenu?: boolean
  ref?: React.Ref<PopoverMenuRef>
  open?: boolean
  defaultOpen?: boolean
  setOpen?: (open: boolean) => void
  setFocused?: (focus: boolean) => void
}

export const PopoverMenu = (props: PopoverMenuProps) => {
  const {
    ref,
    style,
    children,
    className,
    setFocused,
    defaultOpen,
    open: propOpen,
    setOpen: propSetOpen,
    positioning = 'absolute',
    ...rest
  } = props

  const menuRef = React.useRef<HTMLDivElement>(null)
  const slotRef = React.useRef<HTMLDivElement>(null)

  const [open, setOpen] = useControllableState({
    value: propOpen,
    onChange: propSetOpen,
    defaultValue: defaultOpen
  })

  useOnClickOutside(menuRef, () => {
    setOpen(false)
    setFocused?.(false)
  })

  React.useImperativeHandle(
    ref,
    () => ({
      show: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!open)
    }),
    []
  )

  const animateOpen = async () => {
    const surfaceEl = menuRef.current
    const slotEl = slotRef.current
    if (!surfaceEl || !slotEl) return true
    const openingUpwards = false
    // needs to be imperative because we don't want to mix animation and Lit
    // render timing
    surfaceEl.classList.toggle(styles['animating'], true)
    const height = surfaceEl.offsetHeight
    const items = React.Children.toArray(children)

    const FULL_DURATION = 500
    const SURFACE_OPACITY_DURATION = 50
    const ITEM_OPACITY_DURATION = 250
    // We want to fit every child fade-in animation within the full duration of
    // the animation.
    const DELAY_BETWEEN_ITEMS =
      (FULL_DURATION - ITEM_OPACITY_DURATION) / items.length
    const surfaceHeightAnimation = surfaceEl.animate(
      [{ height: '0px' }, { height: `${height}px` }],
      {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED
      }
    )
    // When we are opening upwards, we want to make sure the last item is always
    // in view, so we need to translate it upwards the opposite direction of the
    // height animation
    const upPositionCorrectionAnimation = slotEl.animate(
      [
        { transform: openingUpwards ? `translateY(-${height}px)` : '' },
        { transform: '' }
      ],
      { duration: FULL_DURATION, easing: EASING.EMPHASIZED }
    )
    const surfaceOpacityAnimation = surfaceEl.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      SURFACE_OPACITY_DURATION
    )

    let resolveAnimation = (_: boolean) => {}
    const animationFinished = new Promise((resolve) => {
      resolveAnimation = resolve
    })

    surfaceHeightAnimation.addEventListener('finish', () => {
      surfaceEl.classList.toggle(styles['animating'], false)
      resolveAnimation(false)
    })
    return await animationFinished
  }

  React.useEffect(() => {
    if (open) {
      animateOpen()
    }
  }, [open])

  const classes = clsx(styles['menu'], open && styles['open'], className)

  return (
    <div {...rest} ref={menuRef} style={style} className={classes}>
      <Elevation style={{ '--md-elevation-level': 2 } as React.CSSProperties} />
      <PopoverMenuContext value={{ open, setOpen }}>
        <div className={styles['items']}>
          <div className={styles['item-padding']} ref={slotRef}>
            {children}
          </div>
        </div>
      </PopoverMenuContext>
    </div>
  )
}
