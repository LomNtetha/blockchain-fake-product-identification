// function getLocalAccessToken() {
//     const accessToken = window.localStorage.getItem("accessToken");
//     return accessToken;
//   }
  
//   function getLocalRefreshToken() {
//     const refreshToken = window.localStorage.getItem("refreshToken");
//     return refreshToken;
//   }

  function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) {
      // redirect to signin page
      window.location.href = "signin.html";
    }

    else if (!accessToken || accessToken.trim() === '') {
      // redirect to signin page
      window.location.href = "signin.html";
      return null;
    }
    return accessToken;
  }
  
  function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (!refreshToken) {
      // redirect to signin page
      window.location.href = "signin.html";
    }
    else if (!refreshToken || refreshToken.trim() === '') {
      // redirect to signin page
      window.location.href = "signin.html";
      return null;
    }
    return refreshToken;
  }

  
  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  instance.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const rs = await refreshToken();
            const { accessToken } = rs.data;
            window.localStorage.setItem("accessToken", accessToken);
            instance.defaults.headers.common["x-access-token"] = accessToken;
  
            return instance(originalConfig);
          } catch (_error) {
            window.location.href = "signin.html";
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
  
            return Promise.reject(_error);
          }
        }
  
        if (err.response.status === 403 && err.response.data) {
          window.location.href = "signin.html";
          return Promise.reject(err.response.data);
        }
      }
  
      return Promise.reject(err);
    }
  );
  
  // function signin() {
  //   return instance.post("/auth/signin", {
  //     username: "50899604",
  //     password: "12345",
  //   });
  // }

  // async function signin(username, password) {
  //   return instance.post("/auth/signin", {
  //     username: username,
  //     password: password,
  //   });
  // }
  
  // async function login() {
  //   var resultElement = document.getElementById("getResult1");
  //   resultElement.innerHTML = "";
  
  //   try {
  //     const username = document.getElementById("username").value;
  //     const password = document.getElementById("password").value;
  
  //     const res = await signin(username, password);
  
  //     const { accessToken, refreshToken } = res.data;
  //     window.localStorage.setItem("accessToken", accessToken);
  //     window.localStorage.setItem("refreshToken", refreshToken);

  //     if (!accessToken || !refreshToken) {
  //       // redirect to signin page
  //       window.location.href = "signin.html";
  //     }

  //         // redirect to index page
  // //   window.location.replace("index.html");
  // // } catch (err) {
  // //   resultElement.innerHTML = err;
  // // }
  
  //     resultElement.innerHTML =
  //       "<pre>" +
  //       JSON.stringify({ accessToken, refreshToken }, null, 2) +
  //       "</pre>";
  //   } catch (err) {
  //     resultElement.innerHTML = err;
  //   }
  // }
  
  // const loginForm = document.getElementById("loginForm");
  // loginForm.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   login();
  // });


  function refreshToken() {
    return instance.post("/auth/refreshtoken", {
      refreshToken: getLocalRefreshToken(),
    });
  }
  
  function getUserContent() {
    return instance.get("/user");
  }

  function getSellerContent() {
    return instance.get("/seller");
  }
  function getConsumerContent() {
    return instance.get("/consumer");
  }
  function getManufactureContent() {
    return instance.get("/manufacture");
  }

  
  
  // async function login() {
  //   var resultElement = document.getElementById("getResult1");
  //   resultElement.innerHTML = "";
  
  //   try {
  //     const res = await signin();
  
  //     const { accessToken, refreshToken } = res.data;
  //     window.localStorage.setItem("accessToken", accessToken);
  //     window.localStorage.setItem("refreshToken", refreshToken);
  
  //     resultElement.innerHTML =
  //       "<pre>" +
  //       JSON.stringify({ accessToken, refreshToken }, null, 2) +
  //       "</pre>";
  //   } catch (err) {
  //     resultElement.innerHTML = err;
  //   }
  // }

  
  
  async function getUserData() {
    var resultElement = document.getElementById("getResult2");
    resultElement.innerHTML = "";
  
    try {
      const res = await getUserContent();
  
      resultElement.innerHTML =
        "<pre>" + JSON.stringify(res.data, null, 2) + "</pre>";
    } catch (err) {
      resultElement.innerHTML = "<pre>" + JSON.stringify(err, null, 2) + "</pre>";
    }
  }

    async function getSellerData() {
    var resultElement = document.getElementById("getResult3");
    resultElement.innerHTML = "";
  
    try {
      const res = await getSellerContent();
  
      resultElement.innerHTML =
        "<pre>" + JSON.stringify(res.data, null, 2) + "</pre>";
    } catch (err) {
      resultElement.innerHTML = "<pre>" + JSON.stringify(err, null, 2) + "</pre>";
    }
  }

  async function getConsumerData() {
    var resultElement = document.getElementById("getResult4");
    resultElement.innerHTML = "";
  
    try {
      const res = await getConsumerContent();
  
      resultElement.innerHTML =
        "<pre>" + JSON.stringify(res.data, null, 2) + "</pre>";
    } catch (err) {
      resultElement.innerHTML = "<pre>" + JSON.stringify(err, null, 2) + "</pre>";
    }
  }

  async function getManufactureData() {
    var resultElement = document.getElementById("getResult5");
    resultElement.innerHTML = "";
  
    try {
      const res = await getManufactureContent();
  
      resultElement.innerHTML =
        "<pre>" + JSON.stringify(res.data, null, 2) + "</pre>";
    } catch (err) {
      resultElement.innerHTML = "<pre>" + JSON.stringify(err, null, 2) + "</pre>";
    }
  }
  
  function clearOutput1() {
    var resultElement = document.getElementById("getResult1");
    resultElement.innerHTML = "";
  }
  
  function clearOutput2() {
    var resultElement = document.getElementById("getResult2");
    resultElement.innerHTML = "";
  }

  
