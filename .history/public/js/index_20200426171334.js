import '@babel/polyfill';
import { login,logout } from './login';
import { displayMap } from './mapbox';
import {showAlert} from './alerts';
import {update} from './updateSettings'
//values
console.log("hi from parcel")
const updateForm = document.querySelector('.form--update')

const userPassword = document.querySelector('.form-user-password')

const loginForm = document.querySelector('.form--login'); 
const logoutBtn = document.querySelector('.nav__el--logout')
if (loginForm) {
  
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
    login(email, password);
  });
}  
if (updateForm){
  updateForm.addEventListener('submit',e =>{
    e.preventDefault();
    const form = new FormData();
    form.append('name',document.getElementById('name').value);
    form.append('email',document.getElementById('email').value);
    form.append('photo',document.getElementById('photo').files[0])
      
    // console.log(name,email)
    update(form,"data");
  })
}
if (userPassword){
  userPassword.addEventListener('submit',async e =>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating....'
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    // console.log(name,email)
    await update({passwordCurrent,password,passwordConfirm},"password");
    document.querySelector('.btn--save-password').textContent = 'save password'

    document.getElementById('password-current').value = ''
    document.getElementById('password').value = ''
    document.getElementById('password-confirm').value = ''

  })
}
// dom elements
const mapBox = document.getElementById('map');

if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}
if (logoutBtn) logoutBtn.addEventListener('click',logout)