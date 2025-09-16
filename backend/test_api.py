import requests
import json

def test_health_check():
    """Test the health check endpoint"""
    response = requests.get('http://localhost:5000/api/health')
    data = response.json()

    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(data, indent=2)}")

    assert response.status_code == 200
    assert data['status'] == 'ok'

    print("Health check test passed!")

def test_contact_form_valid():
    """Test the contact form with valid data"""
    payload = {
        'name': 'Test User',
        'email': 'valid.email@example.com',
        'message': 'This is a test message from the API test script.'
    }

    response = requests.post('http://localhost:5000/api/contact', json=payload)
    data = response.json()

    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(data, indent=2)}")

    # Note: This will fail if email credentials are not set up
    # In that case, check the server logs for the error

    print("Valid contact form test completed!")

def test_contact_form_invalid():
    """Test the contact form with invalid data"""
    payload = {
        'name': '',
        'email': 'invalid-email',
        'message': 'Short'
    }

    response = requests.post('http://localhost:5000/api/contact', json=payload)
    data = response.json()

    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(data, indent=2)}")

    assert response.status_code == 400
    assert 'errors' in data
    assert not data['success']

    print("Invalid contact form test passed!")

if __name__ == '__main__':
    print("Running API tests...")

    try:
        test_health_check()
        print("\n" + "-"*50 + "\n")

        test_contact_form_invalid()
        print("\n" + "-"*50 + "\n")

        # Test with valid data (email will fail but we can check the validation)
        test_contact_form_valid()

        print("\nAll tests completed!")
    except requests.exceptions.ConnectionError:
        print("\nERROR: Could not connect to the server. Make sure the Flask app is running on http://localhost:5000")
    except Exception as e:
        print(f"\nERROR: {str(e)}")
