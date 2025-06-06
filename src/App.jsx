import { Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Encounter from './Components/Encounter/Encounter';
import PriveteRoutes from './PriveteRoutes';
import PatientDetails from './Components/Patient/PatientDetails';
function App() {
  const Token = localStorage.getItem("Token")
  return (
    <div className='min-h-screen'>
      <Routes>
       <Route path='/login' element={<Login />} /> 
        <Route path='/' element={
          <PriveteRoutes>
            <Encounter />
          </PriveteRoutes>
        } />
        <Route path='/patient' element={
          <PriveteRoutes>
            <Encounter />
          </PriveteRoutes>
        } />
        <Route path={`/patient/patients-details`} element={
          <PriveteRoutes>
            <PatientDetails/>
          </PriveteRoutes>
        } />
      </Routes>
    </div>
  );
}

export default App;
