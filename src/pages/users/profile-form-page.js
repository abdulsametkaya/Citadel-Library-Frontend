import React from 'react'
import UserProfile from '../../components/users/profile/profile-form/user-profile';
import UserSection from '../../components/users/profile/user-section/user-section';


const ProfileFormPage = () => {
  return (
    <div>
      <UserSection title={"User Information"} />
      <UserProfile />
    </div>
  );
}

export default ProfileFormPage