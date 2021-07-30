import { MdShoppingBasket } from "react-icons/md";

import { Container } from "./styles";
import Logo from "../../assets/logo.svg";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

export function HeaderUser() {
   const { cart } = useCart();
   const cartSize = cart.length | 0;
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
            </nav>
         </header>
      </Container>
   );
}
