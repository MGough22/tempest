// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/layout";
import { ThemeProvider } from "./context/theme-provider";
// import { Button } from "./components/ui/button";

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <div>
    //   placeholder
    //   <Button>Test</Button>
    // </div>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>Hello</Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
