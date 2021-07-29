import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FoodProvider } from './hooks/useFood';

import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <>
      <BrowserRouter>
        <FoodProvider>
          <GlobalStyle />
          <Routes />
          <ToastContainer autoClose={2000} />
        </FoodProvider>
      </BrowserRouter>
    </>
  )
}