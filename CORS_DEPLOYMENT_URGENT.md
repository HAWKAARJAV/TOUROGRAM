# URGENT: Render Backend Redeployment Required

## Current Issue
The frontend at `https://tourogram.netlify.app` cannot fetch from `https://localelens-api.onrender.com` due to CORS preflight failure.

**Status:** Code fixes committed and pushed ✅  
**Status:** Render auto-deploy pending ⏳

## Immediate Action Required

### Step 1: Go to Render Dashboard
👉 **[Render Dashboard](https://dashboard.render.com/)** → Select `localelens-api` service

### Step 2: Check Deployment Status
- Click the **Deployments** tab
- Look for recent deployments
- If you see a **failed** or **in progress** deployment, let it finish
- If the latest commit `8d5a03c` is NOT deployed, proceed to Step 3

### Step 3: Manual Redeploy (if needed)
1. Go back to the main service page
2. Click the orange **"Deploy latest"** button (top right)
3. Select **Deploy** on the confirmation dialog
4. Wait for deployment logs to show green checkmark (2-5 mins)
5. Once complete, you'll see: `Your service is live` ✅

### Step 4: Verify Deployment Success
Run this command in your terminal:
```bash
curl -X OPTIONS https://localelens-api.onrender.com/api/v1/stories \
  -H "Origin: https://tourogram.netlify.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: content-type" \
  -v 2>&1 | grep -i "access-control-allow"
```

You should see headers like:
```
< Access-Control-Allow-Origin: https://tourogram.netlify.app
< Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS
```

### Step 5: Test Frontend
1. Open **https://tourogram.netlify.app**
2. Go to **Explore** page
3. Stories should load without CORS error ✅

---

## What Changed in the Code
- ✅ Explicit OPTIONS handler for preflight requests
- ✅ Netlify domain wildcard support
- ✅ Proper CORS header configuration
- ✅ Root endpoint added

**Commit:** `8d5a03c`  
**Files Changed:** `backend/server.js`, `RENDER_DEPLOYMENT.md`

---

## If Deployment Fails
Check Render logs for errors:
1. Click **Logs** tab in Render dashboard
2. Look for error messages
3. Common issues:
   - Missing environment variables (check `.env` in Render)
   - MongoDB connection timeout
   - Port misconfiguration

---

## Alternative: Quick Test with cURL
While deployment is pending, test if root endpoint works:
```bash
curl https://localelens-api.onrender.com/
```

Should return API info without errors.

---

**Last Updated:** February 8, 2026  
**Required Action:** Manual or automatic Render deployment of commit `8d5a03c`
