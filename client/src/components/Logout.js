import React from "react";
import { navigate } from "@reach/router";
import { GoogleLogout } from "react-google-login";

const clientId = "<CLIENT_ID>";

function Logout() {
  const onSuccess = (res) => {
    alert("Logout made successfully");
    console.log("logged out");
    navigate("/");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
