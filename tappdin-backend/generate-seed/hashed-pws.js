const bcrypt = require('bcryptjs')
let [password1, password2, password3] = ['abc123', 'abc123', 'abc123']
async function hasher(){
        password1 = await bcrypt.hash(password1, 10);
        password2 = await bcrypt.hash(password2, 10);
        password3 = await bcrypt.hash(password3, 10);
        console.log(password1, '\n', password2, '\n', password3);
}
hasher()

