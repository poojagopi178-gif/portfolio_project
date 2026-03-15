const form = document.getElementById("contactForm");
const responseEl = document.getElementById("response");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const res = await fetch("/submit", {
            method: "POST",
            body: formData
        });

        // Plain text response
        const text = await res.text();
        responseEl.innerText = text;

        if (text === "Message sent successfully!") {
            form.reset();
        }

        setTimeout(() => {
            responseEl.innerText = "";
        }, 3000);

    } catch (err) {
        console.error("Fetch error:", err);
        responseEl.innerText = "Something went wrong!";
    }
});