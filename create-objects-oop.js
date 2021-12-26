// function findtotal(x) {
//     //Insert your code here 

//     var counter = 0;


//     x.forEach(function (item) {
//         if (item % 2 == 0) {
//             counter++;

//         }
//         if (item % 2) {
//             counter = counter + 3;

//         }
//         if (item == 5) {
//             counter = counter - 3
//         }
//         if (item == 5) {
//             counter = counter + 5;

//         };
//     })
//     console.log(counter);
// }
// var items = [1, 2, 3, 4, 5];
// var items2 = [17, 19, 21];
// var items3 = [5, 5, 5];
// findtotal(items);
// findtotal(items2);
// findtotal(items3);

// //OOP 
// //Function counstructor object
// const person = function (name, year) {
//     this.name = name;
//     this.year = year;
// }
// const nea = new person('nea', 2005);
// //prototypes
// person.prototype.calcage = function () {
//     console.log(2021 - this.year);
// };
// nea.calcage();
// // console.log(nea)
// // console.log(nea instanceof person);
// /////////test
// const cars = function (typOfCar, speed) {
//     this.typOfCar = typOfCar;
//     this.speed = speed;
// }
// cars.prototype.speedIncrease = function () {
//     console.log(this.speed + 10)
// }
// cars.prototype.speedDecrease = function () {
//     console.log(this.speed - 5)
// }

// const car1 = new cars('G-wagon', 2000);
// const car2 = new cars('hybrid', 1000);
// car1.speedIncrease();
// car2.speedIncrease();
// car1.speedDecrease();
// car2.speedDecrease();

// ///classes
// class names {
//     constructor(firstname, lastname) {
//         this.firstname = firstname;
//         this.lastname = lastname;
//     }
//     fullname() {
//         console.log(this.firstname, this.lastname);
//     }
// }
// const lali = new names('lali', 'bakradze');
// lali.fullname();
// ////object.create
// const objectcreatename = {
//     init(myname, year) {
//         this.myname = myname;
//         this.year = year;
//     },
//     dd() {
//         console.log(this.myname, this.year);
//     }
// }

// const objectcreate = Object.create(objectcreatename);
// objectcreate.init('nea', 579);
// objectcreate.dd();

// class carsagain {
//     constructor(carname, carspeed) {
//         this.carname = carname;
//         this.carspeed = carspeed;
//     }
//     get changespeed() {
//         return this.carspeed / 1.6;

//     }
//     set changespeedagain(carspeed) {
//         this.carspeed * 2;


//     }
// }

// const displaycars = new carsagain('bmw', 250);
// displaycars.changespeedagain = 2;
// console.log(displaycars.changespeed, displaycars.changespeedagain);
// displaycars.changespeedagain = 50;
// console.log(displaycars);
// let yourname = document.querySelector('.name');
// let country = document.querySelector('.country');
// let city = document.querySelector('.city');
// let map;
// let maplocation;
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         console.log(position)
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         console.log(latitude, longitude)
//         console.log(`https://www.google.com/maps/@${latitude},${longitude}`)
//         const cords = [latitude, longitude];
//         //creating displaying the map
//         map = L.map('map').setView(cords, 13);
//         //map tile
//         L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);
//         //clicking the map for the input to show
//         map.on('click', function (mapEvent) {
//             maplocation = mapEvent;
//             form.classList.remove('hide');

//         })

//     }, function () {
//         alert('error')
//     })
// }

// form.addEventListener('keypress', function (e) {
//     // e.preventDefault();
//     if (e.key === 'Enter') {
//         yourname.value = country.value = city.value = '';
//         console.log(maplocation)
//         const maploclat = maplocation.latlng.lat;
//         const maploclng = maplocation.latlng.lng;
//         console.log(maploclat, maploclng)
//         L.marker([maploclat, maploclng]).addTo(map)
//             .bindPopup(L.popup({
//                 maxWidth: 250,
//                 minWidth: 100,
//                 autoClose: false,
//                 closeOnClick: false,
//                 className: 'run',

//             }))
//             .setPopupContent('dsjjksdbjh')
//             .openPopup();
//     }
// })

const form = document.querySelector('.form');
let durationinput = document.querySelector('.duration');
let distanceinput = document.querySelector('.distance');
let runninginput = document.querySelector('.running');
let selection = document.querySelector('.selection');
let cyclinginput = document.querySelector('.cycling');
const parentBox = document.querySelector('.parent-box');
let map, maplocation;
class app {
    #maplocation
    #map
    #workouts = [];
    constructor() {

        this.getposition();

        form.addEventListener('keypress', this.newworkout.bind(this))
        parentBox.addEventListener('click', this.movetopopup.bind(this))
        selection.addEventListener('change', function () {
            cyclinginput.classList.toggle('hide');
            runninginput.classList.toggle('hide');
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

        console.log(position)

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(latitude, longitude)
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

        const cords = [latitude, longitude];
        // console.log(this);
        //creating displaying the map

        this.#map = L.map('map').setView(cords, 13);

        //map tile
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        //clicking the map for the input to show
        this.#map.on('click', this.showform.bind(this))



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

        if (e.key === 'Enter') {
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
                }
                //creating object
                workout = new running([maploclat, maploclng], distance, duration, candence)

            }
            ///cycling selected
            if (type === 'cycling') {
                const cyclingvalue = +cyclinginput.value;

                if (!validateinput(distance, duration, cyclingvalue) || !allpositive(distance, duration)) {
                    alert("values have to be positive")
                }
                workout = new cycling([maploclat, maploclng], distance, duration, cyclingvalue)
            }
            //adding objects to the array
            this.#workouts.push(workout);
            console.log(workout);


            // console.log(this.#maplocation)


            // console.log(maploclat, maploclng)
            L.marker([maploclat, maploclng]).addTo(this.#map)
                .bindPopup(L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `run`,

                }))
                .setPopupContent(`${workout.description}`)
                .openPopup();

            ///render lists
            function renderworkoutmarker(workout) {
                let html = `
                <li class= "workout-${workout.type}  workout" data-id="${workout.id}">
                <h2 class="workout-title">${workout.description}</h2>
            
                <div class="workout-details">
                    <span class="workout-icon">${workout.type === 'running' ? 'icon-run' : 'icon cycle'} </span>
                    <span class="workout-value">${workout.distance}</span>
                    <span class="workout-unit">km</span>
                </div>
                <div class="workout-details">
                    <span class="workout-icon">icon</span>
                    <span class="workout-value">${workout.duration}</span>
                    <span class="workout-unit">min</span>
                </div>
                `;
                if (workout.type === 'running') {
                    html += ` <div class="workout-details">
                    <span class="workout-icon">icon</span>
                    <span class="workout-value">${workout.pase.toFixed(1)}</span>
                    <span class="workout-unit">min/km</span>
                </div>
                <div class="workout-details">
                    <span class="workout-icon">icon</span>
                    <span class="workout-value">${workout.cadence}</span>
                    <span class="workout-unit">spm</span>
                </div>
            
            </li>`
                }
                if (workout.type === 'cycling') {
                    html += `  <div class="workout-details">
                    <span class="workout-icon">icon</span>
                    <span class="workout-value">${workout.pase}</span>
                    <span class="workout-unit">km/h</span>
                </div>
                <div class="workout-details">
                    <span class="workout-icon">icon</span>
                    <span class="workout-value">${workout.elevationgain}</span>
                    <span class="workout-unit">m</span>
                </div>
            
            </li>`;




                }
                console.log(parentBox, html)
                parentBox.insertAdjacentHTML('afterbegin', html);
            };
            renderworkoutmarker(workout)
            function hideform() {
                form.classList.add('hide');
                distanceinput.value = durationinput.value = runninginput.value = cyclinginput.value = '';
            }
            hideform()

        }

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

// const running2 = new running([51, -12], 5.2, 24, 178);
// const cycling2 = new cycling([39, -12], 27, 96, 567);
// console.log(running2, cycling2)


// fuckyou(workout) {
//     let html = `
//     <li class= "workout-${workout.type}" data-id="${workout.id}">
//     <h2 class="workout-title">${workout.description}</h2>

//     <div class="workout-details">
//         <span class="workout-icon">${workout.type === 'running' ? 'icon-run' : 'icon cycle'} </span>
//         <span class="workout-value">${workout.distance}</span>
//         <span class="workout-unit">km</span>
//     </div>
//     <div class="workout-details">
//         <span class="workout-icon">icon</span>
//         <span class="workout-value">${workout.duration}</span>
//         <span class="workout-unit">min</span>
//     </div>
//     `;
//     if (workout.type === 'running') {
//         html += ` <div class="workout-details">
//         <span class="workout-icon">icon</span>
//         <span class="workout-value">${workout.pace}</span>
//         <span class="workout-unit">min/km</span>
//     </div>
//     <div class="workout-details">
//         <span class="workout-icon">icon</span>
//         <span class="workout-value">${workout.candence}</span>
//         <span class="workout-unit">spm</span>
//     </div>

// </li>`
//     }
//     if (workout.type === 'cycling') {
//         html += `  <div class="workout-details">
//         <span class="workout-icon">icon</span>
//         <span class="workout-value">${workout.speed}</span>
//         <span class="workout-unit">km/h</span>
//     </div>
//     <div class="workout-details">
//         <span class="workout-icon">icon</span>
//         <span class="workout-value">${workout.elevationgain}</span>
//         <span class="workout-unit">m</span>
//     </div>

// </li>`;

//         // parentBox.appendChild(html);
//         console.log(parentBox)

//     }
// }