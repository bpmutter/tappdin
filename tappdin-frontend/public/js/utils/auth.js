function signUpUser(formElem, postRoute, redirectRoute, errHandler, formFieldNamesArr) {
    formElem.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const body = {};
        formFieldNamesArr.forEach(field => {
            body[field] = formData.get(field)
        });

        try {
            const res = await fetch(postRoute, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
                }
            });
            if (!res.ok) {
                throw res;
            }
            const {
                token,
                user: {
                    id
                }
            } = await res.json();
            // storage access_token in localStorage:
            localStorage.setItem("TAPPDIN_ACCESS_TOKEN", token);
            localStorage.setItem("TAPPDIN_CURRENT_USER_ID", id);

            //also add access_token to cookies for server to use 
            document.cookie = `TAPPDIN_ACCESS_TOKEN=${token}`;
            document.cookie = `TAPPDIN_CURRENT_USER_ID=${id}`;
            // redirect to home page to see all tweets:
            window.location.href = redirectRoute;
        } catch (err) {
            errHandler(err);
        }
    });
}


function logInUser(formElem, postRoute, redirectRoute, errHandler, formFieldNamesArr) {
    formElem.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const body = {};
        formFieldNamesArr.forEach(field => {
            body[field] = formData.get(field)
        });

        try {
            const res = await fetch(postRoute, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
                }
            });
            if (!res.ok) {
                throw res;
            }
            const { token, user: { id } } = await res.json();
            localStorage.setItem("TAPPDIN_ACCESS_TOKEN", token);
            localStorage.setItem("TAPPDIN_CURRENT_USER_ID", id);
            window.location.href = redirectRoute;
        } catch (err) {
            errHandler(err);
        }
    });
}

function logOutUser(redirectRoute, errHandler) {
    try {
        localStorage.removeItem("TAPPDIN_ACCESS_TOKEN");
        localStorage.removeItem("TAPPDIN_CURRENT_USER_ID");
        window.location.href = redirectRoute;
    } catch (err) {
        errHandler(err);
    }
}


//NOTE: THESE ERROR HANDLERS ARE EXAMPLES
//FOR WHAT YOU CAN PUT IN THE 'errHandler' OF ABOVE FXNS
function signUpErrorHandler(err) {
    if (err.status === 401) {
        window.location.href = "/";
    }
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
            `
                <div class="alert alert-danger">
                    Something went wrong. Please try again.
                </div>
                `,
        ];
        const {
            errors
        } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
                    <div class="alert alert-danger">
                    ${message}
                    </div>
                    `
            );
            errorsContainer.innerHTML = errorsHtml.join("");
        } else {
            alert("Something went wrong. Please check your internet connection and try again!");
        }
    }
}
function logInUserErrorHandler(err) {
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
            `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
        ];
        const {
            errors
        } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
    }
}

module.exports = { signUpUser, logInUser, logOutUser };
