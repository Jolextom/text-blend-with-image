
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <header className="border-b py-4">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl font-bold">TextBlend</span>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
