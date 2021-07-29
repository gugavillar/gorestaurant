import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
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

export function FooterUser({ food }: FooterProps) {

    return (
        <section className="footer-user">
            <div className="icon-container">
                <button
                    type="button"
                    className="icon"
                    disabled={!food.available}
                >
                    <MdRemoveCircleOutline size={20} />
                </button>
                <span className={!food.available ? 'disabled' : ''}>0</span>
                <button
                    type="button"
                    className="icon"
                    disabled={!food.available}
                >
                    < MdAddCircleOutline size={20} />
                </button>
            </div>
        </section>
    );
}