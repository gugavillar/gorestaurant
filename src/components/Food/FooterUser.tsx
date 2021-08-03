import { MdAddCircleOutline, MdRemoveCircleOutline, MdAddShoppingCart } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
interface FoodVariable {
    id: string,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
}

interface FooterProps {
    food: FoodVariable;
}

interface CartSumAmount {
    [key: string]: number;
}

export function FooterUser({ food }: FooterProps) {
    const { addProduct, cart, updateProductAmount } = useCart();
    const cartSumAmount = cart.reduce((sumAmount, product) => {
        sumAmount[product.id] = 0;
        sumAmount[product.id] += product.amount;
        return sumAmount;
    }, {} as CartSumAmount);

    function handleAddProduct(productId: string) {
        addProduct(productId);
    }

    function handleUpdateProductIncrement(productId: string, amount: number) {
        const productUpdate = {
            productId: productId,
            amount: amount + 1
        }
        updateProductAmount(productUpdate);
    }

    function handleUpdateProductDecrement(productId: string, amount: number) {
        const productUpdate = {
            productId: productId,
            amount: amount - 1
        }
        updateProductAmount(productUpdate);
    }
    return (
        <section className="footer-user">
            {cartSumAmount[food.id] ? (
                <div className="icon-container">
                    <button
                        type="button"
                        className="icon"
                        disabled={!food.available || cartSumAmount[food.id] === 1}
                        onClick={() => handleUpdateProductDecrement(food.id, cartSumAmount[food.id])}
                    >
                        <MdRemoveCircleOutline size={20} />
                    </button>
                    <span className={!food.available ? 'disabled' : ''}>{cartSumAmount[food.id] || 0}</span>
                    <button
                        type="button"
                        className="icon"
                        disabled={!food.available}
                        onClick={() => handleUpdateProductIncrement(food.id, cartSumAmount[food.id])}
                    >
                        < MdAddCircleOutline size={20} />
                    </button>
                </div>
            ) : (
                <div className="icon-container">
                    <button
                        type="button"
                        className="icon-shopping"
                        disabled={!food.available}
                        onClick={() => handleAddProduct(food.id)}>
                        Adicionar ao carrinho
                        <MdAddShoppingCart size={20} />
                    </button>
                </div>
            )
            }
        </section >
    );
}