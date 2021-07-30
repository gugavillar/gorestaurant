import { createContext, useEffect, useContext } from "react";
import { ReactNode, useRef, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../services/firebase";

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
    amount: number;
}

interface CartProviderProps {
    children: ReactNode
}

interface UpdateProductAmount {
    productId: string;
    amount: number;
}

interface CartContextData {
    cart: Product[];
    addProduct: (productId: string) => Promise<void>;
    removeProduct: (productId: string) => void;
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<Product[]>(() => {
        const localStorageCart = localStorage.getItem('@GoRestaurant:cart');
        if (localStorageCart) {
            return JSON.parse(localStorageCart);
        }

        return [];
    });

    const prevCartRef = useRef<Product[]>();
    useEffect(() => {
        prevCartRef.current = cart;
    });

    const cartPreviousValue = prevCartRef.current ?? cart;
    useEffect(() => {
        if (cartPreviousValue !== cart) {
            localStorage.setItem('@GoRestaurant:cart', JSON.stringify(cart));
        }
    }, [cartPreviousValue, cart]);

    const addProduct = async (productId: string) => {
        try {
            const updateCart = [...cart];
            const productExist = updateCart.find(product => product.id === productId);
            const currentAmount = productExist ? productExist.amount : 0;
            const amount = currentAmount + 1;
            if (productExist) {
                productExist.amount = amount;
            } else {
                const product = await database.ref(`/foods/${productId}`)
                product.on('value', response => {
                    const newProduct = {
                        ...response.val(),
                        id: productId,
                        amount: 1
                    }
                    updateCart.push(newProduct);
                });
            }
            setCart(updateCart);
        } catch (err) {
            toast.error(err.message);
        }
    }

    const removeProduct = async (productId: string) => {
        try {
            const updateCart = [...cart];
            const productExist = updateCart.find(product => product.id === productId);
            if (productExist) {
                const newCart = updateCart.filter(product => product.id !== productExist.id);
                setCart(newCart);
            } else {
                throw Error();
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const updateProductAmount = async ({ productId, amount }: UpdateProductAmount) => {
        try {
            if (amount <= 0) {
                return;
            }
            const updateCart = [...cart];
            const productExist = updateCart.find(product => product.id === productId);
            if (productExist) {
                productExist.amount = amount;
                setCart(updateCart);
            } else {
                throw Error();
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProductAmount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);

    return context;
}