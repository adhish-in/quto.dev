const Footer = () => (
  <footer className="mt-16 text-center text-sm text-gray-500 border-t pt-6">
    <p>
      <a
        href="https://quto.dev"
        className="text-indigo-600 hover:underline"
      >
        🎨 Quto.dev
      </a>{" "}
      | <a
        href="/help"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline"
      >
        Help
      </a>{" "}
      | {" "}
      <a
        href="https://github.com/adhish-in/quto.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline"
      >
        GitHub
      </a>{" "}
      | A product of{" "}
      <a
        href="https://adhish.in"
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline"
      >
        Adhish Tech
      </a>
    </p>
  </footer>
);

export default Footer;