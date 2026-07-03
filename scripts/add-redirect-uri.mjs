const APP_ID = "1327039719482375";
const APP_SECRET = "296679ea2d172a91f062774b0f85bdb9";
const REDIRECT_URI = "http://localhost:3000/api/instagram/callback";

// Get app access token
const tokenResp = await fetch(
  `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
);
const tokenData = await tokenResp.json();
console.log("Token response:", JSON.stringify(tokenData, null, 2));

if (tokenData.access_token) {
  // Get current app settings
  const getResp = await fetch(
    `https://graph.facebook.com/v20.0/${APP_ID}?fields=allowed_redirect_uris,app_domains&access_token=${tokenData.access_token}`
  );
  const getData = await getResp.json();
  console.log("Current settings:", JSON.stringify(getData, null, 2));
}
