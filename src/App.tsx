import { RegistrationProvider } from "./context/RegistrationContext.tsx";
import { RegistrationWizard } from "./components/RegistrationWizard.tsx";

function App() {
  return (
    <RegistrationProvider>
      <RegistrationWizard />
    </RegistrationProvider>
  );
}

export default App;
