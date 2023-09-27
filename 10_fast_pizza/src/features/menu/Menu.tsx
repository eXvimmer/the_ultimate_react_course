import { useLoaderData } from "react-router-dom";
import { iMenu } from "../../types";
import MenuItem from "./MenuItem";
import { getMenu } from "../../services/apiRestaurant";

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

// eslint-disable-next-line react-refresh/only-export-components
export async function menuLoader() {
  return await getMenu();
}

export default Menu;
