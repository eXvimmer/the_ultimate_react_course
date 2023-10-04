import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    getCabins().then(console.log).catch(console.error);
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://clspypobhhannqakvtfd.supabase.co/storage/v1/object/public/cabin_images/cabin-001.jpg"
        alt="cabin 1"
      />
    </Row>
  );
}

export default Cabins;
