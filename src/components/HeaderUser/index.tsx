import { MdShoppingBasket } from "react-icons/md";
import { FiUserCheck, FiLogOut } from 'react-icons/fi'

import { Container } from "./styles";
import Logo from "../../assets/logo.svg";
import { useCart } from "../../hooks/useCart";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function HeaderUser() {
   const { cart } = useCart();
   const { user, signInWithGoogle } = useAuth();
   const cartSize = cart.length | 0;
   const history = useHistory();

   function handleGoUserPage() {
      history.push(`/users/${user?.id}`);
   }

   function handleLoginSystem() {
      signInWithGoogle();
   }
   return (
      <Container>
         <header>
            <Link to="/">
               <img src={Logo} alt="GoRestaurant" />
            </Link>
            <nav>
               <div>
                  <Link to="/cart">
                     <button type="button">
                        <div className="text">
                           {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
                        </div>
                        <div className="icon">
                           <MdShoppingBasket size={24} />
                        </div>
                     </button>
                  </Link>
               </div>
               {user ?
                  <div>
                     <button type="button" onClick={handleGoUserPage}>
                        <div className="text">
                           {user?.name}
                        </div>
                        <div className="icon">
                           <FiLogOut size={24} />
                        </div>
                     </button>
                  </div> :
                  <div>
                     <button type="button" onClick={handleLoginSystem}>
                        <div className="text">
                           Entrar
                        </div>
                        <div className="icon">
                           <FiUserCheck size={24} />
                        </div>
                     </button>
                  </div>}
            </nav>
         </header>
      </Container>
   );
}
