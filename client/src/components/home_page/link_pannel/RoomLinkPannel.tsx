import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import makeid from "../../../utils/MakeId";
import { AiOutlineCopy } from "react-icons/ai";

const RoomLinkPannel: React.FC = () => {
  const [Link, setLink] = useState("");
  const [DorwardLink, setorwardLink] = useState("");
  const gameroute = "gameroom";

  let Navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //create a room link with a randomly generated room id
  const generateLink = () => {
    let roomId = makeid(20);
    setLink(`${window.location.href}${gameroute}/${roomId}`);
    setorwardLink(`/${gameroute}/${roomId}`);
  };

  //coppy room link to clipboard
  function copyToClipboard(e: React.MouseEvent<HTMLButtonElement>) {
    navigator.clipboard.writeText(Link);
  }
  // navigate to game room when user click the ok button
  const GoToGameRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    Navigate(`${DorwardLink}`);
  };

  useEffect(() => {
    generateLink();
  }, []);

  return (
    <div id="room-link-pannel">
      <h3 id="message">Copy and send this link to your opponent</h3>

      <div id="generated-link-container">
        <textarea id="generated-link" value={Link} ref={textAreaRef} readOnly></textarea>
        <button id="copy-button" onClick={copyToClipboard}>
          <AiOutlineCopy className="icon" />
          <p>copy</p>
        </button>
      </div>

      <button onClick={GoToGameRoom}>ok</button>
    </div>
  );
};

export default RoomLinkPannel;
