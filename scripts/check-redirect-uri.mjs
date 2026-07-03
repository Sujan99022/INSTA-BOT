const APP_ID = "1327039719482375";
const APP_SECRET = "296679ea2d172a91f062774b0f85bdb9";

const tokenResp = await fetch(
  `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
);
const tokenData = await tokenResp.json();

if (tokenData.access_token) {
  const resp = await fetch(
    `https://graph.facebook.com/v20.0/${APP_ID}?fields=allowed_redirect_uris,app_domains,app_type,category&access_token=${tokenData.access_token}`
  );
  const data = await resp.json();
  console.log(JSON.stringify(data, null, 2));
}
