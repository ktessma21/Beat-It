
function NavBar() {
  return (
    <nav className="w-full bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
                <img
                  className="w-40"
                  src="/pictures/logo.png"
                  alt="Logo"
                />
            </div>

            {/* Navigation Links */}
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium jersey-10-regular"
              >
                Habits
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Tasks
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
