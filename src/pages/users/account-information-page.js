import React from "react";
import AccountInformation from "../../components/users/profile/account-information/account-information";
import UserSection from "../../components/users/profile/user-section/user-section";

const AccountInformationPage = () => {
  return (
    <div>
      <UserSection title={"Account Information"} />
      <AccountInformation />
    </div>
  );
};

export default AccountInformationPage;
