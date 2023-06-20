
// // || NAV TOGGLE
const toggleBtn = document.querySelector('.toggle-btn');
const toggleIcon = document.querySelector('.toggle-btn i');
const navLinks = document.querySelector('.nav-list');

toggleBtn.onclick = () =>{

    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');    
    toggleIcon.classList = isActive ? `fa-solid fa-xmark` : `fa-solid fa-bars`; 

}