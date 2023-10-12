interface EmptyProps {
  resourceName: string;
}

function Empty({ resourceName: resource }: EmptyProps) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
