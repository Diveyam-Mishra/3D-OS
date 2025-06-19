# Vercel Deployment Guide

This guide will help you deploy your portfolio website to Vercel, including both the frontend and the email backend service.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. Vercel CLI installed (optional for command-line deployment)
   ```
   npm install -g vercel
   ```

## Deployment Steps

### 1. Set up environment variables in Vercel

Before deploying, you'll need to add your email credentials as environment variables in Vercel:

1. Go to your Vercel dashboard
2. Create a new project or select your existing project
3. Go to "Settings" > "Environment Variables"
4. Add the following environment variables:
   - `EMAIL`: Your Gmail address (diveyammishra@gmail.com)
   - `PASSWORD`: Your Gmail app password

### 2. Deploy to Vercel

#### Option A: Deploy using the Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository in the Vercel dashboard
3. Vercel will automatically detect your project settings
4. Click "Deploy"

#### Option B: Deploy using the Vercel CLI

1. Open your terminal
2. Navigate to your project directory
3. Run:
   ```
   vercel
   ```
4. Follow the prompts to link your project to Vercel
5. When asked about settings, accept the defaults as they're specified in your `vercel.json`

### 3. Verify Your Deployment

1. Once deployed, Vercel will provide you with a deployment URL
2. Test your contact form by submitting it on your deployed site
3. Check your email to ensure you receive the test message

### 4. Custom Domain (Optional)

1. In your Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure your DNS settings

## Troubleshooting

### Email Not Working?

1. Check your environment variables in the Vercel dashboard
2. Make sure your Gmail account allows less secure apps or that you're using an app password
3. Check the function logs in Vercel to see if there are any errors

### CORS Issues?

If you encounter CORS issues, update the allowed origins in your server code:

1. Add your Vercel domain to the `origin` array in your CORS configuration
2. Redeploy your application

## Need Help?

If you need further assistance, please refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/about/)
