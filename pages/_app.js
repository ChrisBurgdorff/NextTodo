import '../styles/globals.css';
import '../styles/bulma/bulma.css';
import '../styles/fontawesome/css/all.min.css'
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
      <style jsx global>{`
        #__next {
          flex-direction: column;
          min-height: 100vh;
          display: flex;
        }
      `}</style>
    </>
  );
}

export default MyApp
