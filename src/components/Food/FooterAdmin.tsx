import { FiEdit3, FiTrash } from "react-icons/fi";
import { useFood } from "../../hooks/useFood";

interface FoodVariable {
    id: string,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
}

interface FooterProps {
    isAvailable: boolean;
    food: FoodVariable;
}

export function FooterAdmin({ isAvailable, food }: FooterProps) {
    const { deleteFood, availableFood, openEditFoodModal, setEditingFood } = useFood();

    function handleDeleteFood(id: string) {
        deleteFood(id);
    }

    function handleEditFood(food: FoodVariable) {
        setEditingFood(food);
        openEditFoodModal();
    }

    function handleAvaliableFood(food: FoodVariable) {
        availableFood(food);
    }
    return (
        <section className="footer">
            <div className="icon-container">
                <button
                    type="button"
                    className="icon"
                    onClick={() => handleEditFood(food)}
                >
                    <FiEdit3 size={20} />
                </button>

                <button
                    type="button"
                    className="icon"
                    onClick={() => handleDeleteFood(food.id)}
                >
                    <FiTrash size={20} />
                </button>
            </div>

            <div className="availability-container">
                <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

                <label
                    htmlFor={`available-switch-${food.id}`}
                    className="switch"
                >
                    <input
                        id={`available-switch-${food.id}`}
                        type="checkbox"
                        checked={isAvailable}
                        onChange={() => handleAvaliableFood(food)}
                    />
                    <span className="slider" />
                </label>
            </div>
        </section>
    );
}