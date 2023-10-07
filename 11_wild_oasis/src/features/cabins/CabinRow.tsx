import styled from "styled-components";
import { iCabin } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { id, name, image, discount, regular_price, max_capacity } = cabin;

  return (
    <>
      <TableRow role="row">
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
          <button onClick={() => setShowForm(!showForm)}>Edit</button>
          <button onClick={() => deleteCabin(id)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && (
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
      )}
    </>
  );
}

export default CabinRow;
