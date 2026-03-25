const form = document.getElementById("contactForm");
const responseEl = document.getElementById("response");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();

    if (!name || !email || !message) {
        responseEl.innerText = "Please fill all fields!";
        responseEl.style.color = "red";
        return;
    }

    try {
        const res = await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (res.ok) {
            responseEl.innerText = `Thank you, ${name}! Message sent successfully 💜`;
            responseEl.style.color = "green";
            form.reset();
        } else {
            responseEl.innerText = data.error || "Something went wrong!";
            responseEl.style.color = "red";
        }

        // Clear message after 3 seconds
        setTimeout(() => {
            responseEl.innerText = "";
        }, 3000);

    } catch (err) {
        console.error("Fetch error:", err);
        responseEl.innerText = "Cannot connect to server. Please try later.";
        responseEl.style.color = "red";
    }
});
