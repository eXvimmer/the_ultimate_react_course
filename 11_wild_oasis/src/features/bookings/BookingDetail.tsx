import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  const { status } = booking || {};

  const statusToTagName: Record<string, string> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking Detail</Heading>
          <Tag type={statusToTagName[status || "unconfirmed"]}>
            {status?.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {<BookingDataBox booking={booking} />}

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            $variation="primary"
            onClick={() => navigate(`/checkin/${booking?.id}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => {
              if (booking?.id) {
                checkOut(booking.id);
              }
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete-booking">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                if (booking?.id) {
                  deleteBooking(booking?.id, {
                    onSettled: () => {
                      navigate(-1);
                    },
                  });
                }
              }}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
