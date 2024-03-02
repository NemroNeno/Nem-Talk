import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Homepage from './Pages/Homepage';
import ChatsPage from './Pages/ChatsPage';


function App() {
  return (
    <div className='App !w-screen'>
    <Routes>

       <Route path='/' element={<Homepage/>}/>   
       <Route path='/chat' element={<ChatsPage/>}/>     
    </Routes>
    </div>
  );
}

export default App;
