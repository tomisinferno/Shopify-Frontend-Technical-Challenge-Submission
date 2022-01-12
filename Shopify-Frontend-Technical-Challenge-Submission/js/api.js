const API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2&page=1&api_key=ZkTwfVmLLAtZJ2RV1b4Q74fXfz6nBfxYQnhMEIG0";

//Getting api data functions
async function fetchText() {
    let url = API_URL;

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }

}

//Processing in HTML functions
async function renderUsers() {

    let photos = await fetchText();

    const imgArray = photos.photos.map(p => p.img_src);
    const name = photos.photos.map(p => p.camera.name);
    const dateArray = photos.photos.map(p => p.earth_date);
    const roverArray = photos.photos.map(p => p.rover.name);


    for (let i = 0; i < imgArray.length; i++) {
        document.getElementById('feed').innerHTML +=
            "<div class='post'>" +
            "<img src=" + imgArray[i] + ">" +
            "<p>Taken with the " + name[i] + " on the " + roverArray[i] + " rover</p>" +
            "<p>" + dateArray[i] + " </p>" +
            "<div class='large-font text-center '>" +
            "  <ion-icon name='heart'>" +
            "    <div class='black-bg'></div>" +
            "  </ion-icon>" +
            "</div>" +
            "</div>";
    }
    let icon = document.getElementsByTagName('ion-icon');

    for (let item of icon) {
        item.onclick = function () {
            item.classList.toggle('active');
        }
    }
}


renderUsers();