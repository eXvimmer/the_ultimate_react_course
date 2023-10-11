import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

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

  const filterValue = searchParams.get("discount") || "all";

  const filteredCabins =
    filterValue === "no-discount"
      ? cabins?.filter((cabin) => cabin.discount === 0)
      : filterValue === "with-discount"
      ? cabins?.filter((cabin) => Number(cabin.discount) > 0)
      : cabins;

  // switch (filterValue) {
  //   case "all":
  //     filteredCabins = cabins;
  //     break;
  //   case "no-discount":
  //     {
  //       filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  //     }
  //     break;
  //   case "with-discount":
  //     {
  //       filteredCabins = cabins?.filter((cabin) => Number(cabin?.discount) > 0);
  //     }
  //     break;
  //   default:
  //     filteredCabins = cabins;
  // }

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
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
