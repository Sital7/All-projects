function alertMessage(action) {
    alert(`${action}`);
}

function redirectToLogin() {
    alert('Redirecting to Login...');
}


document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".progress-circle");

    function checkVisibility() {
        skills.forEach(skill => {
            const skillValue = skill.getAttribute("data-value");
            const rect = skill.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                skill.style.background = `conic-gradient(#3498db 0% ${skillValue}%, #f0f0f0 ${skillValue}% 100%)`;
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();  
});



function showCompanyName(company) {
    
    const companyNames = document.querySelectorAll('.company-name');
    
    
    companyNames.forEach(function(name) {
        name.style.display = 'none';
    });

   
    const projectInfo = event.currentTarget.querySelector('.company-name');
    projectInfo.textContent = company;
    projectInfo.style.display = 'block';
}
