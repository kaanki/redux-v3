# Redux Toolkit

#### Doküman

[Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)

#### Template Yükle

```sh
npx create-react-app my-app --template redux
```

- @latest

```sh
npx create-react-app@latest my-app --template redux
```

#### Var Olan Uygulamada

```sh
npm install @reduxjs/toolkit react-redux
```

#### @reduxjs/toolkit

Redux Toolkit neleri içeriyor?

-Immutable state yönetimi için Immer.
-Selector kütüphanesi olarak Reselect.
-Async işlemler için Redux-thunk.
-Debugging için Redux-Devtools.

#### Extra

- redux devtools
- combineReducer

#### react-redux

uygulamanızı redux'a bağlar

#### Setup Store

- Slice ve store.js

```js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```

#### Setup Provider

- index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import store & provider
import { store } from './store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
```

#### Setup Cart Slice

- uygulama özelliği
- özellikler klasörü oluştur
- cartSlice.js oluştur

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
})

console.log(cartSlice)

export default cartSlice.reducer
```

- store.js

```js
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})
```

#### Redux DevTools

- extension

#### Store değerlerine ulaşma

- components/Navbar.js oluştur

```js

import { useSelector } from 'react-redux'
import { BsFillBasketFill } from 'react-icons/bs'


const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart)

  return  return  return (
    <nav>
      <div className='nav-container'>
        <h3>Siparişlerim</h3>
        <div className='nav-items'>
          <p>{quantity}</p>
          <BsFillBasketFill className='nav-icon' />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
```

#### index.css

.nav-container {
display: flex;
justify-content: space-around;
background-color: #19A7CE;
color: #fff
}

.nav-items {
position: relative;
}

.nav-icon {
position: absolute;
bottom: 10px;
right: 10px;
}

#### Setup Cart

- cartSlice.js

```js
import orderItems from '../../orderItems'

const initialState = {
  cartItems: orderItems,
  quantity: 0,
  total: 0,
}
```

- OrderList.js ve OrderItem.js oluştur

- OrderList.js

```js
import OrderItem from './OrderItem'
import { useSelector } from 'react-redux'

const OrderList = () => {
  const { cartItems, total, quantity } = useSelector((state) => state.cart)

  if (quantity < 1) {
    return (
      <section>
        <header>
          <h2>Sepetiniz</h2>
          <h4>Boş</h4>
        </header>
      </section>
    )
  }
  return (
    <section>
      <header>
        <h2>Sepetiniz</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <OrderItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h4>
            toplam tutar: <span>${total}</span>
          </h4>
        </div>
        <button>Sepeti Temizle</button>
      </footer>
    </section>
  )
}

export default OrderList
```

- OrderItem.js

```js
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
const OrderItem = ({ id, img, title, price, quantity }) => {
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div className='cart-info'>
        <h4>{title}</h4>
        <h4>{price}TL</h4>
        <div>
          <button>
            <BsChevronUp />
          </button>
          <p>{quantity}</p>
          <button>
            <BsChevronDown />
          </button>
        </div>
        <button>Sil</button>
      </div>
    </article>
  )
}

export default OrderItem
```

#### css

.cart {
text-align: center;
}

.cart-clear {
padding: 8px;
border: none;
border-radius: 16px;
background-color: #19A7CE;
color: #fff;
}

.cart-item {
display: flex;
justify-content: space-between;
margin: 75px 150px;
}

.cart-info {
text-align: right;
}

.cart-button {
border: none;
background-color: #fff;
}

.cart-quantity {
margin-right: 8px;
}

.cart-delete {
padding: 8px;
border: none;
border-radius: 16px;
background-color: #ff2219;
color: #fff;
margin-top: 20px;
}

#### İlk Reducer

- cartSlice.js
- Immer kütüphanesi

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
  },
})

export const { clearCart } = cartSlice.actions
```

- action oluştur

```js
const ACTION_TYPE = 'ACTION_TYPE'

const actionCreator = (payload) => {
  return { type: ACTION_TYPE, payload: payload }
}
```

- OrderList.js

```js
import OrderItem from './OrderItem'
import { useDispatch, useSelector } from 'react-redux'

const OrderList = () => {
  const dispatch = useDispatch()

  return (
    <button className='cart-clear' onClick={() => dispatch(clearCart())}>
      sepeti temizle
    </button>
  )
}

export default OrderList
```

#### Kaldırma, Arttırma, Azaltma

- cartSlice.js

```js
import { createSlice } from '@reduxjs/toolkit'
import orderItems from '../../orderItems'

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.quantity = cartItem.quantity + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.quantity = cartItem.quantity - 1
    },
    calculateTotals: (state) => {
      let quantity = 0
      let total = 0
      state.cartItems.forEach((item) => {
        quantity += item.quantity
        total += item.quantity * item.price
      })
      state.quantity = quantity
      state.total = total
    },
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
```

- OrderItem.js

```js
import { useDispatch } from 'react-redux'
import { removeItem, increase, decrease } from '../features/cart/cartSlice'

const OrderItem = ({ id, img, title, price, quantity }) => {
  const dispatch = useDispatch()

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div className='cart-info'>
        <h4>{title}</h4>
        <h4>{price}TL</h4>
        <div>
          <button
            className='cart-button'
            onClick={() => {
              dispatch(increase({ id }))
            }}
          >
            <BsChevronUp />
          </button>
          <p className='cart-quantity'>{quantity}</p>
          <button
            className='cart-button'
            onClick={() => {
              if (quantity === 1) {
                dispatch(removeItem(id))
                return
              }
              dispatch(decrease({ id }))
            }}
          >
            <BsChevronDown />
          </button>
        </div>
        <button
          className='cart-delete'
          onClick={() => dispatch(removeItem(id))}
        >
          Sil
        </button>
      </div>
    </article>
  )
}

export default OrderItem
```

- App.js

```js
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import OrderList from './components/OrderList'
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotals } from './features/cart/cartSlice'

function App() {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <main>
      <Navbar />
      <OrderList />
    </main>
  )
}

export default App
```

#### Modal

- components/Modal.js oluştur

```js
const Modal = () => {
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Alışveriş sepetinizdeki tüm ürünler kaldırılsın mı?</h4>
        <div className='btn-container'>
          <button type='button' className='confirm-btn'>
            Onayla
          </button>
          <button type='button' className='clear-btn'>
            İptal
          </button>
        </div>
      </div>
    </aside>
  )
}
export default Modal
```

#### css

.modal-container {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.7);
z-index: 10;
display: flex;
align-items: center;
justify-content: center;
}

.modal {
background: #fff;
width: 80vw;
max-width: 400px;
border-radius: 0.25rem;
padding: 2rem 1rem;
text-align: center;
}
.modal h4 {
margin-bottom: 0;
line-height: 1.5;
}

.modal .clear-btn,
.modal .confirm-btn {
margin-top: 1rem;
}

.btn-container {
display: flex;
justify-content: space-around;
}
.confirm-btn {
border-color: #645cff;
color: #645cff;
}

.clear-btn,
.confirm-btn {
background: transparent;
padding: 0.5rem 1rem;
color: hsl(360, 67%, 44%);
border: 1px solid hsl(360, 67%, 44%);
margin-top: 2.25rem;
border-radius: 0.25rem;
}

.clear-btn:hover {
background: hsl(360, 71%, 66%);
color: hsl(360, 67%, 44%);
border-color: hsl(360, 71%, 66%);
}

.confirm-btn:hover {
background: #948fff;
color: #352bf3;
border-color: #4339ff;
}

- App.js

```js
return (
  <main>
    <Modal />
    <Navbar />
    <OrderList />
  </main>
)
```

#### modal slice

- features/modal/modalSlice.js oluştur

```js
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
    },
    closeModal: (state, action) => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
```

- App.js

```js
const { isOpen } = useSelector((state) => state.modal)

return (
  <main>
    {isOpen && <Modal />}
    <Navbar />
    <OrderList />
  </main>
)
```

#### modal aç/kapa

- OrderList.js

```js
import { openModal } from '../features/modal/modalSlice'

return (
  <button
    className='cart-clear'
    onClick={() => {
      dispatch(openModal())
    }}
  >
    sepeti temizle
  </button>
)
```

- Modal.js

```js
import { closeModal } from '../features/modal/modalSlice'
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'

const Modal = () => {
  const dispatch = useDispatch()

  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Alışveriş sepetinizdeki tüm ürünler kaldırılsın mı?</h4>
        <div className='btn-container'>
          <button
            type='button'
            className='confirm-btn'
            onClick={() => {
              dispatch(clearCart())
              dispatch(closeModal())
            }}
          >
            Onayla
          </button>
          <button
            type='button'
            className='clear-btn'
            onClick={() => {
              dispatch(closeModal())
            }}
          >
            İptal
          </button>
        </div>
      </div>
    </aside>
  )
}
export default Modal
```

#### createAsyncThunk ile async functionality

- https://mocki.io/v1/51f76ebc-2c88-4953-86f8-82887dccfa53
- cartSlice.js

- action type
- callback function
- lifecycle actions

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://mocki.io/v1/51f76ebc-2c88-4953-86f8-82887dccfa53'

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(error))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: function (builder) {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.cartItems = action.payload
    })
    builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading = false
    })
  },
})
```

- App.js

```js
import { calculateTotals, getCartItems } from './features/cart/cartSlice'

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <OrderList />
    </main>
  )
}

export default App
```

#### Options

```sh
npm install axios
```

- cartSlice.js

```js
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url)

      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue('yanlış bir şey var')
    }
  }
)
```
