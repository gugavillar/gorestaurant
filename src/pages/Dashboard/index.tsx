import { HeaderUser } from "../../components/HeaderUser";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useFood } from "../../hooks/useFood";

export function Dashboard() {
   const { foods, isAddModalOpen, openAddModal, openEditModal, isEditModalOpen } = useFood();
   function handleOpenAddModal() {
      openAddModal();
   }
   function handleOpenEditModal() {
      openEditModal();
   }
   return (
      <>
         <HeaderUser />
         <ModalAddFood
            isOpen={isAddModalOpen}
            setIsOpen={handleOpenAddModal}
         />
         <ModalEditFood
            isOpen={isEditModalOpen}
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