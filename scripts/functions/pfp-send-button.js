export function pfpSendButtonFunction (
    customCountryDropdown,
    hiddenCountryInput,
    ) {
        
    let isValid = true;
      let errors = [];
      customCountryDropdown.classList.remove('input-error');

      if (hiddenCountryInput.value === "") {
          customCountryDropdown.classList.add('input-error');
          errors.push(isHungarian ? "Kérlek válassz egy országot." : "Please select a country.");
          isValid = false;
      }

      if (isValid) {
          console.log("Registration complete! Valid country selected.");
          
      } else {
          errors.forEach(err => showToastError(err));
      }
}