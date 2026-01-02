import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* left side -menu button and title */}

      {/*right side - profile picture */}

      {/*mobile view*/}
    </div>
  );
};

export default Navbar;
