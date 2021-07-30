import { ToastContainer } from 'react-toastify';
import { FoodProvider } from './hooks/useFood';
import { CartProvider } from './hooks/useCart';

import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <>
      <BrowserRouter>
        <FoodProvider>
          <CartProvider>
            <GlobalStyle />
            <Routes />
            <ToastContainer autoClose={2000} />
          </CartProvider>
        </FoodProvider>
      </BrowserRouter>
    </>
  )
}