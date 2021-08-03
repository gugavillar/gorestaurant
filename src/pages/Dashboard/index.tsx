import { HeaderUser } from "../../components/HeaderUser";
import { Food } from "../../components/Food";
import { FoodsContainer } from "./styles";
import { useFood } from "../../hooks/useFood";

export function Dashboard() {
   const { foods } = useFood();

   return (
      <>
         <HeaderUser />
         <FoodsContainer data-testid="foods-list">
            {foods &&
               foods.map((food) => (
                  <Food
                     key={food.id}
                     food={food}
                  />
               ))}
         </FoodsContainer>
      </>
   );
}