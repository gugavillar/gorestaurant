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
    openAddModal: () => void;
    openEditModal: () => void;
    isAddModalOpen: boolean;
    isEditModalOpen: boolean;
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
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const notify = (text: string) => toast.success(text, {
        autoClose: 1500
    });

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
            notify('Produto inserido');
        } catch (err) {
            toast.error(err.message);
        }
    }

    const updateFood = async (food: FoodDatabase) => {
        try {
            await database.ref(`foods/${editingFood.id}`).update({
                ...food
            });
            notify('Produto atualizado');
        } catch (err) {
            toast.error(err.message);
        }
    }

    const deleteFood = async (id: string) => {
        try {
            await database.ref(`foods/${id}`).remove();
            notify('Produto removido');
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
                notify('Produto indisponível');
            } else {
                notify('Produto disponível');
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const openEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }


    const openAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
    }


    return (
        <FoodContext.Provider value={{ foods, addFood, updateFood, deleteFood, availableFood, openAddModal, openEditModal, editingFood, setEditingFood, isAddModalOpen, isEditModalOpen }}>
            {children}
        </FoodContext.Provider>
    );
}

export function useFood(): FoodContextData {
    const context = useContext(FoodContext);
    return context;
}