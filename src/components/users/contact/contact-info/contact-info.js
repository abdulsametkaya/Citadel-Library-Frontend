import React from "react";
import {MdOutlineHeadphones,MdOutlinePhonelinkRing,MdLocationOn,MdEmail,} from "react-icons/md";
import { settings } from "../../../../utils/settings";
import "./contact-info.scss";

const ContactInfo = (props) => {
  const {color} = props;

  return (
    <ul className="contact-info" style={{ color: color }}>
      <li>
        <MdLocationOn />
        <a href={`https://goo.gl/maps/AtV5ngs3pUHczewFA`}>
          {settings.address}
        </a>{" "}
      </li>
      <li>
        <MdOutlinePhonelinkRing />{" "}
        <a href={`tel:${settings.phone1}`}>{settings.phone1}</a>
      </li>
      <li>
        <MdOutlineHeadphones />
        <a href={`tel:${settings.phone2}`}>{settings.phone2}</a>
      </li>
      <li>
        <MdEmail /> <a href={`mailto:${settings.email}`}>{settings.email}</a>
      </li>
    </ul>
  );
};

export default ContactInfo;
