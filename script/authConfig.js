// authConfig.js
const msalConfig = {
    auth: {
        clientId: "44acfc9f-e476-4ac3-9d30-7c8384ecfd48", //  Azure AD App's Client ID
      authority: "https://login.microsoftonline.com/c9b9cb50-3644-4db4-a267-fa84df2f4ceb", //Tenant ID
      redirectUri: "https://teressantshangase.github.io/ValueCalculator/",
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function checkAuthentication() {
    try {
        // Handle any redirect responses from previous login attempts
        const response = await msalInstance.handleRedirectPromise();
        
        if (response) {
            console.log("Login successful:", response);
        } else {
            console.log("No redirect response found.");
        }
        
        const accounts = msalInstance.getAllAccounts();
        
        if (accounts.length > 0) {
            // If user is already logged in, display their name
            const account = accounts[0];
            document.getElementById("welcomeMessage").innerText = `Welcome, ${account.username}`;
        } else {
            // If no session and no ongoing login, initiate login
            msalInstance.loginRedirect({ scopes: ["User.Read"] });
        }
    } catch (error) {
        console.error("Authentication error:", error);
    }
}

async function signIn() {
    try {
        await msalInstance.loginRedirect({ scopes: ["User.Read"] });
    } catch (error) {
        console.error("Login error:", error);
    }
}


