import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { ExtractSortField, SortByValue } from "../../types";

function CabinTable() {
  const {
    cabins,
    isLoading,
    // error,
  } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  // 1. FILTER
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins =
    filterValue === "no-discount"
      ? cabins?.filter((cabin) => cabin.discount === 0)
      : filterValue === "with-discount"
      ? cabins?.filter((cabin) => Number(cabin.discount) > 0)
      : cabins;

  // 2. SORT
  const sortBy = (searchParams.get("sortBy") || "name-asc") as SortByValue;
  const [field, direction] = sortBy.split("-") as [
    ExtractSortField<SortByValue>,
    "asc" | "desc",
  ];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    const fieldA = a[field];
    const fieldB = b[field];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return fieldA.localeCompare(fieldB) * modifier;
    } else if (typeof fieldA === "number" && typeof fieldB === "number") {
      return (fieldA - fieldB) * modifier;
    } else {
      // Handle the case when the field types don't match
      return 0;
    }
  });

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
