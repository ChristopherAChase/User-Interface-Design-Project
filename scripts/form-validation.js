const form = document.querySelector('form');
const petTypeDropdown = form.elements['pet-type-dropdown'];
const petAgeNumberField = form.elements['pet-age'];
const submitButton = form.elements['submit-button'];
const formFields = Array.from(form.elements)
  .filter((element) => element.type !== "radio" && element.type !== "submit");

const phoneNumberRegex = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/;

const emailAddressRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const stringValidationRegex = /^[A-Za-z ]+$/;

const isValidPhoneNumber =(phoneNumber) => (phoneNumberRegex.test(phoneNumber));

const isValidEmail = (emailAddress) => (emailAddressRegex.test(emailAddress))

const isValidString = (string) => (stringValidationRegex.test(string.trim()))

const isValidNumberField = (numberInputField) => {
  const [value, minimum, maximum] = Int32Array.from([numberInputField.value, numberInputField.min, numberInputField.max]);

  value !== '' && minimum <= value && value <= maximum
};

const isValidDropdownSelection = (selectionField) => (selectionField.value !== '' && selectionField.value !== 'blank')

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

const isFieldValid = (formField) => { 
  const fieldType = formField.type;
  return (
    (fieldType === "text" && isValidString(formField.value)) 
    || (fieldType === "number" && isValidNumberField(formField))
    || (fieldType === "tel" && isValidPhoneNumber(formField.value))
    || (fieldType === "email" && isValidEmail(formField.value)) 
    || (fieldType === "select-one" && isValidDropdownSelection(formField))
    || (formField.name === 'other-pet-type' && document.getElementById('other-pet-type-container').classList.contains('is-hidden'))
  );
}

function toggleFieldValidityOutline(element, isValid){
  if(element instanceof HTMLElement && typeof isValid === 'boolean'){
    element.classList.remove(`${isValid ? 'error' : 'success'}`);
    element.classList.add(`${isValid ? 'success' : 'error'}`);
  }
};

const toggle = (className) => (successIcon, errorIcon, isValidFieldEntry) => {
  errorIcon && errorIcon.classList[isValidFieldEntry ? 'add' : 'remove'](className);
  successIcon && successIcon.classList[isValidFieldEntry ? 'remove' : 'add'](className);
};

const toggleIcons = toggle('is-hidden');

function toggleFieldValidityIcons(iconClassName, isValid){
  if(typeof isValid === 'boolean'){
    const errorIcon = document.querySelector(`.fa-times.${iconClassName}`);
    const successIcon = document.querySelector(`.fa-check.${iconClassName}`);

    toggleIcons(successIcon, errorIcon, isValid);
  }
}

function handleAgeChange(event){
  const ageInput = event.target;
  const [monthRadio, yearRadio, ...rest] = form.elements['age-unit'];
  
  monthRadio.disabled = ageInput.value >= 12;
  yearRadio.checked = ageInput.value >= 12 ? true : yearRadio.checked;
}

const manageSubmitButtonDisabledState = () => (submitButton.disabled = formFields.filter((field) => !isFieldValid(field)).length);

petTypeDropdown.addEventListener('change', handleOtherPetTypeSelection);

petAgeNumberField.addEventListener('input', handleAgeChange);

formFields.forEach((element) => {
  element.addEventListener('blur', (event) => {  
    const formField = event.target;

    const fieldIsValid = isFieldValid(formField);

    toggleFieldValidityOutline(formField, fieldIsValid);
    toggleFieldValidityIcons(`${formField.name}-validator`, fieldIsValid);
    manageSubmitButtonDisabledState();
  });
});
