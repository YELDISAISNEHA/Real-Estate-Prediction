function onClickedEstimatePrice(){
    console.log("Estimate price button clicked");
    const sqft = document.getElementById("uiSqft").value;
    const bhk = parseInt(document.getElementById("uiBHK").value);
    const bath = parseInt(document.getElementById("uiBathrooms").value);
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");
    const button = document.querySelector(".submit");
    const url = "https://home-price-predictions.onrender.com/predict_home_price";

    if (!sqft || !bhk || !bath || !location) {
        alert("Please fill in all the fields.");
        return;
    }

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location
    }, function(data, status) {
        estPrice.innerHTML = "<h5>" + data.estimated_price.toString() + " Lakh</h5>";
        button.style.backgroundColor = "#783e3e";
        button.style.color = "#ffffffff"
    });
}
function onPageLoad() {
    fetch('https://home-price-predictions.onrender.com/get_location_names')
        .then(response => response.json())
        .then(data => {
            const locations = data.locations;
            const dropdown = document.getElementById('uiLocations');
            locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading location data: ', error);
        });
}

window.onload = onPageLoad;