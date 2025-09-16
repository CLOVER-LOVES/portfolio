# Hostinger Deployment Guide for Your Portfolio Website

This guide will walk you through the process of deploying your portfolio website on Hostinger.

## Prerequisites

1. A Hostinger account with a domain (rajpurohitanshu.in)
2. The deployment package (all files in the `hostinger` directory)

## Deployment Steps

### 1. Log in to Hostinger Control Panel

- Go to [Hostinger Login](https://hpanel.hostinger.com/)
- Enter your credentials and log in

### 2. Set Up Your Domain

If you haven't already:
- Go to "Domains" in the sidebar
- Click on "Setup" next to your domain (rajpurohitanshu.in)
- Follow the instructions to point your domain to Hostinger's nameservers

### 3. Upload Your Files

1. In the Hostinger control panel, go to "Files" > "File Manager"
2. Navigate to the public_html directory
3. Delete any existing files (if this is a new setup)
4. Click "Upload" and select all the files from your `hostinger` directory
5. Wait for the upload to complete

### 4. Configure SSL Certificate

1. In the Hostinger control panel, go to "Website" > "SSL"
2. Click "Install" next to "Let's Encrypt"
3. Select your domain and click "Install"
4. Wait for the SSL certificate to be installed

### 5. Test Your Website

1. Open your browser and navigate to your domain (https://rajpurohitanshu.in)
2. Verify that your website loads correctly
3. Test all the features and links to ensure they're working properly

## Important Files

- **index.html**: The main HTML file that loads your React application
- **.htaccess**: Contains server configuration for URL rewriting and caching
- **robots.txt**: Provides instructions for search engine crawlers
- **sitemap.xml**: Helps search engines discover your pages
- **assets/**: Contains all your JavaScript, CSS, images, and other static files

## Troubleshooting

### If the website doesn't load correctly:

1. Check the .htaccess file to ensure it's properly uploaded
2. Make sure all files were uploaded correctly
3. Check for any error messages in the browser console

### If images or assets are missing:

1. Verify that the assets directory was uploaded completely
2. Check the file paths in your HTML and CSS files
3. Clear your browser cache and try again

## Maintenance

### Updating Your Website

To update your website in the future:

1. Make changes to your local development environment
2. Build the React app with `npm run build`
3. Upload the new build files to your Hostinger hosting

### Monitoring

Hostinger provides tools to monitor your website's performance and uptime:

1. In the Hostinger control panel, go to "Website" > "Statistics"
2. Review your website's traffic and performance metrics
3. Set up email notifications for any issues

## Security Considerations

1. Keep your Hostinger account credentials secure
2. Regularly update your website's dependencies
3. Monitor your website for any suspicious activity
4. Consider enabling two-factor authentication for your Hostinger account

## Support

If you encounter any issues with your hosting:

1. Check the Hostinger knowledge base: [Hostinger Help Center](https://support.hostinger.com/)
2. Contact Hostinger support through the control panel
3. Visit the Hostinger community forums for additional help
