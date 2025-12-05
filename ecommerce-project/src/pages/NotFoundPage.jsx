import Header from '../components/Header';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <>
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header />

      <div className="not-found-message">
        Page not found
      </div>
    </>
  );
}

export default NotFoundPage;