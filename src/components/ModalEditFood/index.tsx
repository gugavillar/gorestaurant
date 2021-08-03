import { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { FormHandles } from "@unform/core";
import { useFood } from "../../hooks/useFood";

interface FoodVariable {
   name: string,
   description: string,
   price: string,
   available: boolean,
   image: string
}

interface ModalEditFoodProps {
   isOpen: boolean;
   setIsOpen: () => void;
}

export function ModalEditFood({ isOpen, setIsOpen }: ModalEditFoodProps) {
   const formRef = createRef<FormHandles>();
   const { updateFood, editingFood } = useFood();

   function handleSubmit(data: FoodVariable) {
      updateFood(data);
      setIsOpen();
   }

   return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
         <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={editingFood}
         >
            <h1>Editar Prato</h1>
            <Input name="image" placeholder="Cole o link aqui" />
            <Input name="name" placeholder="Ex: Moda Italiana" />
            <Input name="price" placeholder="Ex: 19.90" />
            <Input name="description" placeholder="Descrição" />
            <button type="submit">
               <div className="text">Editar Prato</div>
               <div className="icon">
                  <FiCheckSquare size={24} />
               </div>
            </button>
         </Form>
      </Modal>
   );
}
