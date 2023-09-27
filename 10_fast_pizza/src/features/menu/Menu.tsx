import { useLoaderData } from "react-router-dom";
import { iMenu } from "../../types";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData() as iMenu;
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
