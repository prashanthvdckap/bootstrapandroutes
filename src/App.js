import './App.css';
import NavBar from './Component/Common/NavBar';
import ViewUser from './Component/User/ViewUser';
function App() {
  return (
      <>
          <NavBar />
          <div className="container">
            <ViewUser />
          </div>
      </>
  );
}

export default App;
