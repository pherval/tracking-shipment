import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isDev } from "./utils/env";

interface ApiProviderProps {
  children: React.ReactNode;
  showDevTools?: boolean;
}

export default function ApiProvider({
  children,
  showDevTools = isDev(),
}: ApiProviderProps) {
  const queryClient = useRef<QueryClient>(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      {showDevTools && <ReactQueryDevtools position="bottom-right" />}
      {children}
    </QueryClientProvider>
  );
}
