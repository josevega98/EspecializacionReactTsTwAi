import {
  BankingApp,
  ContextThemeDemo,
  CounterHookDemo,
  ErrorBoundaryDemo,
  LazySuspenseDemo,
} from "./features";

function App() {
  const demos = {
    banking: BankingApp,
    contador: CounterHookDemo,
    context: ContextThemeDemo,
    errorBoundary: ErrorBoundaryDemo,
    lazy: LazySuspenseDemo,
  };

  // const ActiveDemo = demos.banking;
  // const ActiveDemo = demos.contador;
  // const ActiveDemo = demos.context;
  // const ActiveDemo = demos.lazy;
  const ActiveDemo = demos.errorBoundary;

  return (
    <>
      <ActiveDemo />
    </>
  );
}

export default App;
