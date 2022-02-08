export const useFetchData = <TData, TVariables>(
  query: string
): ((variables?: TVariables) => Promise<TData>) => {
  return async (variables?: TVariables) => {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || "Error..";
      throw new Error(message);
    }

    return json.data;
  };
};
