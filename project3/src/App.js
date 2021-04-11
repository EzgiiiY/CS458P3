import logo from './logo.svg';
import './App.css';
import CityLocator from "./CityLocator";
import GeoLocator from './GeoLocator';
import Header from './Header';
import DistanceCalculator from './DistanceCalculator';



function App() {
  return (
    <div className="App">

      <Header> </Header>
      <CityLocator>
        
      </CityLocator>
      <GeoLocator>
        
      </GeoLocator>
      <DistanceCalculator>
        
      </DistanceCalculator>
    </div>
  );
}

export default App;
