if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

(function() {
    if(localStorage.getItem("darkmode") == "true") {
        document.getElementsByTagName('body')[0].classList.add('inverted-colors');
    }

    window[window.attachEvent ? "attachEvent" : "addEventListener"](window.attachEvent ? "onload" : "load", function () {
        /* main calc functions */
        window.coffeeRatio = 16; // 1/16 ratio
        var calculateCoffe = function(water) {
            return Math.floor(water / window.coffeeRatio);
        };

        var calculateWater = function(coffee) {
            return Math.floor(coffee * window.coffeeRatio);
        };

        var calculateWaterBloom = function(coffee) {
            return Math.ceil(coffee * 2);
        };

        // update values on the page
        var updateRender = function(water, coffee, bloom) {
            document.getElementById('final-amount').value = water;
            document.getElementById('coffee-amount').value = coffee;
            document.getElementById('bloom-amount-info').innerHTML = bloom + "g";
            document.getElementById('final-amount-info').innerHTML = water + "g";
        };

        // Select input on click
        document.getElementById('final-amount').addEventListener("click", function(){
            this.select();
        });
        document.getElementById('coffee-amount').addEventListener("click", function(){
            this.select();
        });

        // event change water value
        document.getElementById('final-amount').addEventListener("keyup", function(){
            var water = 0;
            if(this.value == parseInt(this.value, 10)) {
                water = Math.abs(this.value);
            }
            var coffee = calculateCoffe(water);
            var bloom = calculateWaterBloom(coffee);

            updateRender(water, coffee, bloom);
        });

        // event change coffe value
        document.getElementById('coffee-amount').addEventListener("keyup", function(){
            var coffee = 0;
            if(this.value == parseInt(this.value, 10)) {
                coffee = Math.abs(this.value);
            }
            var water = calculateWater(coffee);
            var bloom = calculateWaterBloom(coffee);

            updateRender(water, coffee, bloom);
        });

        // invert colors
        document.getElementById('color-invert').addEventListener("click", function(){
            document.getElementsByTagName('body')[0].classList.toggle('inverted-colors');

            if(localStorage.getItem("darkmode") == "true") {
                localStorage.setItem("darkmode", "false");
            }else {
                localStorage.setItem("darkmode", "true");
            }
        });

        document.getElementById("ratio-selector").addEventListener("change", function(){
            var element = document.getElementById("ratio-selector");
            window.coffeeRatio = element.options[element.selectedIndex].value;
        });

        // todo btn events
        var todo_items = document.getElementsByClassName("to-do");
        for (var i = 0; i < todo_items.length; i++) {
          todo_items[i].addEventListener("click", function(){
            this.classList.remove("to-do");
            this.classList.add("done");
            this.innerHTML = "Done!";
          });
        }

        // make btn count down the seconds
        var countdown = document.getElementsByClassName("countdown");
        for (let i = 0; i < countdown.length; i++) {
            countdown[i].addEventListener("click", function () {
                if (!this.classList.contains("done") && !this.classList.contains("running")) {
                    var element = this;
                    var amount = this.getAttribute("data-amount");
                    var unit = this.getAttribute("data-unit");
                    var speed = this.getAttribute("data-speed");

                    element.classList.add("running");
                    element.innerHTML = amount + unit;

                    var downloadTimer = setInterval(function () {
                        amount -= 1;
                        element.innerHTML = amount + unit;
                        if (amount <= 0) {
                            clearInterval(downloadTimer);
                            element.classList.remove("running");
                            element.classList.add("done");
                            element.innerHTML = "Done!";
                        }
                    }, speed);
                }
            });
        }

    }, false);
})();
