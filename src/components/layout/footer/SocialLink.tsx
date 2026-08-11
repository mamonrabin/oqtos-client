
import { TSocilaLink } from "@/types";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import React from "react";

interface SocialProps {
  socialLinkes: TSocilaLink[];
}

const SocialLink: React.FC<SocialProps> = ({ socialLinkes }) => {
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "facebook":
        return <FaFacebookF size={18} />;
      case "instagram":
        return <FaInstagram size={18} />;
      case "linkedin":
        return <FaLinkedinIn size={18} />;
      case "twitter":
        return <FaTwitter size={18} />;
      case "youtube":
        return <FaYoutube size={18} />;
      case "github":
        return <FaGithub size={18} />;
    //   default:
    //     return <Globe size={18} />;
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold text-white mb-2 uppercase leading-8">
        Follow Us
      </h3>

      <div className="flex items-center gap-2">
        {socialLinkes
          ?.filter((social) => social.status === "Active")
          .map((social) => (
            <Link
              key={social._id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.socialType}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-gray-600 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              {getSocialIcon(social.socialType)}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SocialLink;

