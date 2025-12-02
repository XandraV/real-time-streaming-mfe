import { Provider } from "react-redux";
import BlotterWidget from "./components/BlotterWidget";
import { queryClient } from "./redux/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BlotterWidget />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
