import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import avatar from "../../assets/icons/avatar.svg";
import ProfileBackground from "../../assets/images/ProfileBackground.png";
import editIcon from "../../assets/icons/icons8-edit.svg";
const Profile = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  // Initialize profileImage with the default avatar
  const profileImage = user?.imageUrl || avatar;
  return (
    <div className="bg-white dark:bg-gray-900">
      <div>
        <img src={ProfileBackground} alt="Profile Background" width="100%" />
        <img
          class="w-[8rem] h-[8rem] rounded-full z-40 translate-x-14 -translate-y-14"
          src={profileImage}
          alt="Rounded avatar"
        />
      </div>
      <div className="flex flex-col justify-center dark:text-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Student Enrollment Number :
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {user?.studentID}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {user?.phoneNumber}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="p-16">
        <button
          type="button"
          class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <img src={editIcon} className="w-6 h-6 mr-2" />
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
