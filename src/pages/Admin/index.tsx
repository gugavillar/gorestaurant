import { Header } from "../../components/Header";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useFood } from "../../hooks/useFood";

export function Admin() {
   const { foods, isAddModalOpen, openAddModal, openEditModal, isEditModalOpen } = useFood();
   function handleOpenAddModal() {
      openAddModal();
   }
   function handleOpenEditModal() {
      openEditModal();
   }
   return (
      <>
         <Header openModal={handleOpenAddModal} />
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