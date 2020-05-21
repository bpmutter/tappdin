document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log(localStorage.getItem("TAPPDIN_ACCESS_TOKEN"))
    const res = await fetch("http://localhost:8080/profile",  // profile? index?
      { headers: { "Authorization": `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}` } });
    if (res.status === 401) {
      window.location.href = '/log-in'
      return;
    }
    const { comments } = await res.json();
    const commentsContainer = document.querySelector("#comments-container");
    const commentsHtml = comments.map(
      ({ message, user: { username } }) =>
        `
      <div id="card">
        <div id='card-header'>
          ${username}
        </div>
        <div id="card-body">
          <p id="card-text">${message}</p>
        </div>
      </div>
      `
    );
    commentsContainer.innerHTML = commentsHtml.join("");
  } catch (e) {
    console.error(e);
  }
});
