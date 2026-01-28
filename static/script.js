document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent reload

    let formData = new FormData(this);

    fetch("/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const responseEl = document.getElementById("response");
        responseEl.innerText = data;
        this.reset();
        setTimeout(() => { responseEl.innerText = ""; }, 3000);
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong. Try again!");
    });
});