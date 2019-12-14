(function() {
    if(localStorage.getItem("darkmode") == "true") {
        document.getElementsByTagName('body')[0].classList.add('inverted-colors');
    }

    window[window.attachEvent ? "attachEvent" : "addEventListener"](window.attachEvent ? "onload" : "load", function () {
        /* main calc functions */
        var ratio = 16; // 1/16 ratio
        var calculateCoffe = function(water) {
            return Math.floor(water / ratio);
        }

        var calculateWater = function(coffee) {
            return Math.floor(coffee * ratio);
        }

        var calculateWaterBloom = function(coffee) {
            return Math.ceil(coffee * 2);
        }

        // update values on the page
        var updateRender = function(water, coffee, bloom) {
            console.log([water, coffee, bloom]);
            document.getElementById('final-amount').value = water;
            document.getElementById('coffee-amount').value = coffee;
            document.getElementById('bloom-amount-info').innerHTML = bloom + "g";
            document.getElementById('final-amount-info').innerHTML = water + "g";
        }

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
    }, false);
})();
