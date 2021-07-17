import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

interface Foods {
   id: number,
   name: string,
   description: string,
   price: string,
   available: boolean,
   image: string
}

type FoodDatabase = Omit<Foods, 'id'>;

export function Dashboard() {
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [foods, setFoods] = useState<Foods[]>([]);
   const [editingFood, setEditingFood] = useState<Foods>({} as Foods);
   useEffect(() => {
      api.get('/foods').then(response => setFoods(response.data));
   }, [])

   async function handleAddFood(food: FoodDatabase) {
      const foodsUpdated = [...foods];
      try {
         const response: Foods = await api.post('/foods', { ...food, available: true }).then(response => response.data);
         setFoods([...foodsUpdated, response]);
      } catch (err) {
         console.log(err);
      }
   }

   async function handleUpdateFood(food: FoodDatabase) {
      try {
         const foodsToUpdated = [...foods];
         const response: Foods = await api.put(`/foods/${editingFood.id}`, {
            ...editingFood,
            ...food
         }).then(response => response.data);
         const foodsUpdated = foodsToUpdated.map(food => food.id !== response.id ? food : response);
         setFoods(foodsUpdated);
      } catch (err) {
         console.log(err);
      }
   }

   async function handleDeleteFood(id: number) {
      await api.delete(`/foods/${id}`);
      setFoods(foods.filter(food => food.id !== id));
   }

   function handleOpenAddModal() {
      setIsAddModalOpen(!isAddModalOpen);
   }

   function handleOpenEditModal() {
      setIsEditModalOpen(!isEditModalOpen);
   }

   function handleEditFood(food: Foods) {
      setEditingFood(food);
      setIsEditModalOpen(true);
   }

   return (
      <>
         <Header openModal={handleOpenAddModal} />
         <ModalAddFood
            isOpen={isAddModalOpen}
            setIsOpen={handleOpenAddModal}
            handleAddFood={handleAddFood}
         />
         <ModalEditFood
            isOpen={isEditModalOpen}
            setIsOpen={handleOpenEditModal}
            editingFood={editingFood}
            handleUpdateFood={handleUpdateFood}
         />

         <FoodsContainer data-testid="foods-list">
            {foods &&
               foods.map((food) => (
                  <Food
                     key={food.id}
                     food={food}
                     handleDelete={handleDeleteFood}
                     handleEditFood={handleEditFood}
                  />
               ))}
         </FoodsContainer>
      </>
   );
}