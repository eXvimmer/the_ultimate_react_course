import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { iBooking } from "../../types";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface StatsProps {
  bookings?:
    | {
        created_at: string;
        total_price: number | null;
        extras_price: number | null;
      }[]
    | undefined;
  confirmedStays?: iBooking[];
  numDays: number;
  cabinsCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinsCount }: StatsProps) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce(
    (acc, cur) => (cur?.total_price ?? 0) + acc,
    0,
  );
  const checkins = confirmedStays?.length;

  // NOTE: the next computation is not accurate
  const occupation =
    (confirmedStays?.reduce((acc, cur) => acc + (cur.num_nights ?? 0), 0) ??
      0) / (numDays * cabinsCount || 1);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings || 0}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales ?? 0)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins || 0}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round((occupation || 0) * 100) + "%"}
      />
    </>
  );
}

export default Stats;
