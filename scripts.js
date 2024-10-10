       // Mengambil elemen audio
       const duckSound = document.getElementById('duck-sound');
       const greetingText = document.getElementById('greeting');
       
       // Menambahkan event listener saat teks di-klik
       greetingText.addEventListener('click', () => {
           duckSound.currentTime = 0; // Mengatur ulang audio ke awal
           duckSound.play().catch(error => {
               console.error("Audio playback failed:", error);
           }); // Memutar suara bebek
       });
       
               // Fungsi untuk mengontrol musik latar
               function toggleMusic() {
                   const music = document.getElementById('bg-music');
                   const button = document.getElementById('play-music-btn');
           
                   if (music.paused) {
                       music.play();
                       button.textContent = "Pause Music"; // Mengubah teks tombol
                   } else {
                       music.pause();
                       button.textContent = "Play Music"; // Mengubah kembali teks tombol
                   }
               }
       window.addEventListener('load', () => {
    const music = document.getElementById('bg-music');
    // Hapus music.play(); untuk mencegah autoplay
});

               const photoGroups = document.querySelectorAll('.photo-group');
               const sections = document.querySelectorAll('section');
       
               const options = {
                   root: null,
                   rootMargin: '0px',
                   threshold: 0.1,
               };
       
               const observer = new IntersectionObserver((entries) => {
                   entries.forEach(entry => {
                       if (entry.isIntersecting) {
                           entry.target.classList.add('show');
                       } else {
                           entry.target.classList.remove('show');
                       }
                   });
               }, options);
       
               photoGroups.forEach(group => {
                   observer.observe(group);
               });
       
               sections.forEach(section => {
                   observer.observe(section);
               });
               function toggleList(box) {
                const list = box.querySelector('.hidden-list');
                const boxes = document.querySelectorAll('.box');
            
                boxes.forEach(b => {
                    if (b !== box) {
                        // Menghapus class show dari box lain saat satu box di-click
                        b.classList.remove('show');
                        b.querySelector('.hidden-list').classList.remove('show');
                    }
                });
            
                list.classList.toggle('show');
                box.classList.toggle('show'); // Menambahkan class show pada box yang di-click
            }   
                // Mendapatkan semua box
const boxes = document.querySelectorAll('.box');

// Menambahkan delay animasi pada setiap box
boxes.forEach((box, index) => {
    box.style.setProperty('--animation-delay', `${index * 3}s`); // Mengatur delay
    box.classList.add('show'); // Memicu animasi
});
         
const heartsAnimation = () => {
    const heartsContainer = document.getElementById('hearts');
    heartsContainer.innerHTML = ''; // Bersihkan konten sebelumnya

    for (let i = 0; i < 100; i++) { // Menghasilkan 100 hati
        const heart = document.createElement('div');
        heart.innerText = '🤍';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 300 + 'vw'; // Posisi acak di lebar layar
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's'; // Durasi acak
        heartsContainer.appendChild(heart);
    }

    // Menghapus hati setelah 10 detik
    setTimeout(() => {
        heartsContainer.innerHTML = ''; // Bersihkan setelah 10 detik
    }, 100000);
};

// Memanggil fungsi saat halaman dimuat
window.addEventListener('load', () => {
    heartsAnimation(); // Panggil animasi hati saat halaman dimuat
});

// Menambahkan event listener untuk scroll
document.getElementById('message').addEventListener('mouseenter', heartsAnimation); // Mengaktifkan animasi saat mouse masuk ke section

const textBox = document.querySelector('.text-box');
const text ="I just want to say how lucky I feel to have you in my life. From the moment we started talking, I knew there was something special about you. Your kindness and the way you always know how to cheer me up make my days so much brighter.\n\nI really appreciate how you always support me and understand me, no matter what. You have this amazing ability to make me feel comfortable being myself, and that means a lot to me. You help me see things differently, and I’m grateful for that.I’m really thankful for how you celebrate me.";
let index = 0;

function type() {
    if (index < text.length) {
        textBox.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Ganti angka untuk mempercepat atau memperlambat
    }
}

type();

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset');

let currentPlayer = 'O'; // Mulai dengan pemain O
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Fungsi untuk menangani klik pada sel
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive || currentPlayer === 'X') {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    addImageToCell(clickedCell, currentPlayer);
    checkResult();

    if (gameActive) {
        botPlay();
    }
}

// Fungsi bot untuk memilih langkah terbaik
function botPlay() {
    const bestMove = minimax(gameState, 'X');
    gameState[bestMove.index] = 'X'; // Bot bermain sebagai 'X'
    const cellToPlay = cells[bestMove.index];
    addImageToCell(cellToPlay, 'X');
    checkResult();
}

// Fungsi Minimax
function minimax(newState, player) {
    const availableCells = newState.map((state, index) => state === '' ? index : null).filter(index => index !== null);
    if (checkWinner(newState, 'X')) {
        return { score: 10 }; // Bot menang
    } else if (checkWinner(newState, 'O')) {
        return { score: -10 }; // Pemain menang
    } else if (availableCells.length === 0) {
        return { score: 0 }; // Seri
    }

    const moves = [];
    for (const index of availableCells) {
        const move = {};
        move.index = index;
        newState[index] = player; // Tempatkan pemain
        if (player === 'X') {
            const result = minimax(newState, 'O'); // Panggil minimax untuk pemain O
            move.score = result.score;
        } else {
            const result = minimax(newState, 'X'); // Panggil minimax untuk bot
            move.score = result.score;
        }
        newState[index] = ''; // Reset sel
        moves.push(move);
    }

    let bestMove;
    if (player === 'X') {
        let bestScore = -Infinity;
        for (const move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    } else {
        let bestScore = Infinity;
        for (const move of moves) {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }

    return bestMove; // Kembalikan langkah terbaik
}

// Fungsi untuk memeriksa pemenang
function checkWinner(state, player) {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return state[index] === player;
        });
    });
}

// Fungsi untuk menambahkan gambar ke sel
function addImageToCell(cell, player) {
    const img = document.createElement('img');
    img.src = player === 'X' ? 'dino.jfif' : 'alea besar.jfif';
    cell.appendChild(img);
}

// Fungsi untuk memeriksa hasil
function checkResult() {
    if (checkWinner(gameState, 'X')) {
        resultDisplay.textContent = `Dino Menang!`;
        gameActive = false;
        return;
    }

    if (checkWinner(gameState, 'O')) {
        resultDisplay.textContent = `Alea Menang!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        resultDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Fungsi untuk mereset permainan
function resetGame() {
    gameActive = true;
    currentPlayer = 'O';
    gameState.fill('');
    resultDisplay.textContent = '';
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

window.onload = function() {
    const character = document.getElementById("character");
    const jumpButton = document.getElementById("jumpButton");
    const restartButton = document.getElementById("restartButton");
    const obstacle = document.getElementById("obstacle");

    // Menambahkan gambar sebagai background karakter setelah halaman dimuat
    let isJumping = false;
    let isGameOver = false;

    // Fungsi untuk lompat
    function jump() {
        if (!isJumping && !isGameOver) {
            isJumping = true;
            character.style.animation = "jump 0.5s";
            
            setTimeout(function() {
                character.style.animation = "";
                isJumping = false;
            }, 500);
        }
    }

    // Deteksi tombol spasi di keyboard (untuk pengguna desktop)
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            jump();
        }
    });

    // Tombol lompat di perangkat mobile
    jumpButton.addEventListener("click", function() {
        jump();
    });

    // Fungsi untuk mengecek tabrakan
    function checkCollision() {
        const charTop = character.offsetTop;
        const obsLeft = obstacle.offsetLeft;

        if (obsLeft < 100 && obsLeft > 50 && charTop >= 150) {
            gameOver();
        }
    }

    // Fungsi untuk game over
    function gameOver() {
        isGameOver = true;
        obstacle.style.animation = "none"; // Hentikan rintangan
        obstacle.style.display = "none";   // Sembunyikan rintangan
        restartButton.style.display = "block"; // Tampilkan tombol restart
    }

    // Set interval untuk mengecek tabrakan setiap 10ms
    setInterval(function() {
        if (!isGameOver) {
            checkCollision();
        }
    }, 10);

    // Fungsi untuk merestart game
    function restartGame() {
        isGameOver = false;
        obstacle.style.display = "block"; // Tampilkan kembali rintangan
        obstacle.style.animation = "move 2s infinite linear"; // Mulai animasi rintangan
        restartButton.style.display = "none"; // Sembunyikan tombol restart
    }

    // Tombol restart di klik
    restartButton.addEventListener("click", function() {
        restartGame();
    });
}


