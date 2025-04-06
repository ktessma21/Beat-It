import {React, useContext} from "react";
import {PageContext} from '../helpers/Contexts'

function NavBar() {
  const {pageState, setPageState} = useContext(PageContext);
  
  return (
    <nav className="w-full">
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
                onClick={() => setPageState("habits")}
                className={`px-3 py-2 rounded-md ${pageState === "habits" ? "text-[#F6C5A9]" : "text-[#894625]"}`}
              >
                &gt; Habits &lt;
              </a>
              <a
                onClick={() => setPageState("tasks")}
                className={`px-3 py-2 rounded-md ${pageState === "tasks" ? "text-[#F6C5A9]" : "text-[#894625]"}`}
              >
                &gt; Tasks &lt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
