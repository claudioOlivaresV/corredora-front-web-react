import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppStartup } from "./components/AppStartup.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppStartup>
          <App />
        </AppStartup>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
