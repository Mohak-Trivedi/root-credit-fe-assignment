import { RegistrationProvider } from "./context/RegistrationContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { RegistrationWizard } from "./components/RegistrationWizard.tsx";

function App() {
  return (
    <ToastProvider>
      <RegistrationProvider>
        <RegistrationWizard />
      </RegistrationProvider>
    </ToastProvider>
  );
}

export default App;
