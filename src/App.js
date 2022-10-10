import {ToastContainer} from "react-toastify"
import Weather from './components/Weather/Weather';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Weather/>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </>
 
  );
}

export default App;
