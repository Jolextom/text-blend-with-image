
const AuthFooter = () => {
  return (
    <footer className="py-6 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} TextBlend. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AuthFooter;
