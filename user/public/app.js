export default {
    name: 'Test',

    setup() {
        const title = "Hello";
        return {
            title
        };
    },
    
    template: `
      <div>
      <button id="login">SignUp</button>
      <button id="logout">LogOut</button>
  <button id="register">Login</button>
<button id="allUsers">AllUsers</button>
<button id="fsignin">facebook</button>
<h1>user profile</h1>
      <h3>Name</h3>
      <div id="name"></div>
    
      <h3>email</h3>
      <div id="email"></div>

      <h3>user profile image</h1><br>
      <img src="" id="userProfile" alt="">
      
      </div>
    `,
};