import { useQuery } from "@apollo/client";

import { ME } from "../queries/Me";

export default function Me() {
  const { data, loading, error } = useQuery(ME);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && <p>{JSON.stringify(data.me)}</p>}
    </div>
  );
}
