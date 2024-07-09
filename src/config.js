let config = {
    host: process.env.NODE_ENV === 'development' ? "https://localhost:7078/" : "https://gymapp-api2.azurewebsites.net/"
}

export default config;