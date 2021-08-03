import { HeaderUser } from "../../components/HeaderUser";
import { useAuth } from "../../hooks/useAuth";
import { Container } from './styles';
import { FiTrash, FiMapPin } from 'react-icons/fi';
import { ModalUserAddress } from "../../components/ModalUserAddress";

export function Users() {
    const { user, openModalUser, isModalUser } = useAuth();
    function handleClick() {
        openModalUser();
    }
    return (
        <>
            <HeaderUser />
            <ModalUserAddress isOpen={isModalUser} setIsOpen={openModalUser} />
            <Container>
                <aside>
                    <div className="user-data">
                        <h2>{user?.name}</h2>
                        <button onClick={handleClick}>
                            <div className="text">
                                Adicionar endereço
                            </div>
                        </button>
                    </div>
                    <div className="requests">
                        <p>Total de pedidos</p>
                    </div>
                </aside>
                <main>
                    <h2>Dados do usuário</h2>
                    <div className="info">
                        <p>Telefone:</p>
                    </div>
                    <div className="address">
                        <p>Endereço:</p>
                        <p>Bairro:</p>
                        <p>Cidade:</p>
                        <p>Complemento:</p>
                        <footer>
                            <button>
                                <div className="text">
                                    Excluir
                                </div>
                                <div className="icon">
                                    <FiTrash size="20" />
                                </div>
                            </button>
                            <button>
                                <div className="text">
                                    Deixar endereço padrão
                                </div>
                                <div className="icon">
                                    <FiMapPin size="20" />
                                </div>
                            </button>
                        </footer>
                    </div>
                </main>
            </Container>
        </>
    )
}