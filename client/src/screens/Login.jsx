import LoginComponent from "../components/LoginComponent";



const Login = () => {

    return (
        <div
        style={{
          textAlign: "center",
          display: "flex",
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(247.85deg, #171739 8.69%, #080711 28.41%, #181327 49.83%, #1C1830 69.97%, #2B203B 90.97%)",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <LoginComponent />

    </div>
    );

}

export default Login;