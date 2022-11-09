const form = document.querySelector('form');


const isValidPhoneNumber =(phoneNumber) => (/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/.test(phoneNumber));

const isValidEmail = (emailAddress) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress))

const isEmptyString = (string) => (!/^[A-Za-z ]+$/.test(string.trim()))

const isValidNumberField = (numberInputField) => {
  
  return numberInputField.value !== '' &&
  numberInputField.value >= numberInputField.min &&
  numberInputField.value <= numberInputField.max
  
};

const isValidDropdownSelection = (selectionField) => (
  selectionField.value !== '' || selectionField.value !== 'blank'
)

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
  console.log(formField)
  console.log(`Checking form field ${formField.name} which is a "${fieldType}" field with the current value of "${formField.value}"`)
  return (
    (fieldType === "text" && !isEmptyString(formField.value)) 
    || (fieldType === "number" && isValidNumberField(formField))
    || (fieldType === "tel" && isValidPhoneNumber(formField.value))
    || (fieldType === "email" && isValidEmail(formField.value)) 
    || (fieldType === "select-one" && isValidDropdownSelection(formField))
  );
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

function manageSubmitButtonDisabledState() {
  const invalidFormFields = formFields.filter((field) => {
    console.log(`Checking field ${field.name} (current value: ${field.value})`)
    return !isFieldValid(field)
  })
  // if (submitButton instanceof HTMLButtonElement){
    if (invalidFormFields.length === 0){
      submitButton.disabled = false;
    }
    else{
      submitButton.disabled = true;
    }
  // }
}


const petTypeDropdown = form.elements['pet-type-dropdown'];
const petAgeNumberField = form.elements['pet-age'];
const submitButton = form.elements['submit-button'];
const formFields = Array.from(form.elements)
  .filter((element) => element.type !== "radio" && element.type !== "submit");


petTypeDropdown.addEventListener('change', handleOtherPetTypeSelection);

petAgeNumberField.addEventListener('input', handleAgeChange);

formFields.forEach((element) => {
  element.addEventListener('blur', (event) => {  
    const formField = event.target;

    const fieldIsValid = isFieldValid(formField)

    console.log(`  ${formField.name} was ${fieldIsValid ? '' : 'in'}valid`)
    toggleFieldValidityOutline(formField, fieldIsValid);
    toggleFieldValidityIcons(`${formField.name}-validator`, fieldIsValid);
    // manageSubmitButtonDisabledState()
  });
});
