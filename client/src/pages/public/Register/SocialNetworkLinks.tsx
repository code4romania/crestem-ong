import React, { useState } from "react";
import Button from "@/components/Button";
import ExternalLinkItem from "@/pages/public/Register/ExternalLinkItem";

const SOCIAL_NETWORKS = [
  { name: "accountFacebook", label: "Facebook" },
  { name: "accountInstagram", label: "Instagram" },
  { name: "accountTwitter", label: "Twitter" },
  { name: "accountLinkedin", label: "LinkedIn" },
  { name: "accountTiktok", label: "TikTok" },
];

const SocialNetworkLinks = () => {
  const [list, setList] = useState([SOCIAL_NETWORKS[0]]);

  const handleAddLink = () =>
    setList((prevList) =>
      prevList.length < SOCIAL_NETWORKS.length
        ? [...prevList, SOCIAL_NETWORKS[prevList.length]]
        : prevList
    );

  return (
    <div>
      {list.map((item) => (
        <ExternalLinkItem
          key={item.label}
          defaultValue={item.name}
          options={SOCIAL_NETWORKS}
        />
      ))}
      <div className="flex justify-end mt-4">
        <Button color="white" onClick={handleAddLink} type="button">
          + Adaugă încă un link
        </Button>
      </div>
    </div>
  );
};

export default SocialNetworkLinks;
