const msalConfig = {
    auth: {
        clientId: "8ab20801-723d-49af-8d8b-2ba7bd2f5ccd",
        authority: "https://login.microsoftonline.com/96c62f5f-3c65-48a8-9dd3-868be91bdce3",
        redirectUri: "https://elbertdeguzman-cyber.github.io/feeder-analytics-ui/login.html"
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function signIn() {
    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["User.Read"]
        });

        // Save user info
        localStorage.setItem("user", JSON.stringify(loginResponse.account));

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error(error);
    }
}
