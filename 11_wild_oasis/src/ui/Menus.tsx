import styled from "styled-components";
import { ChildrenProps } from "../types";
import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  createContext,
  useContext,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideclick } from "../hooks/useOutsideClick";

type Position = Pick<DOMRect, "x" | "y">;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  $position: Position;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface iMenusContext {
  openId: string;
  position: Position;
  open: (id: string) => void;
  close: () => void;
  setPosition: (p: Position) => void;
}

const MenusContext = createContext<iMenusContext>({} as iMenusContext);

function Menus({ children }: ChildrenProps) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  return (
    <MenusContext.Provider
      value={{
        openId,
        position,
        open: setOpenId,
        close() {
          setOpenId("");
        },
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

interface WithId {
  id: string;
}

function Toggle({ id }: WithId) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleToggleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement)
      ?.closest("button")
      ?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        // y: window.innerHeight - rect.height - rect.y,
        y: rect.y + rect.height + 8,
      });
    }
    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleToggleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }: WithId & ChildrenProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideclick<HTMLUListElement>(close, false);

  if (openId !== id) {
    return null;
  }

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string | JSX.Element;
  onClick?: () => void;
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
