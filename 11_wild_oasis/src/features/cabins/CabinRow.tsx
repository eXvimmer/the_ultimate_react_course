import styled from "styled-components";
import { NewCabin, iCabin } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

/* const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`; */

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
  const { isCreating, createCabin } = useCreateCabin();
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
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
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

          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
