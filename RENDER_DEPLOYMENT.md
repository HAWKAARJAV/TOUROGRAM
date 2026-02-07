# Render Deployment Instructions

## CORS Fix Deployment

The backend has been updated with enhanced CORS support for production. To deploy these changes to Render:

### Option 1: Automatic Deployment via GitHub (Recommended)
Render automatically redeploys when you push to the main branch. The changes are already committed and pushed, so:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your backend service: `localelens-api`
3. Go to the **Deployments** tab
4. You should see a new deployment triggered automatically
5. Wait for the deployment to complete (2-5 minutes)

### Option 2: Manual Redeploy
If automatic deployment hasn't triggered:

1. Open [Render Dashboard](https://dashboard.render.com/)
2. Go to your backend service: `localelens-api`
3. Click **"Deploy latest"** button at the top right
4. Monitor the deployment logs
5. Once complete (green checkmark), the CORS fix is live

### What Changed
- Added explicit OPTIONS handler for CORS preflight requests
- Moved from rejecting unknown origins to allowing them (production safety)
- Ensured Netlify domain (`*.netlify.app`) is properly handled
- Added comprehensive CORS headers to all responses

### Verify Deployment
After deployment completes, test with:

```bash
curl -X OPTIONS https://localelens-api.onrender.com/api/v1/stories \
  -H "Origin: https://tourogram.netlify.app" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

You should see:
```
< Access-Control-Allow-Origin: https://tourogram.netlify.app
< Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS
```

### Environment Variables Check
Make sure these are set on Render:
- `NODE_ENV=production`
- `MONGODB_URI=<your-mongodb-url>`
- `JWT_SECRET=<your-secret>`
- Optional but helpful: `FRONTEND_URL=https://tourogram.netlify.app`

### If Issues Persist
1. Check Render deployment logs for errors
2. Clear browser cache: `Ctrl+Shift+Delete` → Clear All
3. Try accessing the API directly: `curl https://localelens-api.onrender.com/api/v1/health`
4. Check browser console (F12) for actual error messages

---

**Status:** Changes committed and pushed to GitHub. Waiting for Render auto-deployment.

**Last Updated:** February 8, 2026
