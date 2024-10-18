// ตัวแปรสถานะเกม
const totalRounds = 3; // จำนวนรอบทั้งหมดในเกม
const gestures = ["Rock", "Paper", "Scissors"]; 
const delayBetweenRounds = 3000; 
let score = 0;
let aiScore = 0;
let roundCount = 0;
let isPlaying = false; 
let gameEnded = false; 
let playerGesture = "Detecting...";
let aiGesture = "Waiting...";

// การตั้งค่า Mediapipe hands สำหรับตรวจจับท่าทาง
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

hands.onResults(onResults);

/**
 * ฟังก์ชันนี้ใช้ในการตรวจจับท่าทางและตรวจสอบลอจิกของเกม
 */
function onResults(results) {
    if (!results.multiHandLandmarks || isPlaying || gameEnded) return;

    isPlaying = true; // ป้องกันการเล่นซ้ำ
    playerGesture = detectGesture(results.multiHandLandmarks[0]); // จำลองการตรวจจับท่าทาง
    displayPlayerGesture(playerGesture);

    aiGesture = generateAIGesture();
    displayAIGesture(aiGesture);

    // หน่วงเวลาเพื่อแสดงผลลัพธ์หลัง AI เลือกท่าทาง
    setTimeout(checkWinner, delayBetweenRounds);
}

/**
 * ตรวจจับท่าทางจาก landmark (ปัจจุบันเลือกแบบสุ่ม)
 * @param {Array} landmarks - ตำแหน่ง landmark ที่ตรวจจับได้
 * @returns {string} - ท่าทางที่ตรวจจับได้ (Rock, Paper, Scissors)
 */
function detectGesture(landmarks) {
    return gestures[Math.floor(Math.random() * gestures.length)];
}

/**
 * สุ่มเลือกท่าทางของ AI (Rock, Paper, Scissors)
 * @returns {string} - ท่าทางของ AI
 */
function generateAIGesture() {
    return gestures[Math.floor(Math.random() * gestures.length)];
}

/**
 * แสดงผลท่าทางที่ผู้เล่นตรวจจับได้บน UI
 * @param {string} gesture - ท่าทางของผู้เล่น
 */
function displayPlayerGesture(gesture) {
    document.getElementById('player-gesture').innerText = gesture;
}

/**
 * แสดงผลท่าทางที่ AI สุ่มได้บน UI
 * @param {string} gesture - ท่าทางของ AI
 */
function displayAIGesture(gesture) {
    document.getElementById('ai-gesture').innerText = gesture;
}

/**
 * เปรียบเทียบท่าทางของผู้เล่นกับ AI และอัพเดตคะแนน
 */
function checkWinner() {
    let resultMessage = "เสมอ!";

    if (playerGesture === aiGesture) {
        resultMessage = "เสมอ!";
    } else if (
        (playerGesture === "Rock" && aiGesture === "Scissors") ||
        (playerGesture === "Scissors" && aiGesture === "Paper") ||
        (playerGesture === "Paper" && aiGesture === "Rock")
    ) {
        score++;
        resultMessage = "คุณชนะในรอบนี้!";
    } else {
        aiScore++;
        resultMessage = "AI ชนะในรอบนี้!";
    }

    displayResult(resultMessage);
    updateScore();
    roundCount++;

    if (roundCount >= totalRounds) {
        endGame();
    } else {
        isPlaying = false;
        document.getElementById('start-game').disabled = false; // เปิดให้เริ่มรอบถัดไป
    }
}

/**
 * อัพเดตคะแนนบน UI
 */
function updateScore() {
    document.getElementById('score').innerText = `ผู้เล่น: ${score} - AI: ${aiScore}`;
}

/**
 * แสดงผลลัพธ์ของแต่ละรอบ
 * @param {string} message - ข้อความผลลัพธ์ที่จะแสดง
 */
function displayResult(message) {
    const resultEl = document.getElementById('result-display');
    resultEl.innerText = message;
    resultEl.style.display = 'block';

    setTimeout(() => {
        resultEl.style.display = 'none';
    }, 2000); // ซ่อนผลลัพธ์หลังจาก 2 วินาที
}

/**
 * จบเกมและแสดงผลลัพธ์สุดท้าย
 */
function endGame() {
    const finalResultEl = document.getElementById('final-result');
    const finalMessage = score > aiScore
        ? "ยินดีด้วย! คุณชนะเกมนี้!"
        : aiScore > score
        ? "AI ชนะเกมนี้! โชคดีครั้งหน้า!"
        : "เกมนี้เสมอกัน!";

    finalResultEl.innerText = finalMessage;
    finalResultEl.style.display = 'block';
    gameEnded = true;

    document.getElementById('start-game').disabled = true; // ปิดการเริ่มเกมหลังจบ
}

/**
 * นับถอยหลังก่อนเริ่มแต่ละรอบ
 * @param {Function} callback - ฟังก์ชันที่จะถูกเรียกหลังจากนับถอยหลังเสร็จสิ้น
 */
function startCountdown(callback) {
    let countdown = 3;
    const countdownEl = document.getElementById('countdown');
    countdownEl.style.display = 'block';
    countdownEl.innerText = countdown;

    const interval = setInterval(() => {
        countdown -= 1;
        countdownEl.innerText = countdown;

        if (countdown === 0) {
            clearInterval(interval);
            countdownEl.style.display = 'none';
            callback(); // เริ่มเกมหลังจากนับถอยหลังเสร็จสิ้น
        }
    }, 1000);
}

/**
 * รีเซ็ตสถานะเกมและ UI
 */
function resetGame() {
    score = 0;
    aiScore = 0;
    roundCount = 0;
    isPlaying = false;
    gameEnded = false;

    document.getElementById('score').innerText = `ผู้เล่น: 0 - AI: 0`;
    document.getElementById('ai-gesture').innerText = "รอ...";
    document.getElementById('player-gesture').innerText = "กำลังตรวจจับ...";
    document.getElementById('final-result').style.display = 'none';
    document.getElementById('start-game').disabled = false;
}

// Event listeners สำหรับปุ่มต่าง ๆ
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('start-game').addEventListener('click', () => {
        if (!gameEnded && roundCount < totalRounds) {
            document.getElementById('start-game').disabled = true; // ปิดการใช้งานปุ่มจนกว่ารอบจะจบ
            startCountdown(() => {
                const videoElement = document.getElementById('video-feed');
                const camera = new Camera(videoElement, {
                    onFrame: async () => {
                        await hands.send({image: videoElement});
                    },
                    width: 640,
                    height: 480,
                });
                camera.start();

                videoElement.style.display = "block";
                document.getElementById('player-gesture').style.display = "none";
            });
        }
    });

    document.getElementById('reset-game').addEventListener('click', resetGame);
});
