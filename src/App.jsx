import { Route, Routes } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Encounter from './Component/Encounter/Encounter';
import PriveteRoutes from './Component/Auth/PriveteRoutes';
import PatientDetails from './Component/Patient/PatientDetails';
function App() {
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
