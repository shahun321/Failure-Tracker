const rigInput = document.getElementById("rigNumber");
const failureIDInput = document.getElementById("failureID");

// Auto-generate Failure ID when Rig Number changes
rigInput.addEventListener("input", () => {
  if (rigInput.value.trim() !== "") {
    const uniqueID = rigInput.value + "-" + Date.now();
    failureIDInput.value = uniqueID;
  } else {
    failureIDInput.value = "";
  }
});

document.getElementById("failureForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const rigNumber = rigInput.value;
  const failureID = failureIDInput.value;
  const dateTime = document.getElementById("dateTime").value;
  const component = document.getElementById("component").value;
  const failureType = document.getElementById("failureType").value;
  const severity = document.getElementById("severity").value;
  const description = document.getElementById("description").value;

  const failure = { failureID, rigNumber, dateTime, component, failureType, severity, description };

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzDaNhR9DOlfeqD-bfxx_bBrtD4N953xXTSVMeWWEPAmIho3BNgrdYNykQgazRIlRAckw/exec", {
      method: "POST",
      body: JSON.stringify(failure),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors"
    });

    const data = await res.text();
    console.log(data);

    // Show locally
    const li = document.createElement("li");
    li.textContent = `${failureID} | ${rigNumber} | ${dateTime} | ${component} | ${failureType} | ${severity} | ${description}`;
    document.getElementById("records").appendChild(li);

    document.getElementById("failureForm").reset();
    failureIDInput.value = ""; // clear until next Rig Number entry
    alert("Submitted successfully!");
  } catch (err) {
    alert("Error submitting data: " + err);
  }
});

