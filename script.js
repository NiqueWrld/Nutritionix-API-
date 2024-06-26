async function getNutritionData() {
    const foodName = document.getElementById('foodInput').value.trim();
    if (foodName === '') {
        alert('Please enter a food item.');
        return;
    }

    searchImage(foodName)

    const endpoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const headers = {
        "x-app-id": "a9628a71",
        "x-app-key": "f0df7d528e699609bbf4d899ebe8e9fb",
        "Content-Type": "application/json"
    };
    const data = {
        "query": foodName
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.foods && result.foods.length > 0) {
            const food = result.foods[0];
            document.getElementById('result').innerHTML = `
                <h2>Nutrition Data for ${food.food_name}</h2>
                <p>Calories: ${food.nf_calories || 0}</p>
                <p>Protein: ${food.nf_protein || 0}</p>
                <p>Carbohydrates: ${food.nf_total_carbohydrate || 0}</p>
                <p>Fat: ${food.nf_total_fat || 0}</p>
            `;
        } else {
            document.getElementById('result').innerHTML = "<p>No nutrition data found for this food item.</p>";
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function searchImage(query) {
    const accessKey = 'J90Dlotag5W8uOxLIxTlU22EikpsrobdGehPo2z61D8'; // Replace 'YOUR_ACCESS_KEY' with your actual Unsplash access ke=

    if (query === '') {
        alert('Please enter a keyword to search for.');
        return;
    }

    const apiUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; // Clear previous image

        if (data.urls && data.urls.regular) {
            const img = document.createElement('img');
            img.src = data.urls.regular;
            img.alt = data.alt_description || 'Image';
            imageContainer.appendChild(img);
        } else {
            alert('No images found for the given keyword.');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}
