import { FormHandles } from "@unform/core";
import { createRef } from "react";
import { FiCheckSquare } from 'react-icons/fi';
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Form } from './styles';


interface ModalUserAddressProps {
    isOpen: boolean;
    setIsOpen: () => void;
}

export function ModalUserAddress({ isOpen, setIsOpen }: ModalUserAddressProps) {
    const formRef = createRef<FormHandles>();
    const { user } = useAuth();

    function handleSubmit(data: any) {
        console.log(data)
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={user}>
                <h1>Dados cadastrais</h1>
                <Input name="address.street" placeholder="Rua" />
                <Input name="address.number" placeholder="Número" />
                <Input name="address.city" placeholder="Cidade" />
                <Input name="address.district" placeholder="Bairro" />
                <Input name="address.complement" placeholder="Complemento" />
                <button type="submit">
                    <p className="text">Cadastrar</p>
                    <div className="icon">
                        <FiCheckSquare size={24} />
                    </div>
                </button>
            </Form>
        </Modal>
    )

}