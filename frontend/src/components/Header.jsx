const Header = () => {
  return (
    <header className="p-4 dark:bg-gray-200 dark:text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="/home"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          
            <img
            src="https://www.svgrepo.com/show/508908/django.svg"
            alt="My Icon"
            className="w-12 h-12 dark:text-blue-400"/>
         
        </a>
        <ul className="items-stretch hidden space-x-3 md:flex">
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="/home"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-  dark:text-blue-400 "
            >
              Home
            </a>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="/profile"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-  dark:text-blue-400 "
            >
              Profile
            </a>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="/login"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-blue-400 "
            >
              Log in
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;