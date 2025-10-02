# GitHub Pages Deployment Setup - Manual Steps Required

This document outlines the manual steps you need to complete in your GitHub repository settings to enable GitHub Pages deployment.

## ✅ What Has Been Done

The following configuration has been added to your repository:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically builds and deploys the application when you push to `main` branch
   - Can also be triggered manually via workflow dispatch
   - Uses Node.js 18 for consistency
   - Creates a 404.html file for SPA routing support

2. **Vite Configuration** (`vite.config.ts`)
   - Added `base: '/query-fusion/'` to configure the correct base path for GitHub Pages
   - This ensures all assets are loaded from the correct subdirectory

3. **Jekyll Prevention** (`public/.nojekyll`)
   - Added empty `.nojekyll` file to prevent GitHub from processing the site with Jekyll
   - This is important for Vite-built applications

4. **Documentation Updates**
   - Updated README.md with live demo link and deployment instructions
   - Updated copilot-instructions.md with deployment information

## 📋 Manual Steps You Must Complete

### Step 1: Configure GitHub Pages Settings

1. **Navigate to your repository on GitHub**
   - Go to: https://github.com/HamidRezaRezaeiGitHub/query-fusion

2. **Open Settings**
   - Click on the **Settings** tab (top navigation bar)

3. **Go to Pages Configuration**
   - In the left sidebar, scroll down and click on **Pages**

4. **Configure Source**
   - Under "Build and deployment" section:
   - **Source**: Select **"GitHub Actions"** from the dropdown
     - ⚠️ **Important**: Do NOT select "Deploy from a branch"
     - The option should say "GitHub Actions"

5. **Save** (if there's a save button, otherwise it saves automatically)

### Step 2: Trigger First Deployment

After configuring GitHub Pages settings, you have two options:

**Option A: Push to main branch** (Recommended after reviewing changes)
```bash
# After this PR is merged, the workflow will trigger automatically
```

**Option B: Manually trigger the workflow**
1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click the green "Run workflow" button

### Step 3: Monitor Deployment

1. **Check Workflow Status**
   - Go to the **Actions** tab
   - You should see a workflow run called "Deploy to GitHub Pages"
   - Click on it to see progress
   - Wait for both "build" and "deploy" jobs to complete (usually 2-3 minutes)

2. **Verify Deployment**
   - Once complete, your site should be live at:
   - **https://hamidrezarezaeigithub.github.io/query-fusion/**
   - It may take 1-2 minutes after the workflow completes for the site to be accessible

### Step 4: Verify the Application Works

1. **Visit the live site**: https://hamidrezarezaeigithub.github.io/query-fusion/
2. **Test basic functionality**:
   - Try pasting JSON content
   - Test formatting
   - Try switching to XML mode
   - Test theme toggle
   - Verify the three-panel layout works correctly

## 🎯 Expected Results

After completing these steps:
- ✅ Every push to `main` branch will automatically deploy to GitHub Pages
- ✅ The application will be accessible at: https://hamidrezarezaeigithub.github.io/query-fusion/
- ✅ The workflow can be manually triggered from the Actions tab
- ✅ You'll see deployment status in the Actions tab
- ✅ The README.md will show the live demo link

## 🔧 Troubleshooting

### Workflow Fails to Run
- **Check**: Make sure you selected "GitHub Actions" as the source (not "Deploy from a branch")
- **Check**: Ensure the workflow file exists at `.github/workflows/deploy.yml`

### Build Fails
- **Check**: Review the Actions tab for error messages
- **Common Issue**: npm install failures - usually resolve on retry

### Site Not Loading / 404 Error
- **Check**: Wait 1-2 minutes after workflow completes
- **Check**: Ensure you're visiting the correct URL with `/query-fusion/` at the end
- **Check**: Clear browser cache and try again

### Assets Not Loading
- **Check**: Make sure `base: '/query-fusion/'` is in `vite.config.ts`
- **Check**: Verify `.nojekyll` file exists in `public/` directory

## 📚 Additional Information

### Deployment Frequency
- Automatic deployment on every push to `main`
- Manual deployment available via Actions tab

### Deployment Time
- Typical deployment takes 2-3 minutes
- Build step: ~1 minute
- Deploy step: ~1 minute
- DNS propagation: ~1 minute

### Cost
- GitHub Pages is free for public repositories
- No usage limits for this size of application

## ✅ Checklist

Use this checklist to track your progress:

- [ ] Opened repository Settings
- [ ] Navigated to Pages section
- [ ] Selected "GitHub Actions" as source
- [ ] Merged this PR (or pushed to main)
- [ ] Verified workflow ran successfully in Actions tab
- [ ] Confirmed site is accessible at https://hamidrezarezaeigithub.github.io/query-fusion/
- [ ] Tested basic functionality (JSON/XML parsing, formatting, theme toggle)
- [ ] Verified all panels are working correctly

## 📞 Need Help?

If you encounter any issues:
1. Check the Actions tab for detailed error messages
2. Review the workflow logs
3. Verify all configuration files are present
4. Try manually triggering the workflow again

---

**Note**: This file can be deleted after you've completed the setup. It's just a reference guide.
