// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS (includes Popper.js)
import '@fortawesome/fontawesome-free/css/all.min.css';  // Font Awesome
import 'aos/dist/aos.css';  // AOS Animation CSS
import 'owl.carousel/dist/assets/owl.carousel.css';  // Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css';  // Owl Carousel Theme

// import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
