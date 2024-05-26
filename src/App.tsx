import "./index.scss"
import { MantineProvider, createTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
  primaryColor: 'green',
  fontFamily: 'Inter, sans-serif',
  colors: {
    green: [
      "#e4fff0",
      "#d0fce6",
      "#a3f6cb",
      "#73f0af",
      "#4cec98",
      "#32e989",
      "#20e880",
      "#0cce6d",
      "#00b760",
      "#009e4f"
    ]
  }
  // components: {}
});

export default function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <div className="body">
          <Outlet />
        </div>
      </MantineProvider>
    </>
  )
}