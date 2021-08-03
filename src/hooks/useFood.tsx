import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { database } from "../services/firebase";
import { formatPrice } from "../util/format";

interface Foods {
    id: string;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

type FoodDatabase = Omit<Foods, 'id'>;

interface FoodContextData {
    foods: Foods[];
    editingFood: Foods;
    setEditingFood: (food: Foods) => void;
    addFood: (food: FoodDatabase) => void;
    updateFood: (food: FoodDatabase) => void;
    deleteFood: (id: string) => void;
    availableFood: (food: Foods) => void;
    openAddFoodModal: () => void;
    openEditFoodModal: () => void;
    isAddFoodModalOpen: boolean;
    isEditFoodModalOpen: boolean;
}

interface FoodFirebase {
    key: {
        description: string;
        image: string;
        name: string;
        price: string;
        available: boolean;
    }
}

interface FoodProviderProps {
    children: ReactNode;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodProviderProps) {
    const [foods, setFoods] = useState<Foods[]>([]);
    const [editingFood, setEditingFood] = useState<Foods>({} as Foods);
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

    useEffect(() => {
        const foodRef = database.ref('foods');
        foodRef.on('value', response => {
            const foodFirebase: FoodFirebase = response.val() ?? {};
            const parsedFood = Object.entries(foodFirebase).map(([key, value]) => {
                return {
                    id: key,
                    description: value.description,
                    image: value.image,
                    name: value.name,
                    price: formatPrice(value.price),
                    available: value.available,

                }
            });
            setFoods(parsedFood);
        });
        return () => {
            foodRef.off('value');
        }
    }, []);

    const addFood = async (food: FoodDatabase) => {
        const newFood = { ...food, available: true };
        try {
            await database.ref('foods').push(newFood);
            toast.success('Produto inserido');
        } catch (err) {
            toast.error(err.message);
        }
    }

    const updateFood = async (food: FoodDatabase) => {
        try {
            await database.ref(`foods/${editingFood.id}`).update({
                ...food
            });
            toast.success('Produto atualizado');
        } catch (err) {
            toast.error(err.message);
        }
    }

    const deleteFood = async (id: string) => {
        try {
            await database.ref(`foods/${id}`).remove();
            toast.success('Produto removido');
        } catch (err) {
            toast.error(err.message);
        }
    }

    const availableFood = async (food: Foods) => {
        try {
            await database.ref(`foods/${food.id}`).update({
                available: !food.available
            });
            if (food.available) {
                toast.success('Produto indisponível');
            } else {
                toast.success('Produto disponível');
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const openEditFoodModal = () => {
        setIsEditFoodModalOpen(!isEditFoodModalOpen);
    }


    const openAddFoodModal = () => {
        setIsAddFoodModalOpen(!isAddFoodModalOpen);
    }


    return (
        <FoodContext.Provider value={{ foods, addFood, updateFood, deleteFood, availableFood, openAddFoodModal, openEditFoodModal, editingFood, setEditingFood, isAddFoodModalOpen, isEditFoodModalOpen }}>
            {children}
        </FoodContext.Provider>
    );
}

export function useFood(): FoodContextData {
    const context = useContext(FoodContext);
    return context;
}