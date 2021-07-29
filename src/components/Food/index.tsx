import { Container } from "./styles";
import { FooterAdmin } from "./FooterAdmin";
import { FooterUser } from './FooterUser';
import { useLocation } from "react-router-dom";
interface FoodVariable {
   id: string,
   name: string,
   description: string,
   price: string,
   available: boolean,
   image: string
}
interface FoodProps {
   food: FoodVariable
}

export function Food({ food }: FoodProps) {
   const location = useLocation();
   return (
      <Container isAvailable={food.available}>
         <header>
            <img src={food.image} alt={food.name} />
         </header>
         <section className="body">
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p className="price">
               <b>{food.price}</b>
            </p>
         </section>
         {location.pathname === "/admin" ? <FooterAdmin isAvailable={food.available} food={food} /> :
            <FooterUser food={food} />}
      </Container>
   );
}