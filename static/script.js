document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("/submit", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        const responseEl = document.getElementById("response");
        responseEl.innerText = data;  // Show success message
        this.reset();
        setTimeout(() => { responseEl.innerText = ""; }, 3000);
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong!");
    });
});
