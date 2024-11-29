<!-- Multi-Step Form -->
<div id="multiStepForm" style="font-family: Poppins, sans-serif; max-width: 400px; margin: 0 auto; border: 1px solid black; background-color: #fff; padding: 20px; box-sizing: border-box;">
  <div id="step1" class="form-step" style="display: block;">
    <h2 style="text-align: center; color: #ff6b08; margin-bottom: 30px;">Get Your Consultation and Treatment Plan Now</h2>
    
    <!-- First Name -->
    <div style="margin-bottom: 20px;">
      <input type="text" name="firstName" id="firstName" placeholder="First Name*" aria-label="First Name" required style="width: 100%; padding: 10px; border: 1px solid #555; border-radius: 4px; font-size: 14px;">
      <p id="firstNameError" style="color: #b22222; font-size: 12px; display: none; margin-top: 5px;">This field is required.</p>
    </div>

    <!-- Last Name -->
    <div style="margin-bottom: 20px;">
      <input type="text" name="lastName" id="lastName" placeholder="Last Name*" aria-label="Last Name" required style="width: 100%; padding: 10px; border: 1px solid #555; border-radius: 4px; font-size: 14px;">
      <p id="lastNameError" style="color: #b22222; font-size: 12px; display: none; margin-top: 5px;">This field is required.</p>
    </div>

    <!-- Phone -->
    <div style="margin-bottom: 20px;">
      <input type="tel" name="phone" id="phone" placeholder="Phone Number*" aria-label="Phone Number" required style="width: 100%; padding: 10px; border: 1px solid #555; border-radius: 4px; font-size: 14px;">
      <p id="phoneError" style="color: #b22222; font-size: 12px; display: none; margin-top: 5px;">This field is required.</p>
    </div>

    <!-- Email -->
    <div style="margin-bottom: 20px;">
      <input type="email" name="email" id="email" placeholder="Email Address*" aria-label="Email Address" required style="width: 100%; padding: 10px; border: 1px solid #555; border-radius: 4px; font-size: 14px;">
      <p id="emailError" style="color: #b22222; font-size: 12px; display: none; margin-top: 5px;">This field is required.</p>
    </div>

    <!-- Area of Pain -->
    <div style="margin-bottom: 20px;">
      <input type="text" name="painArea" id="painArea" placeholder="Area of pain or condition" aria-label="Area of Pain or Condition" style="width: 100%; padding: 10px; border: 1px solid #555; border-radius: 4px; font-size: 14px;">
    </div>

    <!-- Consent -->
    <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 30px; font-size: 14px; font-weight: normal; color: #333; line-height: 1.5;">
      <input type="checkbox" name="consent" id="consent" required style="margin-top: 4px;">
      <span>
        I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from the company. Message frequency varies. Message & data rates may apply.
      </span>
    </label>
    <p id="consentError" style="color: #b22222; font-size: 12px; display: none; margin-top: -20px; margin-bottom: 20px;">You must agree to the consent checkbox.</p>

    <!-- Get Treated Button -->
    <div style="text-align: center; margin-top: 20px;">
      <button onclick="validateStep1(event)" style="background-color: #611011; color: white; padding: 15px; width: 100%; border: none; border-radius: 4px; font-size: 18px; cursor: pointer;">
        Get Treated
      </button>
    </div>
  </div>
</div>

<script>
const firstName = document.querySelector('[name="firstName"]');

let formStarted = false; // Prevent duplicate tracking

document.querySelectorAll('#step1 input').forEach((field) => {
  field.addEventListener("focus", () => {
    if (!formStarted) {
      gtag('event', 'form_start', {
        event_category: 'Form',
        event_label: 'Step 1',
        step: 1
      });
      formStarted = true; // Set the flag to true
    }
  });
});
  function validateStep1(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('[name="firstName"]');
    const lastName = document.querySelector('[name="lastName"]');
    const phone = document.querySelector('[name="phone"]');
    const email = document.querySelector('[name="email"]');
    const painArea = document.querySelector('[name="painArea"]');
    const consent = document.querySelector('[name="consent"]');
  
    let isValid = true;
  
    // Real-time error removal listeners
    [firstName, lastName, phone, email].forEach((field) => {
      field.addEventListener("input", () => {
        document.getElementById(`${field.name}Error`).style.display = "none";
      });
    });
  
    consent.addEventListener("change", () => {
      document.getElementById("consentError").style.display = "none";
    });
  
    // Validation checks
    if (!firstName.value.trim()) {
      document.getElementById("firstNameError").style.display = "block";
      isValid = false;
    }
  
    if (!lastName.value.trim()) {
      document.getElementById("lastNameError").style.display = "block";
      isValid = false;
    }
  
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phoneRegex.test(phone.value.trim())) {
      document.getElementById("phoneError").textContent = "Enter a valid phone number (e.g., 123-456-7890).";
      document.getElementById("phoneError").style.display = "block";
      isValid = false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      document.getElementById("emailError").textContent = "Enter a valid email address.";
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }
  
    if (!consent.checked) {
      document.getElementById("consentError").style.display = "block";
      isValid = false;
    }
  
    if (isValid) {
    
      // Extract UTM parameters from the URL or set default values
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source") || "organic/referral";
      const utmMedium = urlParams.get("utm_medium") || "unknown";
      const utmCampaign = urlParams.get("utm_campaign") || "not_set";
      const utmContent = urlParams.get("utm_content") || "not_set";
      const utmTerm = urlParams.get("utm_term") || "not_set";
      const referrer = document.referrer || "direct";
  
      // Check and set first-touch attribution for utm_content
      let firstUtmContent = localStorage.getItem("first_utm_content");
      if (!firstUtmContent || firstUtmContent === "not_set") {
        firstUtmContent = utmContent;
        localStorage.setItem("first_utm_content", firstUtmContent);
        console.log("First-touch UTM content saved:", firstUtmContent);
      } else {
        console.log("First-touch UTM content retrieved:", firstUtmContent);
      }
  
      // Determine last-touch attribution for utm_content
      let lastUtmContent = utmContent;
      if (!utmContent || utmContent === "not_set") {
        lastUtmContent = firstUtmContent;
        console.log("Last-touch UTM content defaulted to first-touch:", lastUtmContent);
      } else {
        console.log("Last-touch UTM content retrieved:", lastUtmContent);
      }
      gtag('event', 'form_submit_step1', {
    event_category: 'Form',
    event_label: 'Step 1 Completed',
    step: 1,
    completed_fields: ['firstName', 'lastName', 'phone', 'email', 'consent'],
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_content: utmContent,
    utm_term: utmTerm
  });
      // Save form data to localStorage
      localStorage.setItem("firstName", firstName.value.trim());
      localStorage.setItem("lastName", lastName.value.trim());
      localStorage.setItem("phone", phone.value.trim());
      localStorage.setItem("email", email.value.trim());
      localStorage.setItem("painArea", painArea.value.trim());
      localStorage.setItem("consent", consent.checked ? "on" : "off");
      localStorage.setItem("form_step", "1");
  
      // Prepare form data
      const formData = new FormData();
      formData.append("firstName", firstName.value.trim());
      formData.append("lastName", lastName.value.trim());
      formData.append("phone", phone.value.trim());
      formData.append("email", email.value.trim());
      formData.append("painArea", painArea.value.trim());
      formData.append("consent", consent.checked ? "on" : "off");
      formData.append("utm_source", utmSource);
      formData.append("utm_medium", utmMedium);
      formData.append("utm_campaign", utmCampaign);
      formData.append("utm_content", utmContent);
      formData.append("utm_term", utmTerm);
      formData.append("referrer", referrer);
      formData.append("first_utm_content", firstUtmContent);
      formData.append("last_utm_content", lastUtmContent);
      formData.append("form_step", "1");
  
      // Submit data to Getform
      fetch("https://getform.io/f/amddydqb", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = `https://advancedreliefcare.com/book-appointment?firstName=${encodeURIComponent(firstName.value.trim())}` +
              `&lastName=${encodeURIComponent(lastName.value.trim())}` +
              `&phone=${encodeURIComponent(phone.value.trim())}` +
              `&email=${encodeURIComponent(email.value.trim())}` +
              `&painArea=${encodeURIComponent(painArea.value.trim())}` +
              `&utm_source=${encodeURIComponent(utmSource)}` +
              `&utm_medium=${encodeURIComponent(utmMedium)}` +
              `&utm_campaign=${encodeURIComponent(utmCampaign)}` +
              `&utm_content=${encodeURIComponent(utmContent)}` +
              `&utm_term=${encodeURIComponent(utmTerm)}` +
              `&first_utm_content=${encodeURIComponent(firstUtmContent)}` +
              `&last_utm_content=${encodeURIComponent(lastUtmContent)}` +
              `&form_step=1`;
          } else {
            document.getElementById("multiStepForm").innerHTML = `
              <p style='color: red; text-align: center;'>An error occurred. Please try again later.</p>`;
          }
        })
        .catch((error) => {
          console.error("Submission Error:", error);
          document.getElementById("multiStepForm").innerHTML = `
            <p style='color: red; text-align: center;'>An error occurred while submitting your request. Please try again later.</p>`;
        });
    }
  }
  </script>