# How to Add Your Profile Image

To add your profile image to the portfolio website, follow these simple steps:

1. Save your profile image (the one with the yellow background) to the following location:
   ```
   portfolio/src/assets/images/profile.jpg
   ```

2. Make sure the image is named exactly `profile.jpg`

3. If your image has a different format (like PNG), you can either:
   - Convert it to JPG format, OR
   - Update the import statement in `src/components/Hero.jsx` to match your file extension:
     ```jsx
     import profileImage from '../assets/images/profile.png'; // Change to match your file extension
     ```

4. The image will automatically be displayed in a circular frame on your portfolio website.

## Image Optimization Tips

For best performance:
- Resize your image to around 600x600 pixels
- Compress the image to reduce file size (you can use tools like TinyPNG or ImageOptim)
- Make sure the file size is under 200KB for faster loading

## Troubleshooting

If your image doesn't appear:
- Check that the file path is correct
- Verify that the file name matches the import statement
- Make sure the image file is not corrupted
- Restart the development server with `npm run dev`
