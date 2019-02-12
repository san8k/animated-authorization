const LOADING_DELAY = 5000;
const SUCCESS_DELAY = 3000;

const main = document.querySelector(`.main`);

const authorizationForm = document.querySelector(`#authorization`).
                          content.
                          querySelector(`.authorization`);

const login = authorizationForm.querySelector(`#login`);
const password = authorizationForm.querySelector(`#password`);
const submit = authorizationForm.querySelector(`.modal__button--submit`);

const successPopup = document.querySelector(`#success`).
                content.
                querySelector(`.modal--success`);

const errorPopup = document.querySelector(`#error`).
                content.
                querySelector(`.modal--error`);

const errorButton = errorPopup.querySelector(`.modal__button--error`);

const loading = document.querySelector(`#loading`).
                content.
                querySelector(`.loading`);

const loadingIndicator = loading.querySelector(`.loading__indicator`);                
const loadingText = loading.querySelector(`.loading__text`);    

const welcome = document.querySelector(`#welcome`).
                content.
                querySelector(`.welcome`);

window.onload = () => {
    main.append(loading);

    const onLoadingTransitionEnd = () => {
        loading.removeEventListener(`transitionend`, onLoadingTransitionEnd);
        loading.remove();
        authorizationForm.classList.add(`modal-down-in`);
        main.append(authorizationForm);
        const onShowLoginPopupAnimationEnd = () => {
            authorizationForm.removeEventListener(`animationend`, onShowLoginPopupAnimationEnd);
            authorizationForm.classList.remove(`modal-down-in`);
            login.focus();
        }
        authorizationForm.addEventListener(`animationend`, onShowLoginPopupAnimationEnd);
    };

    setTimeout(() => {
        loadingText.style.display = `none`;
        loading.classList.add(`scale-away`);
        loading.addEventListener(`transitionend`, onLoadingTransitionEnd);
    }, LOADING_DELAY);
};

const showWelcome = () => {
    successPopup.classList.add(`modal-up-out`);
    const onSuccessRemovedAnimationEnd = () => {
        successPopup.removeEventListener(`animationend`, onSuccessRemovedAnimationEnd);
        successPopup.classList.remove(`modal-up-out`);
        successPopup.remove();
        main.append(welcome);
        welcome.classList.add(`fade-in`);
    }
    successPopup.addEventListener(`animationend`, onSuccessRemovedAnimationEnd);
};

const showErrorLogin = () => {
    errorPopup.classList.add(`modal-roll-in`);
    main.append(errorPopup);
}

const showSuccessLogin = () => {
    successPopup.classList.add(`modal-roll-in`);
    main.append(successPopup);
    const onShowSuccessAnimationEnd = () => {
        successPopup.removeEventListener(`animationend`, onShowSuccessAnimationEnd);
        successPopup.classList.remove(`modal-roll-in`);

        setTimeout(() => {
            showWelcome();
        }, SUCCESS_DELAY);
    }

    successPopup.addEventListener(`animationend`, onShowSuccessAnimationEnd);
}

submit.onclick = (e) => {
    e.preventDefault();
    if (login.value.trim().length && password.value.trim().length) {

        authorizationForm.classList.add(`modal-wave`);
        login.disabled = true;
        login.style.backgroundColor = `#ccc`;
        password.disabled = true;
        password.style.backgroundColor = `#ccc`;
        submit.disabled = true;
        submit.style.backgroundColor = `#ccc`;
        submit.textContent = `Wait...`;

        setTimeout(() => {
            
            authorizationForm.classList.remove(`modal-wave`);
            authorizationForm.classList.add(`modal-roll-out`);
            

            const onSubmitAnimationEnd = () => {
                authorizationForm.removeEventListener(`animationend`, onSubmitAnimationEnd);
                authorizationForm.classList.remove(`modal-roll-out`);
                authorizationForm.remove();
                
                if (login.value ===`test` && password.value === `test`) {
                    showSuccessLogin();
                } else {
                    showErrorLogin();
                }
            }
            authorizationForm.addEventListener(`animationend`, onSubmitAnimationEnd);
            
        }, LOADING_DELAY);

    } else {

        if (!login.value.trim().length) {
            login.placeholder = `>>> enter login <<<`;
        } else {
            login.placeholder = ``;
        }
        if (!password.value.trim().length) {
            password.placeholder = `>>> enter password <<<`;
        } else {
            password.placeholder = ``;
        }

        authorizationForm.classList.add(`modal-invalid`);
        const onInvalidSubmitAnimationEnd = () => {
            authorizationForm.removeEventListener(`animationend`, onInvalidSubmitAnimationEnd);
            authorizationForm.classList.remove(`modal-invalid`);
        }
        authorizationForm.addEventListener(`animationend`, onInvalidSubmitAnimationEnd);
    }
};

errorButton.onclick = (e) => {
    e.preventDefault();
    errorPopup.classList.remove(`modal-roll-in`);
    errorPopup.classList.add(`modal-roll-out`);

    const onErrorAnimatinonEnd = () => {
        errorPopup.removeEventListener(`animationend`, onErrorAnimatinonEnd);
        errorPopup.classList.remove(`modal-roll-out`);
        errorPopup.remove();
        
        authorizationForm.classList.add(`modal-roll-in`);
        main.append(authorizationForm);
        const onShowLoginPopupAgainAnimationEnd = () => {
            authorizationForm.removeEventListener(`animationend`, onShowLoginPopupAgainAnimationEnd);
            authorizationForm.classList.remove(`modal-roll-in`);
            password.focus();
        };
        authorizationForm.addEventListener(`animationend`, onShowLoginPopupAgainAnimationEnd);
    };

    errorPopup.addEventListener(`animationend`, onErrorAnimatinonEnd);

    login.disabled = false;
    login.style.backgroundColor = ``;

    password.disabled = false;
    password.style.backgroundColor = ``;
    password.value = ``;

    submit.disabled = false;
    submit.style.backgroundColor = ``;
    submit.textContent = `Submit`;
};
