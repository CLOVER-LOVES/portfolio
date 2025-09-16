# Portfolio Website Deployment Instructions

This guide will walk you through deploying your portfolio website on Hostinger.

## Deployment Files

The following files are ready for deployment:

1. **Deployment Directory**: `C:\WEB\portfolio\deployment\`
   - Contains all the files needed for your website

2. **Deployment ZIP File**: `C:\WEB\portfolio\portfolio-deployment-latest.zip`
   - Contains all the files from the deployment directory in a compressed format
   - Use this file to easily upload all files at once

## Deployment Steps

### 1. Log in to Hostinger

1. Go to [Hostinger Login](https://hpanel.hostinger.com/)
2. Enter your credentials and log in to your account

### 2. Access File Manager

1. From the Hostinger dashboard, go to "Files" > "File Manager"
2. Navigate to the `public_html` directory (this is your website's root directory)

### 3. Upload Your Files

#### Option 1: Upload the ZIP file (Recommended)

1. Click the "Upload" button in the File Manager
2. Select the `portfolio-deployment-latest.zip` file from your computer
3. Wait for the upload to complete
4. Once uploaded, right-click on the ZIP file and select "Extract"
5. Extract the contents to the `public_html` directory
6. Delete the ZIP file after extraction (optional)

#### Option 2: Upload individual files

1. Click the "Upload" button in the File Manager
2. Select all files from the `C:\WEB\portfolio\deployment\` directory
3. Wait for all files to upload

### 4. Configure SSL Certificate

1. Go to "Website" > "SSL" in the Hostinger dashboard
2. Click "Install" next to "Let's Encrypt"
3. Select your domain and click "Install"
4. Wait for the SSL certificate to be installed

### 5. Test Your Website

1. Open your browser and navigate to your domain (https://rajpurohitanshu.in)
2. Verify that your website loads correctly
3. Test all features, including:
   - Navigation links
   - Project displays
   - YouTube video thumbnails
   - Contact form
   - Light/dark mode appearance

## Important Files

- **index.html**: The main HTML file that loads your React application
- **.htaccess**: Contains server configuration for URL rewriting and caching
- **api/contact.php**: Handles the contact form submissions
- **robots.txt**: Provides instructions for search engine crawlers
- **sitemap.xml**: Helps search engines discover your pages

## Troubleshooting

### If the website doesn't load correctly:

1. Check the .htaccess file to ensure it's properly uploaded
2. Make sure all files were uploaded correctly
3. Check for any error messages in the browser console

### If images or assets are missing:

1. Verify that the assets directory was uploaded completely
2. Check the file paths in your HTML and CSS files
3. Clear your browser cache and try again

### If the contact form doesn't work:

1. Check if the api/contact.php file was uploaded correctly
2. Verify that PHP is enabled on your hosting account
3. Check the server logs for any PHP errors

## Updating Your Website

To update your website in the future:

1. Make changes to your local development environment
2. Build the React app with `npm run build`
3. Upload the new build files to your Hostinger hosting

## Support

If you encounter any issues with your hosting:

1. Check the Hostinger knowledge base: [Hostinger Help Center](https://support.hostinger.com/)
2. Contact Hostinger support through the control panel
