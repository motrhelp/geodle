### Step 1: Install Node.js and npm

1. Open Terminal on your Mac.
2. Install Homebrew, a package manager for macOS, by pasting the following command and pressing Enter:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. After Homebrew is installed, install Node.js (which includes npm) by running:
   ```bash
   brew install node
   ```
4. Verify the installation of Node.js and npm by running:
   ```bash
   node -v
   npm -v
   ```

### Step 2: Install Watchman

1. Install Watchman via Homebrew:
   ```bash
   brew install watchman
   ```

### Step 3: Install Expo CLI

1. Install Expo CLI globally by running:
   ```bash
   npm install -g expo-cli
   ```

### Step 4: Install Project Dependencies

1. Navigate to the folder where Geodle is located.
2. In the project directory, install the project dependencies by running:
   ```bash
   npm install
   ```

### Step 5: Start Geodle

1. In the project directory, start your Expo project by running:
   ```bash
   npm run web
   ```
2. A new browser tab will open with Geodle.

### Optional Steps for Device Testing

- **Physical Device**: To run the app on your physical device, download the Expo Go app from the App Store (iOS) or Google Play Store (Android). Scan the QR code presented in the Expo developer tools with your device.