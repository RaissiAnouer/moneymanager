import React, { useState } from "react";
import ProfilePhotoSelector from "./ProfilePhotoSelector";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";
import uploadProfileImage from "../util/uploadProfileImage";

const UpdateProfileForm = ({ onUpdateProfile, user }) => {
  const { fullName, profilePhoto } = user;
  const [loading, setLoading] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    fullName,
    profileImageUrl: profilePhoto,
  });

  const handleChange = (key, value) => {
    setUpdatedProfile({ ...updatedProfile, [key]: value });
  };

  const handleUpdateProfile = async () => {
    let finalImageUrl = updatedProfile.profileImageUrl;
    setLoading(true);
    if (updatedProfile.profileImageUrl) {
      const uploadedUrl = await uploadProfileImage(
        updatedProfile.profileImageUrl,
      );
      finalImageUrl = uploadedUrl || updatedProfile.profileImageUrl;
    }
    try {
      await onUpdateProfile({
        ...updatedProfile,
        profileImageUrl: finalImageUrl,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ProfilePhotoSelector
        image={updatedProfile.profileImageUrl}
        setImage={(img) => handleChange("profileImageUrl", img)}
      />
      <Input
        value={updatedProfile.fullName}
        onChange={({ target }) => handleChange("fullName", target.value)}
        label="Full Name"
        placeholder={fullName}
        type="text"
      />

      <div className="flex justify-end mt-6">
        <button onClick={handleUpdateProfile} className="add-btn">
          {loading ? (
            <>
              <LoaderCircle className="animate-spin w-4 h-4" /> Updating...
            </>
          ) : (
            <>Update Profile</>
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
