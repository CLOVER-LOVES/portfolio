import sys
import os

# Add the current directory to the path
sys.path.append(os.getcwd())

# Set the environment to production
os.environ['FLASK_ENV'] = 'production'

# Import the Flask app
from app import app as application
