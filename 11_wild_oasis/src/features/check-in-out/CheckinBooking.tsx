import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckin();
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid || false);
  }, [booking?.is_paid]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking || {};

  const optionalBreakfastPrice =
    (settings?.breakfast_price || 0) * (num_guests || 1) * (num_nights || 1);

  function handleCheckin() {
    if (!bookingId || !confirmPaid) {
      return;
    }

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: (total_price || 0) + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking {bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            id={"addBreakfast"}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((a) => !a);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id={"confirmPaid"}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          disabled={isCheckingIn}
        >
          I confirm that {guests?.full_name} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(total_price || 0)
            : `${formatCurrency(
                (total_price || 0) + optionalBreakfastPrice,
              )} (${formatCurrency(total_price || 0)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
          Check in the booking
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
