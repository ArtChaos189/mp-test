import { store, storeContext } from "./store";

import { TestLocationsList } from "./components";

export default function App() {
  return (
    <storeContext.Provider value={store}>
      <div className="App">
        <TestLocationsList />
      </div>
    </storeContext.Provider>
  );
}
