const form = document.querySelector('form');

const isValidPhoneNumber =(phoneNumber) => (/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/.test(phoneNumber));

const isValidEmail = (emailAddress) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress))

const isEmptyString = (string) => (!/^[A-Za-z ]+$/.test(string.trim()))

const isValidNumberField = (numberInputField) => (
  numberInputField.value !== '' &&
  numberInputField.value >= numberInputField.min &&
  numberInputField.value <= numberInputField.max
);

function handleOtherPetTypeSelection(event) {
  if(event.target instanceof HTMLSelectElement){
    const selectedValue = event.target.value;
    const otherPetTypeInput = document.getElementById('other-pet-type-container');
    if (selectedValue === 'other'){
      otherPetTypeInput.classList.remove('is-hidden');
    }
    else {
      otherPetTypeInput.classList.add('is-hidden')
    }
  }
};

function handleInputFieldValidation(event){
  const inputField = event.target;
  const inputType = inputField.type;

  const validInput =
    (inputType === "text" && !isEmptyString(inputField.value)) 
    || (inputType === "tel" && isValidPhoneNumber(inputField.value))
    || (inputType === "email" && isValidEmail(inputField.value))
    || (inputType === "number" && isValidNumberField(inputField));


  toggleFieldValidityOutline(inputField, validInput);
  toggleFieldValidityIcons(`${inputField.name}-validator`, validInput);
}

function toggleFieldValidityOutline(element, isValid){
  if(element instanceof HTMLElement && typeof isValid === 'boolean'){
    if(isValid){
      element.classList.remove('is-danger');
      element.classList.add('is-success');
    }
    else{
      element.classList.remove('is-success');
      element.classList.add('is-danger');
    }
  }
};

function toggleFieldValidityIcons(iconClassName, isValid){
  if(typeof isValid === 'boolean'){
    const errorIcon = document.querySelector(`.fa-times.${iconClassName}`)
    const successIcon = document.querySelector(`.fa-check.${iconClassName}`)

    if(errorIcon && successIcon){
      if(isValid){
        errorIcon.classList.add('is-hidden')
        successIcon.classList.remove('is-hidden')
      }
      else{
        successIcon.classList.add('is-hidden')
        errorIcon.classList.remove('is-hidden')
      }
    }
  }
}

function handleAgeChange(event){
  const ageInput = event.target;
  const [monthRadio, yearRadio, ...rest] = form.elements['age-unit'];
  if (
    ageInput instanceof HTMLInputElement
    && monthRadio instanceof HTMLInputElement 
    && yearRadio instanceof HTMLInputElement) 
  {
    const ageValue = ageInput.value;
    if (ageValue >= 12) {
      monthRadio.disabled = true;
      yearRadio.checked = true;
    }
    if (ageValue < 12 && monthRadio.disabled) {
      monthRadio.disabled = false;
    }
  }
}


const petTypeDropdown = form.elements['pet-type-dropdown'];
const textInputFields = form.querySelectorAll('input[type=text], input[type=tel], input[type=email], input[type=number]');

const petAgeNumberField = form.elements['pet-age'];


petTypeDropdown.addEventListener('change', handleOtherPetTypeSelection);

petAgeNumberField.addEventListener('input', handleAgeChange);

textInputFields.forEach((element) => {
  element.addEventListener('blur', handleInputFieldValidation);
});