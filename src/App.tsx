import { ToastContainer } from 'react-toastify';
import { FoodProvider } from './hooks/useFood';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';

import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <>
      <BrowserRouter>
        <FoodProvider>
          <AuthProvider>
            <CartProvider>
              <GlobalStyle />
              <Routes />
              <ToastContainer autoClose={3000} />
            </CartProvider>
          </AuthProvider>
        </FoodProvider>
      </BrowserRouter>
    </>
  )
}