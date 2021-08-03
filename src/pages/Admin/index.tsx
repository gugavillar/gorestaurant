import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useFood } from "../../hooks/useFood";

export function Admin() {
   const { foods, isAddFoodModalOpen, openAddFoodModal, openEditFoodModal, isEditFoodModalOpen } = useFood();
   function handleOpenAddModal() {
      openAddFoodModal();
   }
   function handleOpenEditModal() {
      openEditFoodModal();
   }
   return (
      <>
         <HeaderAdmin openModal={handleOpenAddModal} />
         <ModalAddFood
            isOpen={isAddFoodModalOpen}
            setIsOpen={handleOpenAddModal}
         />
         <ModalEditFood
            isOpen={isEditFoodModalOpen}
            setIsOpen={handleOpenEditModal}
         />

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