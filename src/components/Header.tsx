

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-100 w-9/10 py-5">
        <div className="py-3 bg-[#0000007a]  px-7 rounded-full flex justify-between items-center max-lg:flex-col max-lg:gap-7">
            <a className="" href="#"><img src="./logo.png" alt="Ventra Travel" width={80} height={80} /></a>
          <nav>
          <ul className="flex items-center gap-7" style={{color: 'rgba(255,255,255,.75)'}}>
              <li className="hover:text-[#FFF8EE] transition-colors duration-300"><a href="">Home</a></li>
              <li className="hover:text-[#FFF8EE] transition-colors duration-300"><a href="">Explore</a></li>
              <li className="hover:text-[#FFF8EE] transition-colors duration-300"><a href="">Adventures</a></li>
              <li className="hover:text-[#FFF8EE] transition-colors duration-300"><a href="">Gallery</a></li>
              <li className="hover:text-[#FFF8EE] transition-colors duration-300"><a href="">Stories</a></li>
              <li className="hover:text-[#FFF8EE] transition-colors duration-300"><a href="">Contact</a></li>
          </ul>
        </nav>
        </div>
    </header>
  )
}

export default Header