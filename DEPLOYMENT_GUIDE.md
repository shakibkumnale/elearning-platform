# Deployment Guide - Vercel

## CORS Error Fix

The CORS error you encountered was due to **trailing slash mismatch**:
```
❌ Backend origin:  https://elearning-platform-frontend-woad.vercel.app/
❌ Frontend origin: https://elearning-platform-frontend-woad.vercel.app
```

**Solution Applied**: Backend now handles both formats automatically.

---

## Environment Variables Setup

### Backend Environment Variables (Render/Vercel)

Set these in your backend deployment platform:

```
PORT=5000
NODE_ENV=production

MONGODB_URI=mongodb+srv://shakibkumnali:IDwrLxe6xvVVMNMw@cluster0.18kgu.mongodb.net/assingmentHR2?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=stkbantai
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=stkbantai2
JWT_REFRESH_EXPIRE=30d
COOKIE_EXPIRE=7

CORS_ORIGIN=https://elearning-platform-frontend-woad.vercel.app
CLIENT_URL=https://elearning-platform-frontend-woad.vercel.app
FRONTEND_URL=https://elearning-platform-frontend-woad.vercel.app

UPLOAD_DIR=./uploads
MAX_FILE_SIZE=500mb

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables (Vercel)

Create a `.env.local` file or set in Vercel dashboard:

```
VITE_API_URL=https://your-backend-url.render.com
```

---

## Vercel Deployment Steps

### Frontend (React + Vite)
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework preset: Auto-detected (Vite)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add environment variable:
   - `VITE_API_URL` = your backend URL
8. Deploy!

### Backend (Node.js)
1. If on Render:
   - Connect GitHub repo
   - Set runtime to Node
   - Add all environment variables
   - Deploy!

2. If on Vercel:
   - Deploy as separate project
   - Add `vercel.json` (already included)
   - Set environment variables in dashboard
   - Deploy!

---

## Files Modified

✅ `backend/src/server.js` - Enhanced CORS handling
✅ `backend/.env.example` - Example environment variables
✅ `backend/vercel.json` - Vercel deployment config
✅ `frontend/vercel.json` - Frontend deployment config

---

## Testing After Deployment

1. Test API health:
   ```
   GET https://your-backend-url/api/health
   ```

2. Test CORS:
   ```
   POST https://your-backend-url/api/auth/login
   ```
   Should now work without CORS errors!

3. Check browser console - no more CORS errors 🎉

---

## Important Notes

⚠️ **Remove trailing slashes** from CORS_ORIGIN in environment variables
⚠️ **Never commit `.env`** - it's already in .gitignore
✅ **Uploads folder is committed** - all videos are in the repo
✅ **vercel.json files are committed** - ready for auto-deployment
