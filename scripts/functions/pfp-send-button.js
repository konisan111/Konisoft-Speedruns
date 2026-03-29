export function pfpSendButtonFunction (
    customCountryDropdown,
    hiddenCountryInput,
    showToast
    ) {
        
    let isValid = true;
      let errors = [];
      customCountryDropdown.classList.remove('input-error');

      if (hiddenCountryInput.value === "") {
          customCountryDropdown.classList.add('input-error');
          showToast(isHungarian ? "Kérlek válassz egy országot." : "Please select a country.", "error");
          isValid = false;
      }

      if (isValid) {
          console.log("Registration complete! Valid country selected.");
          
      } else {
          errors.forEach(err => showToastError(err));
      }
}