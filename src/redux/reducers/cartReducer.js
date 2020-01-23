import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SET_PAYMENT_PROCESSING_STATE,
  RESET_TOTAL,
  RESET_CART,
} from '../actions/action-types/cart-actions'
import { cartInitState } from '../cartInitState'

const cartReducer = (state = cartInitState, action) => {
    if (action.type === ADD_TO_CART) {
      let addedItem = state.items.find(item => item.id === action.id)
      // check if the action id exists in the addedItems
      let existed_item = state.addedItems.find(item => action.id === item.id)

      if (existed_item) {
        addedItem.quantity += action.quantity
        return {
          ...state,
          total: state.total + (addedItem.price * action.quantity)
        }
      } else { // item did not exist
        addedItem.quantity = action.quantity;
        // calculating the total
        let newTotal = state.total + (addedItem.price * action.quantity)
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total : newTotal
        }
      }
    }
   
    //INSIDE HOME COMPONENT
    // if (action.type === ADD_TO_CART) {
    //   let addedItem = state.items.find(item=> item.id === action.id)
    //   // check if the action id exists in the addedItems
    //   let existed_item= state.addedItems.find(item=> action.id === item.id)
    //   if (existed_item) {
    //     addedItem.quantity += 1 
    //     return {
    //       ...state,
    //       total: state.total + addedItem.price 
    //     }
    //   } else { // item did not exist
    //     addedItem.quantity = 1;
    //     // calculating the total
    //     let newTotal = state.total + addedItem.price 
    //     return {
    //       ...state,
    //       addedItems: [...state.addedItems, addedItem],
    //       total : newTotal
    //     }
    //   }
    // }

    if (action.type === REMOVE_ITEM) {
      let itemToRemove= state.addedItems.find(item=> action.id === item.id)
      let new_items = state.addedItems.filter(item=> action.id !== item.id)
      // calculating the total
      let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
      console.log(itemToRemove)
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      }
    }
    // INSIDE CART COMPONENT
    if (action.type=== ADD_QUANTITY) {
      let addedItem = state.addedItems.find(item=> item.id === action.id)
      addedItem.quantity += 1 
      let newTotal = state.total + addedItem.price
      return {
        ...state,
        total: newTotal,
      }
    }
    if (action.type=== SUB_QUANTITY) {
      let addedItem = state.items.find(item=> item.id === action.id) 
      // if the qt == 0 then it should be removed
      if (addedItem.quantity === 1) {
        let new_items = state.addedItems.filter(item=>item.id !== action.id)
        let newTotal = state.total - addedItem.price
        return {
          ...state,
          addedItems: new_items,
          total: newTotal
        }
      } else {
        addedItem.quantity -= 1
        let newTotal = state.total - addedItem.price
        return {
          ...state,
          total: newTotal
        }
      }
    }
    if(action.type === ADD_SHIPPING) {
      return {
        ...state,
        total: state.total + 6
      }
    }
    if (action.type=== 'SUB_SHIPPING') {
      return {
        ...state,
        total: state.total - 6
      }
  }
  if (action.type === SET_PAYMENT_PROCESSING_STATE) {
    return {
      ...state,
      paymentProcessing: action.value
    }
  }
  if (action.type === RESET_TOTAL) {
    return {
      ...state,
      total: action.value
    }
  }
  if (action.type === RESET_CART) {
    return {
      ...cartInitState
    }
  }
  else {
    return state
  }
}

export default cartReducer
