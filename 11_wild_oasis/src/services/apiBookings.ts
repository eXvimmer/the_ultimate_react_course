import { FullBooking, iBooking } from "../types";
import { pageSize } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface Options {
  filter: {
    field: string;
    value: string;
    method?: string;
  } | null;
  sortBy?: {
    field: string;
    direction: string;
  };
  page: number;
}

export async function getBookings({ filter, sortBy, page }: Options): Promise<{
  data: FullBooking[] | null;
  count: number | null;
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase // NOTE: any is intentional
    .from("bookings")
    .select(
      `id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)`,
      { count: "exact" },
    );

  // 1. Filter
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  // 2. SORT
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    // TODO: BUG go to the last page in bookings and then filter (unconfirmed),
    // you'll get an error
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("bookings could not be loaded");
  }
  return { data, count };
}

export async function getBooking(id: iBooking["id"]) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to
// get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: Date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: Date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: iBooking["id"], obj: iBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: iBooking["id"]) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("booking could not be deleted");
  }
  return data;
}
