document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CIBLAGE DU BON ÉLÉMENT QUI SCROLLE ---
    const scrollContainer = document.querySelector('.main-content');
    
    // --- 2. EFFET MACHINE À ÉCRIRE ---
    const textElement = document.querySelector('.code-text code');
    const phrase = "<code > Je construis des infrastructures sécurisées. </code>";
    
    let charIndex = 0;
    let isDeleting = false;

    if(textElement) {
        function typeEffect() {
            const currentText = phrase.substring(0, charIndex);
            textElement.textContent = currentText;

            let typeSpeed = isDeleting ? 30 : 80; 

            if (!isDeleting && charIndex < phrase.length) {
                charIndex++;
                setTimeout(typeEffect, typeSpeed);
            } 
            else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, typeSpeed);
            } 
            else {
                isDeleting = !isDeleting;
                setTimeout(typeEffect, isDeleting ? 2000 : 500);
            }
        }
        typeEffect();
    }

    // --- 3. MENU ACTIF AU SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.right-navbar .nav-link');

    if(scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = scrollContainer.scrollTop; 

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Déclenchement un peu avant d'arriver sur la section (-250px)
                if (scrollPosition >= (sectionTop - 250)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href'); 
                if (href.includes(current) && current !== '') {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- 4. MENU MOBILE ---
    const mobileBtn = document.createElement('div');
    mobileBtn.classList.add('mobile-menu-btn');
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileBtn);

    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    document.body.appendChild(overlay);

    function toggleMenu() {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
            mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // --- 5. FONCTIONNALITÉS DU LABO (Zone Interactive) ---

    // A. Bouton Message Caché (Motivation)
    const btnReveal = document.getElementById('btn-reveal');
    const secretMessage = document.getElementById('secret-message');

    if(btnReveal && secretMessage) {
        btnReveal.addEventListener('click', function() {
            // Afficher le message
            secretMessage.style.display = 'block';
            // Cacher le bouton
            this.style.display = 'none';
        });
    }

    // B. Ajout Dynamique de Compétence (Avec Suppression)
    const btnAddSkill = document.getElementById('btn-add-skill');
    const inputSkill = document.getElementById('new-skill');
    const listSkills = document.getElementById('dynamic-skills-list');

    if(btnAddSkill && inputSkill && listSkills) {
        btnAddSkill.addEventListener('click', function() {
            const val = inputSkill.value;
            
            // Vérification que ce n'est pas vide
            if(val.trim() !== "") {
                // 1. Créer le li
                const newLi = document.createElement('li');
                
                // 2. Créer le texte
                const textSpan = document.createElement('span');
                textSpan.textContent = val;
                
                // 3. Créer le bouton supprimer (Croix)
                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = '<i class="fas fa-times"></i>';
                btnDelete.classList.add('btn-delete-skill');
                
                // 4. Action de suppression au clic sur la croix
                btnDelete.addEventListener('click', function() {
                    newLi.remove();
                });

                // 5. Tout assembler
                newLi.appendChild(textSpan);
                newLi.appendChild(btnDelete);
                listSkills.appendChild(newLi);
                
                // 6. Vider le champ
                inputSkill.value = "";
            } else {
                alert("Oups !! il est impossible d'ajouter cette compétence. Veuillez écrire une compétence !");
            }
        });
    }

});