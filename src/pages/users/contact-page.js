import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import SectionHeader from "../../components/users/common/section-header/section-header";
import ContactForm from "../../components/users/contact/contact-form/contact-form";
import Map from "../../components/users/contact/map/map";

const ContactPage = () => {
  return (
    <>
      <SectionHeader title="Contact" image="header2.jpg" />
      <Spacer height={600}/>
      <ContactForm />
      <Spacer/>
      <Map/>
    </>
  );
};

export default ContactPage;