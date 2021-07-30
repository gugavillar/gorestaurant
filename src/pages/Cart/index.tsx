import { formatPrice } from '../../util/format';
import { MdDelete, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { Container, ProductTable, Total } from './styles';
import { HeaderUser } from '../../components/HeaderUser';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
    amount: number;
}

export function Cart() {
    const { cart, removeProduct, updateProductAmount } = useCart();
    const cartFormatted = cart.map(product => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            available: product.available,
            image: product.image,
            amount: product.amount,
            priceFormatted: formatPrice(Number(product.price)),
            subtotal: formatPrice(Number(product.price) * product.amount)
        }
    });
    const total = formatPrice(cart.reduce((sumTotal, product) => {
        sumTotal += Number(product.amount) * Number(product.price);
        return sumTotal;
    }, 0));

    function handleProductIncrement(product: Product) {
        const productUpdate = {
            productId: product.id,
            amount: product.amount + 1
        };
        updateProductAmount(productUpdate);
    }

    function handleProductDecrement(product: Product) {
        const productUpdate = {
            productId: product.id,
            amount: product.amount - 1
        };
        updateProductAmount(productUpdate);
    }

    function handleRemoveProduct(productId: string) {
        removeProduct(productId);
    }

    return (
        <>
            <HeaderUser />
            <Container>
                <ProductTable>
                    <thead>
                        <tr>
                            <th aria-label="product image" />
                            <th>PRODUTO</th>
                            <th>QTD</th>
                            <th>SUBTOTAL</th>
                            <th aria-label="delete icon" />
                        </tr>
                    </thead>
                    <tbody>
                        {cartFormatted.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.name} />
                                </td>
                                <td>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                </td>
                                <td>
                                    <div>
                                        <button
                                            type="button"
                                            disabled={product.amount <= 1}
                                            onClick={() => handleProductDecrement(product)}
                                        >
                                            <MdRemoveCircleOutline size={25} />
                                        </button>
                                        <input
                                            type="text"
                                            readOnly
                                            value={product.amount}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleProductIncrement(product)}
                                        >
                                            <MdAddCircleOutline size={25} />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <strong>{product.subtotal}</strong>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProduct(product.id)}
                                    >
                                        <MdDelete size={25} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </ProductTable>

                <footer>
                    <button type="button">
                        Finalizar pedido
                    </button>
                    <Total>
                        <span>TOTAL</span>
                        <strong>{total}</strong>
                    </Total>
                </footer>
            </Container>
        </>
    )
}