import styled from "styled-components";
import { NewCabin, iCabin } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiXMark } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: iCabin }) {
  const { createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { id, name, image, discount, regular_price, max_capacity } = cabin;

  function handleDuplicate() {
    const newCabin: NewCabin = {
      ...cabin,
      name: cabin.name ? `copy of ${cabin.name}` : undefined,
      description: cabin.description ?? undefined,
      discount: cabin.discount?.toString() ?? undefined,
      max_capacity: cabin.max_capacity?.toString() ?? undefined,
      regular_price: cabin.regular_price?.toString() ?? undefined,
      image: cabin.image ?? "",
    };
    delete newCabin.id;
    createCabin(newCabin);
  }

  return (
    <Table.Row>
      <Img src={image || undefined} />
      <Cabin>{name}</Cabin>
      <div>
        {max_capacity} guest{max_capacity === 1 ? "" : "s"}
      </div>
      <Price>{formatCurrency(regular_price || 0)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount || 0)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiXMark />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm
                cabinToEdit={{
                  ...cabin,
                  name: cabin.name ?? undefined,
                  description: cabin.description ?? undefined,
                  discount: cabin.discount?.toString() ?? undefined,
                  max_capacity: cabin.max_capacity?.toString() ?? undefined,
                  regular_price: cabin.regular_price?.toString() ?? undefined,
                  image: cabin.image ?? "",
                }}
              />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
