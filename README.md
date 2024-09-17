<h1 align="center">Random Stranger Audio/Video Call App</h1>

<h2>📜 Project Overview</h2>
<p>This is a cross-platform mobile application that connects users with random strangers for <strong>audio/video calls</strong>. The app is built using <strong>React Native, Redux, WebRTC, Socket.io, Node.js,</strong> and <strong>Express</strong>, with additional social features such as <em>follow/unfollow</em>, <em>ratings and reviews</em>, and <em>real-time notifications</em>. It also supports <strong>multi-language functionality</strong> to cater to a global audience.</p>

<h2>✨ Key Features</h2>
<ul>
  <li><strong>🎥 Random Stranger Audio/Video Calls</strong>: Users can connect with random people via audio or video.</li>
  <li><strong>👥 Follow/Unfollow</strong>: Build your social network by following or unfollowing users.</li>
  <li><strong>⭐ Rating and Reviews</strong>: Provide feedback with ratings and reviews after calls.</li>
  <li><strong>🔔 Real-Time Notifications</strong>: Get real-time notifications for calls and messages.</li>
  <li><strong>📞 Call Duration Tracking and History</strong>: Record and view call durations and call history.</li>
  <li><strong>🤝 Friends List & Stores</strong>: Manage friends and view their activities and stores.</li>
  <li><strong>🌐 Multi-Language Support</strong>: Global access through multi-language options.</li>
  <li><strong>🔇 Mute/Unmute and Camera Switch</strong>: Control your audio/video during calls.</li>
  <li><strong>🚪 Logout</strong>: Secure logout functionality to safely end sessions.</li>
</ul>

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Frontend</strong>: React Native, Redux, WebRTC</li>
  <li><strong>Backend</strong>: Node.js, Express.js, Socket.io</li>
  <li><strong>Database</strong>: MongoDB</li>
  <li><strong>Authentication</strong>: Twilio (OTP-based login)</li>
  <li><strong>UI Framework</strong>: Chakra-UI</li>
  <li><strong>Communication</strong>: Socket.io for real-time functionality</li>
</ul>

<h2>🚀 Installation and Setup</h2>

<h3>Prerequisites</h3>
<p>Ensure that you have the following installed:</p>
<ul>
  <li><strong>Node.js</strong></li>
  <li><strong>npm</strong> or <strong>yarn</strong></li>
  <li><strong>MongoDB</strong></li>
  <li><strong>Twilio account</strong> for OTP authentication</li>
</ul>

<h3>Steps to Install and Run</h3>
<ol>
  <li><strong>Clone the repository</strong>:
    <pre><code>git clone https://github.com/yourusername/random-stranger-call-app.git
cd random-stranger-call-app
</code></pre>
  </li>

  <li><strong>Install frontend dependencies</strong>:
    <pre><code>cd frontend
npm install
</code></pre>
  </li>

  <li><strong>Install backend dependencies</strong>:
    <pre><code>cd backend
npm install
</code></pre>
  </li>

  <li><strong>Set up environment variables</strong>:
    <p>Create a <code>.env</code> file in the <strong>backend</strong> folder and add the following:</p>
    <pre><code>MONGO_URI=&lt;your_mongodb_uri&gt;
TWILIO_ACCOUNT_SID=&lt;your_twilio_account_sid&gt;
TWILIO_AUTH_TOKEN=&lt;your_twilio_auth_token&gt;
TWILIO_PHONE_NUMBER=&lt;your_twilio_phone_number&gt;
</code></pre>
  </li>

  <li><strong>Run the backend server</strong>:
    <pre><code>cd backend
npm run start
</code></pre>
  </li>

  <li><strong>Run the frontend app</strong>:
    <pre><code>cd frontend
npm run start
</code></pre>
  </li>
</ol>

<h2>📝 Usage</h2>
<ol>
  <li><strong>OTP Login</strong>: After launching the app, users log in using OTP authentication (via Twilio).</li>
  <li><strong>Random Calls</strong>: Users can start random audio/video calls with strangers.</li>
  <li><strong>Follow/Unfollow</strong>: Users can follow or unfollow others.</li>
  <li><strong>Rating and Reviews</strong>: Users can leave ratings and reviews post-call.</li>
  <li><strong>Call Controls</strong>: Mute/unmute, switch cameras, and track call duration during calls.</li>
</ol>

<h2>📂 File Structure</h2>
<pre><code>.
├── backend/
│   ├── server.js              # Main server entry point
│   ├── routes/                # API routes for backend services
│   ├── models/                # Mongoose models for MongoDB
│   ├── controllers/           # Business logic for each route
│   └── .env                   # Environment variables for backend
├── frontend/
│   ├── src/
│   │   ├── components/        # React components for the UI
│   │   ├── redux/             # Redux setup for state management
│   │   ├── screens/           # Screens for different app views
│   │   ├── utils/             # Helper utilities and functions
│   └── .env                   # Environment variables for frontend
└── README.md                  # Project readme file
</code></pre>

<h2>📈 Future Enhancements</h2>
<ul>
  <li><strong>Push Notifications</strong>: Adding notifications for new messages and missed calls.</li>
  <li><strong>User Matching by Interests</strong>: Filter connections based on shared interests or criteria.</li>
  <li><strong>Video Quality Enhancements</strong>: Improving WebRTC for better call quality.</li>
  <li><strong>Group Calls</strong>: Implementing group audio/video calls for multiple users.</li>
</ul>

<h2>🤝 Contributing</h2>
<p>Contributions are welcome! To contribute:</p>
<ol>
  <li>Fork the repository.</li>
  <li>Create a new branch for your feature: <code>git checkout -b feature/your-feature-name</code></li>
  <li>Commit your changes: <code>git commit -m 'Add new feature'</code></li>
  <li>Push to the branch: <code>git push origin feature/your-feature-name</code></li>
  <li>Open a pull request and describe your changes.</li>
</ol>

<h2>📜 License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>
