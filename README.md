<<<<<<< HEAD
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
=======
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
>>>>>>> 399cb45dfb246dd44c726bfc279c14d9ca9f5311
