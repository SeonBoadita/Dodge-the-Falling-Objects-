window.addEventListener("DOMContentLoaded", function () {
    let box = document.querySelector(".character");
    let speed = 50; // Movement speed
    let score = 0;
    let updateScore = document.querySelector(".score");
    let windowWidth = window.innerWidth;
    // Move character left and right
    window.addEventListener("keydown", (event) => {
        if (!box) return; // Ensure the element exists

        if (event.key === "ArrowLeft" || event.key === "a") {
            box.style.left = (box.offsetLeft - speed) + "px";
        } else if (event.key === "ArrowRight" || event.key === "d") {
            box.style.left = (box.offsetLeft + speed) + "px";
        }
        if (box.offsetLeft < 0) {
            box.style.left = "0px";
        } else if (box.offsetLeft > windowWidth - box.offsetWidth) {
            box.style.left = windowWidth - box.offsetWidth + "px";
        }
    });


    // Function to create a falling Metroid-like object
    function createObject() {
        let obj = document.createElement("div");
        obj.classList.add("obj");

        // Random X position within screen width
        let objLeft = Math.random() * (window.innerWidth - 40);
        obj.style.left = objLeft + "px";
        document.body.appendChild(obj);

        let objHeight = 0;
        let speed = Math.random() * 2 + 10;

        let interval = setInterval(() => {
            objHeight += speed;
            obj.style.top = objHeight + "px";

            // Check collision with character
            if (checkCollision(box, obj)) {
                alert("Game Over!");
                clearInterval(interval);
                obj.remove();
                updateScore.innerText = "Score: " + score;
                location.reload(); // Reload the game
            }

            // Remove object if it goes off-screen
            if (objHeight > window.innerHeight) {
                clearInterval(interval);
                score++; // Increment score
                updateScore.innerText = "Score: " + score;
                obj.remove();
            }
        }, 50);
    }


    // Function to check collision
    function checkCollision(box, obj) {
        let boxRect = box.getBoundingClientRect(); // Character position
        let objRect = obj.getBoundingClientRect(); // Falling object position

        return (
            boxRect.left < objRect.right && // Character's left side is before object's right side
            boxRect.right > objRect.left && // Character's right side is after object's left side
            boxRect.top < objRect.bottom && // Character's top is before object's bottom
            boxRect.bottom > objRect.top // Character's bottom is after object's top
        );
    }

    // Generate falling objects continuously
    setInterval(createObject, 1000); // New object every second
});
