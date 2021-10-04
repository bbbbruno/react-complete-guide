import { useContext, useEffect, useState } from 'react'

import CartContext from '../../store/CartContext'
import CartIcon from '../Cart/CartIcon'

import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext)

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  useEffect(() => {
    if (!cartCtx.items.length) return

    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [cartCtx.items])

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  return (
    <button
      className={`${classes.button} ${btnIsHighlighted ? classes.bump : ''}`}
      onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
