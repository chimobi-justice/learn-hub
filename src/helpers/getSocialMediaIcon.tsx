import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";

export const getSocialMediaIcon = (platform: string, size?: string) => {
  if (!platform) return null;

  if (platform.includes("Youtube")) {
    return <FaYoutube size={size || "20px"} />;
  } else if (platform.includes("Twitter")) {
    return <FaXTwitter size={size || "20px"} />;
  } else if (platform.includes("GitHub")) {
    return <FaGithub size={size || "20px"} />;
  } else if (platform.includes("LinkedIn")) {
    return <FaLinkedin size={size || "20px"} />;
  } else if (platform.includes("Website")) {
    return <GiWorld size={size || "20px"} />;
  } else if (platform.includes("Facebook")) {
    return <FaFacebook size={size || "20px"} />;
  } else if (platform.includes("Instagram")) {
    return <FaInstagram size={size || "20px"} />;
  }

  return null;
};
