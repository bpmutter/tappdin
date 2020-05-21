// const signUpForm = document.querySelector('.sign-up-form')

// signUpForm.addEventListener('submit', async (event) => {

//   event.preventDefault()

//   const formData = new FormData(signUpForm)

//   const email = formData.get('email')
//   const password = formData.get('password')
//   const username = formData.get('username')

//   const body = { email, password, username }

//   try {
//     const res = await fetch('http://localhost:8080/users', {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: { "Content-Type": "application/json" }
//     })
//     if (!res.ok) {
//       throw res
//     }
//     const {
//       token,
//       user: { id },
//     } = await res.json()

//     localStorage.setItem('TAPPDIN_ACCESS_TOKEN', token);
//     localStorage.setItem('TAPPDIN_CURRENT_USER_ID', id)
//     window.location.href = "/";
//   } catch (err) {
//     if (err.status >= 400 && err.status < 600) {
//       console.log(`ERR: `, err)
//       const errJSON = await err.json()
//       console.log(`errJSON is: `, errJSON)
//       const errorsContainer = document.querySelector('.errors-container')
//       let errorsHtml = [
//         `
//             <div class="alert alert-danger">
//               Something went wrong. Please try again.
//             </div>
//           `
//       ]
//       const { errors } = errJSON
//       console.log(errors)
//       if (errors && Array.isArray(errors)) {
//         errorsHtml = errors.map((message) => {
//           `
//             <div class="alert alert-danger">
//               ${message}
//             </div>
//           `
//         })
//       }
//       errorsContainer.innerHTML = errorsHtml.join('')
//     } else {
//       alert('OOPS! Something went wrong.')
//     };
//   }
// })
