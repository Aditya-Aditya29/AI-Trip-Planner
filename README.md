# AI Trip Planner

An **AI-powered mobile app** (React Native) with a **Node/Express backend** that generates personalized travel itineraries.  
The backend fans out your prompt to multiple LLMs (**OpenAI**, **Deepseek**, **Gemini**) and returns three options.

---

## ✨ Features

- 🤖 **Multi-LLM fan-out**: Query OpenAI, Deepseek, and Gemini in parallel.
- 💬 **Chat-style UI**: Guided Q&A flow collects trip details, then generates an itinerary.
- 🧭 **React Navigation (Native Stack)** with smooth transitions.
- ⚡ **Modern RN stack**: Reanimated, Gesture Handler, Safe Area, Screens.
- 📱 **Android & iOS** support.

---

## 🗂 Monorepo Structure

AiTripPlanner/
├─ backend/
│ ├─ routes/
│ ├─ services/
│ │ └─ llmService.js # searchWithLLMs() -> OpenAI / Deepseek / Gemini
│ ├─ server.js # Express app, mounts /api/trips
│ ├─ package.json
│ └─ .env # API keys (see below)
└─ src/
├─ screens/
│ └─ ChatScreen.js # Guided questions + chat UI
├─ services/
│ └─ LLmApi.js # Frontend calls to backend (askAllLLMs)
└─ utils/
App.js # NavigationContainer + Stack
package.json # React Native app

yaml
Copy code

---

## 🧰 Tech Stack

**Frontend**
- React Native `0.79.2`, React `19`
- React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`)
- Reanimated `^3.18.0`, Gesture Handler `^2.25.0`
- Safe Area Context, Screens
- Axios

**Backend**
- Node.js (>= 18), Express `^5.1.0`
- Axios, CORS, dotenv
- (Optional) MySQL via `mysql2` (installed)

**Testing / Tooling**
- Jest (frontend), ESLint + Prettier configs included

---

## 🚀 Getting Started

### Prerequisites
- **Node.js >= 18**
- **Android**: Android Studio + SDKs, a device or emulator
- **iOS** (macOS only): Xcode + iOS Simulator

---

### 1) Clone & install

```bash
git clone https://github.com/Aditya-Aditya29/AI-Trip-Planner.git
cd AI-Trip-Planner
Backend

bash
Copy code
cd backend
npm install
Frontend

bash
Copy code
cd ..
npm install
2) Configure environment variables (backend)
Create backend/.env:

bash
Copy code
# Server
PORT=5000

# AI Providers
OPENAI_API_KEY=your_openai_key
DEEPSEEK_API_KEY=your_deepseek_key
GEMINI_API_KEY=your_gemini_key
3) Run the backend
bash
Copy code
cd backend
npm run dev     # nodemon
# or
npm start
# Server: http://localhost:5000
4) Run the mobile app
Open a second terminal in the project root:

bash
Copy code
# Start Metro
npm start

# In another terminal (or from Metro):
npm run android   # for Android
npm run ios       # for iOS (macOS only)
The frontend’s LLmApi.js should call your backend (e.g. http://localhost:5000/api/...).
If you test on a real Android device, replace localhost with your machine’s LAN IP.

🔌 API (Backend)
Base URL: http://localhost:5000
Routes mounted at: /api/trips

Typical response shape from the LLM fan-out (via searchWithLLMs()):

json
Copy code
{
  "optionA": "<OpenAI response text>",
  "optionB": "<Deepseek response text>",
  "optionC": "<Gemini response text>"
}
🧪 Scripts
Frontend (package.json):

bash
Copy code
npm start          # metro bundler
npm run android    # run on Android
npm run ios        # run on iOS
npm test           # jest
npm run lint       # eslint .
Backend (backend/package.json):

bash
Copy code
npm start          # node server.js
npm run dev        # nodemon server.js
🛠 Troubleshooting
Android device can’t reach backend
Use your computer’s LAN IP (e.g. http://192.168.1.20:5000) in LLmApi.js.

React Native Reanimated
Ensure the babel plugin is enabled in babel.config.js:

js
Copy code
plugins: ['react-native-reanimated/plugin']
iOS build issues
Run from the iOS folder: cd ios && pod install && cd ..

🗺 Roadmap
 Add maps & geolocation

 Save itineraries to DB (MySQL / SQLite)

 Auth (email / social)

 Share trips & export PDF

 Switch OpenAI model to GPT-4/mini / add retries & streaming

🤝 Contributing
PRs are welcome! Please open an issue to discuss major changes.
