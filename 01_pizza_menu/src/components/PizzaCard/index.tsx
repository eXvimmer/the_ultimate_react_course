import { Pizza } from "../../data";

const PizzaCard: React.FC<Pizza> = ({
  name,
  price,
  soldOut,
  photoName,
  ingredients,
}) => {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
};

export default PizzaCard;
