import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Provider({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<>{children}</>
		</QueryClientProvider>
	);
}

export default Provider;
