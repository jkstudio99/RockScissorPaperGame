
# Rock-Paper-Scissors Game with MediaPipe

This project is a **Rock-Paper-Scissors** game that uses **MediaPipe** for gesture recognition. The game allows the player to compete against an AI in 3 rounds, recognizing hand gestures for "Rock", "Paper", and "Scissors". The game interface is built with **HTML**, **CSS**, and **JavaScript** and supports custom fonts for both Thai and English languages.

## Features

- **Hand Gesture Recognition**: Uses MediaPipe's Hands API to detect gestures for Rock, Paper, and Scissors.
- **3-Round Gameplay**: Play against the AI in a 3-round match. The AI randomly selects its move for each round.
- **Custom Fonts**: 
  - **Noto Sans Thai** for Thai text.
  - **Poppins** for English text.
- **Reset and Play Logic**: After each round, the player must manually start the next round. A reset button is available to restart the game at any time.

## Technologies Used

- **HTML/CSS/JavaScript**: Core technologies for building the game interface and logic.
- **Bootstrap 5**: For responsive layout and UI components.
- **Google Fonts**: Noto Sans Thai and Poppins for custom typography.
- **MediaPipe Hands**: For gesture recognition and hand tracking.

## How to Play

1. Open the game in your browser.
2. Press **Start** to begin the first round.
3. Show your hand gesture (Rock, Paper, or Scissors) in front of the webcam.
4. Wait for the AI to make its move, and see who wins the round.
5. After the round ends, press **Start** again to play the next round.
6. After 3 rounds, the final winner is announced. Press **Reset** to play again.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/Rock-Paper-Scissors-MediaPipe.git
   ```

2. Open `index.html` in your browser to start playing.

## License

This project is licensed under the Apache License 2.0.
