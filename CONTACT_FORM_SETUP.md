# Setting Up Your Contact Form with Formspree

This portfolio website uses Formspree to handle form submissions. Follow these steps to set up your contact form:

## 1. Create a Formspree Account

1. Go to [Formspree](https://formspree.io/) and sign up for a free account
2. Verify your email address

## 2. Create a New Form

1. Log in to your Formspree account
2. Click "New Form"
3. Give your form a name (e.g., "Portfolio Contact Form")
4. Choose the plan that works for you (the free plan allows up to 50 submissions per month)
5. Click "Create Form"

## 3. Get Your Form Endpoint

After creating your form, Formspree will provide you with a unique endpoint URL that looks like:
```
https://formspree.io/f/xrgwpbdz
```

## 4. Update Your Contact Component

1. Open `src/components/Contact.jsx`
2. Find this line (around line 118):
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/your-formspree-id';
   ```
3. Replace `'https://formspree.io/f/your-formspree-id'` with your actual Formspree endpoint URL

## 5. Test Your Form

1. Run your website locally with `npm run dev`
2. Navigate to the Contact section
3. Fill out the form and submit it
4. Check your Formspree dashboard to confirm the submission was received
5. You should also receive an email notification (if enabled in Formspree settings)

## Additional Configuration Options

### Email Notifications

1. In your Formspree dashboard, go to your form settings
2. Under "Email Notifications," you can customize who receives notifications

### Form Spam Protection

Formspree includes built-in spam protection, but you can enhance it:

1. In your form settings, enable reCAPTCHA
2. Follow Formspree's instructions to add reCAPTCHA to your site

### Custom Success/Error Pages

You can configure custom redirect URLs after form submission:

1. In your form settings, find "Success/Error Pages"
2. Add custom URLs if desired (not necessary for this implementation as we handle success/error states in the component)

## Troubleshooting

If your form submissions aren't working:

1. Check that you've correctly copied your Formspree endpoint
2. Ensure your website has internet access
3. Check the browser console for any JavaScript errors
4. Verify that your Formspree account is active and within the submission limits

For more help, visit [Formspree's documentation](https://formspree.io/docs/).
