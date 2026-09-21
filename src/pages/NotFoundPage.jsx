import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-kicker">404 error</p>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-text">
          The page you are looking for may have been moved, deleted, or never
          existed.
        </p>

        <div className="not-found-actions">
          <a href="/links" className="button--primary not-found-button">
            Go to dashboard
          </a>
          <a href="/login" className="button--secondary not-found-button">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
