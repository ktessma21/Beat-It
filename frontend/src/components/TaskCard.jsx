function TaskCard() {

    function handle_click(){
        alert("card start button clicked")
        
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-3 border-gray-600 w-80 h-72 bg-[#C6CDFDDE] relative rounded-2xl overflow-hidden">
            <img
                className="w-56 relative top-20 left-6 z-10"
                src="/pictures/girl.png"
                alt="piano boy/girl"
            />
            <div className="w-full h-28 absolute bottom-0 bg-[#b96244] z-0"></div>
            <div className="absolute top-0 flex justify-between w-full py-3 px-6 text-[#894625] text-4xl">
                <p>Example Task</p>
                <p>0:00:00</p>
            </div>

            {/* button */}
            <div className="justify-center flex absolute bottom-2 right-6">
                <button onClick={handle_click} 
                        className="bg-white py-1 px-3 text-3xl rounded-2xl border-2 text-[#894625] hover:text-[#dbbcaa]">
                    Start!
                </button>
            </div>
        </div>
      </div>
    )
  }
  
  export default TaskCard
  