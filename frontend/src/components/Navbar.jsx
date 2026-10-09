import logo1 from '../assets/logo1.png'
export default function Navbar() {
    return (
        <header>

            <div className="bg-[#005078] px-4 py-3">

                <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">

                    {/* Logo */}
                    <div className="text-xl font-bold text-white">
                       <img src={logo1} alt="logo1" />  
                    </div>


                    {/* Search */}
                    <div className="hidden max-w-xl flex-1 md:flex ring-1 ring-amber-500 rounded-full text-white">

                        <input
                            type="text"
                            placeholder="Search any things"
                            className="w-full rounded-l-full px-5 py-3 text-sm text-white"
                        />

                        <button className="rounded-r-full bg-[#f5a800] px-7 text-sm font-medium text-white">
                            Search
                        </button>

                    </div>


                    {/* Actions */}
                    <div className="flex items-center gap-4 text-sm text-white">

                        <button className="btnnav">
                             Sign in
                        </button>

                        <button className="btnnav">
                            Login
                        </button>

                        <button>
                            🛒<span className='bg-amber-300 rounded-full px-1 text-[9px]'>0</span> Cart
                        </button>

                    </div>

                </div>

            </div>

        </header>
    );
}