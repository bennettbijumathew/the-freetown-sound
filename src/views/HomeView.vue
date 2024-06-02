<template>
    <div class="row catchphrase neuton-extrabold">
        <p> the home of concerts. </p>        
    </div>

    <div class="row content neuton-extrabold">
        <div class="col-12 "> 
            <img src="../assets/focal.png" class="img-fluid">
        </div>

        <div class="col-12"> 
            <h2 class="neuton-bold"> Enter the Waitlist </h2>
            <p> To join the waitlist for The Freetown Sound concert, eager fans must visit the event's official website and navigate to the waitlist section. Once there, they'll find a designated area specifically for waitlist sign-ups. After entering their name, email address, and any other required information, they'll receive a confirmation email acknowledging their spot on the waitlist. As tickets become available due to cancellations or additional releases, those on the waitlist will be notified via email with instructions on how to secure their coveted tickets to the magical musical experience. </p>
        </div>
    </div>

    <div class="row content neuton-extrabold"> 
        <div class="col-12 "> 
            <img src="../assets/focal.png" class="img-fluid">
        </div>

        <div class="col-12"> 
            <h2 class="neuton-bold"> Location </h2>
            <h5 class="home-description"> Located in the outback of Australia, The Freetown Sound unfolds amidst the sprawling desert landscape of an oasis, where vibrant tents and art installations dot the sandy terrain, reminiscent. Attendees wander through a labyrinth of palm trees and makeshift stages, soaking in the eclectic mix of music and culture. As the sun dips below the horizon, the desert sky transforms into a canvas of vivid hues, adding an enchanting backdrop to the pulsating beats and melodies.</h5>
        </div>
    </div>

</template>

<style scoped>
    .catchphrase {
        background: url(../assets/focal.png);
        color: whitesmoke; 

        margin: 0.5em;
        border-radius: 2em;

        align-content: center;
        text-align: center;
    }

    .content {
        background-color: antiquewhite;
        color: black; 

        margin: 0.5em;
        border-radius: 2em;

        padding: 1em;
    }

    .gradient {
        background-image: linear-gradient(to bottom right, red, yellow);
    }

    /* classes created for all screens - col */
    @media (min-width: 0px) { 
        .catchphrase {
            height: 6em;
            font-size: 1.6em;
        }
    }

    /* classes created for large screens - col-sm */
    @media (min-width: 576px) {
        
    }

    /* classes created for large screens - col-lg */
    @media (min-width: 992px) {

    }

</style>
