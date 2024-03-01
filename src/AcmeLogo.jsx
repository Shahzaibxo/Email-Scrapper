import React from "react";
import Logo from './assets/Untitled design (2).mp4'

export const AcmeLogo = () => (
  <video src={Logo} autoPlay
  loop
  muted height="63" width="63" />
);
