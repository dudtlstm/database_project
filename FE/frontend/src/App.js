import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Timeline from './pages/Timeline';
import Detail from './pages/Detail';

const App = () => {
    return (
        <Router>
            <div style={styles.navbar}>
              <h1 style={styles.title}>한국사인물록</h1>
            </div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/people/:personId/events/" element={<Timeline />} />
                <Route path="/detail/:eventId" element={<Detail />} />
            </Routes>
        </Router>
    );
};

const styles = {
  navbar: {
      width: '100%',
      height: '70px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #ccc',
  },
  title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontFamily: 'GongGothic, Arial, sans-serif',
      color: '#306032',
      margin: 0,
  },
};


export default App;
