import { useReducer } from 'react'

import CartContext from './CartContext'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems
    if (existingCartItem) {
      state.items[existingCartItemIndex] = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
    } else {
      updatedItems = [...state.items, action.item]
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    }
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingCartItem.price

    let updatedItems
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      state.items[existingCartItemIndex] = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      }
      updatedItems = [...state.items]
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  return defaultCartState
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item })
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
