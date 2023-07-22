import { pizzaData } from "../../data";
import PizzaCard from "../PizzaCard";

function Menu() {
  return (
    <menu className="menu">
      <h2>Our menu</h2>
      {pizzaData.length ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <PizzaCard {...pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </menu>
  );
}

export default Menu;
