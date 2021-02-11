import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { GoogleLogin } from "react-google-login";

const clientId = "<CLIENT_ID>";

const Login = ({ setUser }) => {
  const onSuccess = (res) => {
    axios
      .post("/auth/signin", {
        id_token: res.getAuthResponse().id_token,
      })
      .then((res) => {
        setUser(res.data.user);
        navigate("/users");
      });

    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log("newAuthRes:", newAuthRes);
      console.log("new auth Token", newAuthRes.id_token);
      setTimeout(refreshToken, refreshTiming);
    };

    setTimeout(refreshToken, refreshTiming);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
