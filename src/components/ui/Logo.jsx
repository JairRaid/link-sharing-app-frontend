import { Link } from "react-router";

const Logo = () => {
  return (
    <Link href="/" aria-label="devlinks Home" className="logo">
      <img src="images/logo-devlinks.svg" alt="devlinks logo" />
    </Link>
  );
};

export default Logo;
