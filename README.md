# CoachOn - Find Your Best Coach or Institute

## Overview
CoachOn is a web application designed to help students find the best coach or institute that suits their learning needs. The platform enables students to explore various coaching institutes, compare them, and make informed decisions based on reviews and details provided by the coaches.

## Features
- **Student-Friendly Interface:** Intuitive and interactive UI for seamless browsing and search functionality.
- **Coach & Institute Listings:** View detailed information about different coaches and institutes.
- **User Authentication:** Secure login and registration system with JWT-based authentication.
- **Search & Filtering:** Advanced search and filtering options to find the best coaching options.
- **Reviews & Ratings:** Students can leave reviews and ratings for coaches.
- **Responsive Design:** Optimized for all devices using Tailwind CSS.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT & Session-based authentication
- **Cloud Services:** AWS for deployment and storage

## Installation & Setup
### Prerequisites:
- Node.js installed on your system
- MongoDB (local or cloud instance)
- AWS credentials (if deploying)

### Steps to Run Locally:
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/CoachOn.git
   cd CoachOn
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   cd client && npm install
   ```
3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory
   - Add required variables (e.g., database connection string, JWT secret, AWS credentials)
4. **Run the Application:**
   ```bash
   npm run dev
   ```
   - This will start both frontend and backend concurrently.

## API Endpoints
| Endpoint       | Method | Description |
|---------------|--------|-------------|
| /api/auth/register | POST | Register a new user |
| /api/auth/login | POST | Authenticate user |
| /api/coaches | GET | Get list of all coaches |
| /api/coaches/:id | GET | Get details of a specific coach |
| /api/reviews | POST | Submit a review for a coach |

## Deployment
- **Frontend:** Deployed using AWS S3 & CloudFront
- **Backend:** Hosted on AWS EC2
- **Database:** Managed via MongoDB Atlas

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for any feature requests or bug fixes.

## License
This project is licensed under the MIT License.

---
### Contact
For any queries or collaboration, reach out at [your-email@example.com]

