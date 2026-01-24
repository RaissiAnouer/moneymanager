import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Modal from "./Modal";

const Sidebar = ({ activeMenu }) => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);

  const handleUpdateProfile = async (updatedProfile) => {
    const { fullName, profileImageUrl } = updatedProfile;
    console.log(updatedProfile);
    if (!fullName.trim()) {
      toast.error("Please enter a name");
      return;
    }
    try {
      const response = await axiosConfig.patch(API_ENDPOINTS.UPDATE_PROFILE, {
        fullName,
        profileImageUrl,
      });
      if (response.status === 200) {
        setOpenUpdateProfileModal(false);
        toast.success("Profile Updated Successfully!");
        setUser({ ...user, fullName, profileImageUrl });
      }
    } catch (error) {
      console.log("Error updating profile", error);
      toast.error(error.response?.data?.message || "Failed updating profile");
    }
  };
  return (
    <>
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          <button onClick={() => setOpenUpdateProfileModal(true)}>
            {user?.profileImageUrl ? (
              <div className="relative group w-20 h-20">
                {/* The Image */}
                <img
                  src={user?.profileImageUrl || "default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />

                {/* The Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <span className="text-white text-xs font-medium">Edit</span>
                </div>
              </div>
            ) : (
              <div className="relative group w-20 h-20">
                {/* The Image */}
                <User className="w-full h-full text-xl " />

                {/* The Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <span className="text-white text-xs font-medium">Edit</span>
                </div>
              </div>
            )}
          </button>
          <h5 className="text-gray-950 font-medium leading-6 capitalize ">
            {user.fullName || ""}
          </h5>
        </div>
        {SIDE_BAR_DATA.map((item, index) => (
          <button
            onClick={() => navigate(item.path)}
            key={`menu_${index}`}
            className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
              activeMenu == item.label ? "text-white bg-purple-800 " : ""
            }`}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
      <Modal
        isOpen={openUpdateProfileModal}
        onClose={() => setOpenUpdateProfileModal(false)}
        title="Update Profile"
      >
        <UpdateProfileForm
          onUpdateProfile={(updatedProfile) =>
            handleUpdateProfile(updatedProfile)
          }
          user={user}
        />
      </Modal>
    </>
  );
};

export default Sidebar;
