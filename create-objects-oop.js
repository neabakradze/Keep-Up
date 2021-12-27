

const form = document.querySelector('.form');
let durationinput = document.querySelector('.duration');
let distanceinput = document.querySelector('.distance');
let runninginput = document.querySelector('.running');
let selection = document.querySelector('.selection');
let cyclinginput = document.querySelector('.cycling');
const parentBox = document.querySelector('.parent-box');
let cyclingdiv = document.querySelector('.cyclingdiv');
let runningdiv = document.querySelector('.runningdiv');
let loader = document.querySelector('.loader');
let map, maplocation;
class app {
    #maplocation
    #map
    #workouts = [];

    constructor() {
        this.getposition();
        this.getlocalstorage();
        form.addEventListener('submit', this.newworkout.bind(this))
        parentBox.addEventListener('click', this.movetopopup.bind(this))
        selection.addEventListener('change', function () {
            cyclingdiv.classList.toggle('hide');
            runningdiv.classList.toggle('hide');
        })

    };

    getposition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.loadmap.bind(this), function () {
                alert('error')
            })
        }
    };

    loadmap(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const cords = [latitude, longitude];

        this.#map = L.map('map').setView(cords, 13);

        //map tile
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        loader.classList.add('hide');
        //clicking the map for the input to show
        this.#map.on('click', this.showform.bind(this))

        this.#workouts.forEach(work => {
            this.setmarker(work);
        });

    };
    showform(mapEvent) {
        this.#maplocation = mapEvent;
        console.log(mapEvent)
        form.classList.remove('hide');
    };
    movetopopup(e) {
        let workoutel = e.target.closest('.workout');
        console.log(workoutel);
        const workout = this.#workouts.find(work => work.id === workoutel.dataset.id);
        console.log(workout);
        this.#map.setView(workout.cords, 13, {
            animate: true,
            pan: {
                duration: 1
            }
        })
    };
    toggleelevationfield() { };
    newworkout(e) {

        e.preventDefault();
        ////functional part values get validated
        const type = selection.value;
        const distance = +distanceinput.value;
        const duration = +durationinput.value;
        const maploclat = this.#maplocation.latlng.lat;
        const maploclng = this.#maplocation.latlng.lng;
        let workout;
        const validateinput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allpositive = (...inputs) => inputs.every(inp => inp > 0);
        ////running selected
        if (type === 'running') {
            const candence = +runninginput.value;
            if (!validateinput(distance, duration, candence) || !allpositive(distance, duration, candence)) {
                alert("values have to be positive")
                distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';

            } else {
                if (this.#workouts.length < 3) {
                    workout = new running([maploclat, maploclng], distance, duration, candence)
                    this.#workouts.push(workout);

                    this.setmarker(workout);
                    this.renderworkoutmarker(workout);

                    function hideform() {
                        form.classList.add('hide');
                        distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';
                    }
                    hideform()
                    function setlocalstorage(x) {

                        localStorage.setItem('workout', JSON.stringify(x));
                    }
                    setlocalstorage(this.#workouts);

                } else if (this.#workouts.length > 2) {
                    alert('cant add more marks')
                    form.classList.add('hide');
                    distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';
                }
            }
        }
        ///cycling selected
        if (type === 'cycling') {
            const cyclingvalue = +cyclinginput.value;
            if (!validateinput(distance, duration, cyclingvalue) || !allpositive(distance, duration)) {
                alert("values have to be positive")
                distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';
            }
            else {
                if (this.#workouts.length < 3) {
                    workout = new cycling([maploclat, maploclng], distance, duration, cyclingvalue)
                    this.#workouts.push(workout);

                    this.setmarker(workout);
                    this.renderworkoutmarker(workout);

                    function hideform() {
                        form.classList.add('hide');
                        distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';
                    }
                    hideform()
                    function setlocalstorage(x) {

                        localStorage.setItem('workout', JSON.stringify(x));
                    }

                    setlocalstorage(this.#workouts);

                } else if (this.#workouts.length > 2) {
                    alert('cant add more marks')
                    form.classList.add('hide');
                    distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';
                }

            }







        }

    }
    renderworkoutmarker(workout) {
        let html = `
        <li class= "workout-${workout.type}  workout" data-id="${workout.id}">
        <h2 class="workout-title">${workout.description}</h2>
    
        <div class="workout-details">
            <span class="workout-icon"><i class="fas fa-running"></i> </span>
            <span class="workout-value">${workout.distance}</span>
            <span class="workout-unit">km</span>
        </div>
        <div class="workout-details">
            <span class="workout-icon"><i class="far fa-clock"></i></span>
            <span class="workout-value">${workout.duration}</span>
            <span class="workout-unit">min</span>
        </div>
        `;
        if (workout.type === 'running') {
            html += ` <div class="workout-details">
            <span class="workout-icon"><i class="fas fa-bolt"></i></span>
            <span class="workout-value">${Math.floor(workout.pase)}</span>
            <span class="workout-unit">min/km</span>
        </div>
        <div class="workout-details">
            <span class="workout-icon"><i class="fas fa-shoe-prints"></i></span>
            <span class="workout-value">${workout.cadence}</span>
            <span class="workout-unit">spm</span>
        </div>
    
    </li>`
        }
        if (workout.type === 'cycling') {
            html += `  <div class="workout-details">
            <span class="workout-icon"><i class="fas fa-bolt"></i></span>
            <span class="workout-value">${Math.floor(workout.pase)}</span>
            <span class="workout-unit">km/h</span>
        </div>
        <div class="workout-details">
            <span class="workout-icon"><i class="fas fa-mountain"></i></span>
            <span class="workout-value">${workout.elevationgain}</span>
            <span class="workout-unit">m</span>
        </div>
    
    </li>`;
        }
        console.log(parentBox, html)
        parentBox.insertAdjacentHTML('afterbegin', html);
    };

    getlocalstorage() {
        const data = JSON.parse(localStorage.getItem('workout'));
        console.log(data)
        if (!data) return;
        this.#workouts = data;
        this.#workouts.forEach(work => {
            this.renderworkoutmarker(work);
        });

    }
    setmarker(workout) {
        L.marker(workout.cords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `run`,

            }))
            .setPopupContent(`${workout.description}`)
            .openPopup();
    }


}
const appify = new app();

class workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    constructor(cords, distance, duration) {
        this.cords = cords;
        this.distance = distance;
        this.duration = duration;
    }
    setdescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        this.description = `${this.type} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
        console.log(this.description)
    }
}
class running extends workout {
    type = 'running'
    constructor(cords, distance, duration, cadence) {
        super(cords, distance, duration);
        this.cadence = cadence;
        this.calcpase();
        this.setdescription();
    }
    calcpase() {
        this.pase = this.distance / this.duration;//min km
        return this.pase;
    }
}
class cycling extends workout {
    type = 'cycling'
    constructor(cords, distance, duration, elevationgain) {
        super(cords, distance, duration);
        this.elevationgain = elevationgain;
        this.calcspeed();
        this.setdescription();
    }
    calcspeed() {
        this.pase = this.distance / (this.duration / 60);//km hour
        return this.pase;
    }

}















