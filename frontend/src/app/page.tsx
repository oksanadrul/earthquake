import EarthquakePage from '@/pages/earthquakePage/earthquakePage';
import '@/styles/global.css';

const HomePage = () => {
  return (
    <div className="p-3 max-h-screen">
      <div className="container w-full flex items-center justify-center p-3">
        <h1>Earthquakes 1970-2014</h1>
      </div>
      <EarthquakePage />
    </div>
  );
};

export default HomePage;
