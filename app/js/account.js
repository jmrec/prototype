// const r_acc = await fetch("./data/account.json");
// const acc = await r_acc.json();

// const r_init = await fetch("./data/init.json");
// const init = await r_init.json();

// const handle = document.querySelector("#handle"); 

// if (init.logged_in === true)
// {
//     handle.innerHTML = `Welcome, ${acc.name}!`;
// }
// else
// {
//     handle.innerHTML = "Please log in to view your account.";
// }

const log_in = document.querySelector("#log_in_form");

log_in.addEventListener("submit", () => {
    alert(`Welcome, ${log_in.user.value}! You have successfully logged in.`);
})