// ===== Azure AD Login Setup ===== //

const msalConfig = {
    auth: {
        clientId: window.CONFIG.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${window.CONFIG.TENANT_ID}`,
        redirectUri: window.location.origin + "/feeder-analytics-ui/login.html"
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function login() {
    try {
        await msalInstance.loginRedirect({
            scopes: ["User.Read", "email", "openid"]
        });
    } catch (err) {
        console.error("Login failed", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnLogin");
    if (btn) btn.onclick = login;
});

// Handle redirect back from Microsoft Login
msalInstance.handleRedirectPromise().then(async (authResult) => {
    if (authResult) {
        msalInstance.setActiveAccount(authResult.account);
        localStorage.setItem("user", JSON.stringify(authResult.account));

        window.location.href = "dashboard.html";
    }
});
