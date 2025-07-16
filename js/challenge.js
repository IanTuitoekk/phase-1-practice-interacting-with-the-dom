document.addEventListener('DOMContentLoaded', () => {
    // State
    let count = 0;
    let timerId = null;
    const likes = {}; // Stores likes as { 'number': count }

    
    const counterDisplay = document.getElementById('counter');
    const pauseBtn = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsContainer = document.getElementById('list');

    // All buttons that should be disabled when paused
    const toggleableButtons = document.querySelectorAll('#minus, #plus, #heart, #submit');


    // A single function to update the counter and display
    const updateCounter = (change) => {
        count += change;
        counterDisplay.textContent = count;
    };


    // Use a shared function for manual counter controls
    document.getElementById('plus').addEventListener('click', () => updateCounter(1));
    document.getElementById('minus').addEventListener('click', () => updateCounter(-1));

    // "Like" a number
    document.getElementById('heart').addEventListener('click', () => {
        const num = counterDisplay.textContent;
        // Use `|| 0` to handle the first time a number is liked
        likes[num] = (likes[num] || 0) + 1;

        let likeItem = document.getElementById(`like-${num}`);
        if (!likeItem) {
            likeItem = document.createElement('li');
            likeItem.id = `like-${num}`;
            likesList.appendChild(likeItem);
        }
        
        const plural = likes[num] > 1 ? 's' : '';
        likeItem.textContent = `${num} has ${likes[num]} like${plural}`;
    });

    // Pause and Resume
    pauseBtn.addEventListener('click', () => {
        const isCurrentlyPaused = pauseBtn.textContent === 'resume';

        if (isCurrentlyPaused) {
            timerId = setInterval(() => updateCounter(1), 1000); // Resume
        } else {
            clearInterval(timerId); // Pause
        }
        
        // Toggle button text and disabled state
        pauseBtn.textContent = isCurrentlyPaused ? 'pause' : 'resume';
        toggleableButtons.forEach(btn => btn.disabled = !isCurrentlyPaused);
    });

    // Add comments
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentText = commentInput.value.trim();

        if (commentText) {
            const newComment = document.createElement('p');
            newComment.textContent = commentText;
            commentsContainer.appendChild(newComment);
        }
        commentForm.reset();
    });

    // Start the timer on page load
    timerId = setInterval(() => updateCounter(1), 1000);
});