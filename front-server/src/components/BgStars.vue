<template>
    <div>
        
        <div class="sContainer" id="sFirst">
        <div class="star one">      
        </div>
        </div>
        <div class="sContainer" id="sSecond">
        <div class="star two">      
        </div>
        </div>
        <div class="sContainer" id="sThird">
        <div class="star three">      
        </div>
        </div>
        <div class="sContainer" id="sFourth">
        <div class="star four">      
        </div>
        </div>
        <div class="sContainer" id="sFifth">
        <div class="star five">      
        </div>
        </div>
        
        <div class="lsContainer" id="lsFirst">
        <div class="lstar lone">
        </div>
        </div>
        <div class="lsContainer" id="lsSecond">
        <div class="lstar ltwo">
        </div>
        </div>
        <div class="lsContainer" id="lsThird">
        <div class="lstar lthree">
        </div>
        </div>
        <div class="lsContainer" id="lsFourth">
        <div class="lstar lfour">
        </div>
        </div>
        <div class="lsContainer" id="lsFifth">
        <div class="lstar lfive">
        </div>
        </div>
        <div class="lsContainer" id="lsSixth">
        <div class="lstar lsix">
        </div>
        </div>
        <div class="lsContainer" id="lsSeventh">
        <div class="lstar lseven">
        </div>
        </div>
        <div class="lsContainer" id="lsEighth">
        <div class="lstar leight">
        </div>
        </div>
        <div class="lsContainer" id="lsNinth">
        <div class="lstar lnine">
        </div>
        </div>
        <div class="lsContainer" id="lsTenth">
        <div class="lstar lten">
        </div>
        </div>
        <div class="lsContainer"  id="lsEleventh">
        <div class="lstar leleven">
        </div>
        </div>
        <div class="lsContainer"  id="lsTwelfth">
        <div class="lstar ltwelve">
        </div>
        </div> 
    </div>
</template>

<script>
</script>

<style>

html {
  position: relative;
  height: 100%;
}
body {
  background: #010A24;
  position: inherit;
  height: 100%;
  overflow-x: hidden;
}


/* stars */
.star {
  width: 5px;
  height: 5px;
  position: relative;
  background: white;
  border-radius: 100%;
  box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5);
}
 
.one {
  -webkit-animation: starlight 3s ease-in infinite;
}

.two {
  -webkit-animation: starlight 2s ease-in infinite;
}
.three {
  -webkit-animation: starlight 4s ease-in infinite;
}
.four {
  -webkit-animation: starlight 1s ease-in infinite;
}
.five {
  -webkit-animation: starlight 5s ease-in infinite;
}

@-webkit-keyframes starlight{
0% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
50% { box-shadow: 0px 0px 20px 11px rgba(120, 130, 155, .5); }
100% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
}
@-moz-keyframes starlight{
0% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
50% { box-shadow: 0px 0px 20px 11px rgba(120, 130, 155, .5); }
100% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
}
@-o-keyframes starlight{
0% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
50% { box-shadow: 0px 0px 20px 11px rgba(120, 130, 155, .5); }
100% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
}
@keyframes starlight{
0% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
50% { box-shadow: 0px 0px 20px 11px rgba(120, 130, 155, .5); }
100% { box-shadow: 0px 0px 20px 7px rgba(120, 130, 155, .5); }
}

.sContainer {
  position: relative;
}

#sFirst {
  top: 20%;
  left: 60%;
  -webkit-animation: starone 115s linear infinite; 
  -moz-animation: starone 115s linear infinite;
  -o-animation: starone 115s linear infinite;
  animation: starone 115s linear infinite; 
}
#sSecond {
  top: 5%;
  left: 22%;
  -webkit-animation: startwo 124s linear infinite;
  -moz-animation: startwo 124s linear infinite;
  -o-animation: startwo 124s linear infinite;
  animation: startwo 124s linear infinite;
}
#sThird {
  top: 84%;
  left: 17%;
  -webkit-animation: starthree 120s linear infinite;
  -moz-animation: starthree 120s linear infinite;
  -o-animation: starthree 120s linear infinite;
  animation: starthree 120s linear infinite;
}
#sFourth {
  top: 68%;
  left: 7%; 
  -webkit-animation: starfour 90s linear infinite;
  -moz-animation: starfour 90s linear infinite;
  -o-animation: starfour 90s linear infinite;
  animation: starfour 90s linear infinite;
}
#sFifth {
  top: 42%;
  left: 92%;
  -webkit-animation: starfive 130s linear infinite;
  -moz-animation: starfive 130s linear infinite;
  -o-animation: starfive 130s linear infinite;
  animation: starfive 130s linear infinite;
}

@-webkit-keyframes starone {
0% { top: -5%; left: 80%;}
100% { top: 110%; left: 20%; }
}
@-moz-keyframes starone {
0% { top: -5%; left: 80%;}
100% { top: 110%; left: 20%; }
}
@-o-keyframes starone {
0% { top: -5%; left: 80%;}
100% { top: 110%; left: 20%; }
}
@keyframes starone {
0% { top: -5%; left: 80%;}
100% { top: 110%; left: 20%; }
}

@-webkit-keyframes startwo {
0% { top: -15%; left: 22%;}
100% { top: 110%; left: -38%; }
}
@-moz-keyframes startwo {
0% { top: -15%; left: 22%;}
100% { top: 110%; left: -38%; }
}
@-o-keyframes startwo {
0% { top: -15%; left: 22%;}
100% { top: 110%; left: -38%; }
}
@keyframes startwo {
0% { top: -15%; left: 22%;}
100% { top: 110%; left: -38%; }
}

@-webkit-keyframes starthree {
0% { top: -35%; left: 57%;}
100% { top: 110%; left: -3%; }
}
@-moz-keyframes starthree {
0% { top: -35%; left: 57%;}
100% { top: 110%; left: -3%; }
}
@-p-keyframes starthree {
0% { top: -35%; left: 57%;}
100% { top: 110%; left: -3%; }
}
@keyframes starthree {
0% { top: -35%; left: 57%;}
100% { top: 110%; left: -3%; }
}

@-webkit-keyframes starfour {
0% { top: -5%; left: 137%; }
100% { top: 105%; left: 77%; }
}
@-moz-keyframes starfour {
0% { top: -5%; left: 137%; }
100% { top: 105%; left: 77%; }
}
@-o-keyframes starfour {
0% { top: -5%; left: 137%; }
100% { top: 105%; left: 77%; }
}
@keyframes starfour {
0% { top: -5%; left: 137%; }
100% { top: 105%; left: 77%; }
}

@-webkit-keyframes starfive {
0% { top: -55%; left: 92%; }
100% { top: 105%; left: 32%; }
}
@-moz-keyframes starfive {
0% { top: -55%; left: 92%; }
100% { top: 105%; left: 32%; }
}
@-o-keyframes starfive {
0% { top: -55%; left: 92%; }
100% { top: 105%; left: 32%; }
}
@keyframes starfive {
0% { top: -55%; left: 92%; }
100% { top: 105%; left: 32%; }
}

.lstar {
  width: 2px;
  height: 2px;
  background: #aaaaff;
  border-radius: 100%;
  box-shadow: 0px 0px 13px 11px rgba(120, 140, 155, .1);
}
.lone {
  -webkit-animation: lstarshine .4s ease-in infinite;
  -moz-animation: lstarshine .4s ease-in infinite;
  -o-animation: lstarshine .4s ease-in infinite;
  animation: lstarshine .4s ease-in infinite;
}
.ltwo {
  -webkit-animation: lstarshine .2s ease-in infinite;
  -moz-animation: lstarshine .2s ease-in infinite;
  -o-animation: lstarshine .2s ease-in infinite;
  animation: lstarshine .2s ease-in infinite;
}
.lthree {
  -webkit-animation: lstarshine .1s ease-in infinite;
  -moz-animation: lstarshine .1s ease-in infinite;
  -o-animation: lstarshine .1s ease-in infinite;
  animation: lstarshine .1s ease-in infinite;
}
.lfour {
  -webkit-animation: lstarshine .3s ease-in infinite;
  -moz-animation: lstarshine .3s ease-in infinite;
  -o-animation: lstarshine .3s ease-in infinite;
  animation: lstarshine .3s ease-in infinite;
}
.lfive {
  -webkit-animation: lstarshine .3s ease-in infinite;
  -moz-animation: lstarshine .3s ease-in infinite;
  -o-animation: lstarshine .3s ease-in infinite;
  animation: lstarshine .3s ease-in infinite;
}
.lsix {
  -webkit-animation: lstarshine .1s ease-in infinite;
  -moz-animation: lstarshine .1s ease-in infinite;
  -o-animation: lstarshine .1s ease-in infinite;
  animation: lstarshine .1s ease-in infinite;
}
.lseven {
  -webkit-animation: lstarshine .4s ease-in infinite;
  -moz-animation: lstarshine .4s ease-in infinite;
  -o-animation: lstarshine .4s ease-in infinite;
  animation: lstarshine .4s ease-in infinite;
}
.leight {
  -webkit-animation: lstarshine .1s ease-in infinite;
  -moz-animation: lstarshine .1s ease-in infinite;
  -o-animation: lstarshine .1s ease-in infinite;
  animation: lstarshine .1s ease-in infinite;
}
.lnine {
  -webkit-animation: lstarshine .2s ease-in infinite;
  -moz-animation: lstarshine .2s ease-in infinite;
  -o-animation: lstarshine .2s ease-in infinite;
  animation: lstarshine .2s ease-in infinite;
}
.lten {
  -webkit-animation: lstarshine .3s ease-in infinite;
  -moz-animation: lstarshine .3s ease-in infinite;
  -o-animation: lstarshine .3s ease-in infinite;
  animation: lstarshine .3s ease-in infinite;
}
.leleven {
  -webkit-animation: lstarshine .3s ease-in infinite;
  -moz-animation: lstarshine .3s ease-in infinite;
  -o-animation: lstarshine .3s ease-in infinite;
  animation: lstarshine .3s ease-in infinite;
}
.ltwelve {
  -webkit-animation: lstarshine .3s ease-in infinite;
  -moz-animation: lstarshine .3s ease-in infinite;
  -o-animation: lstarshine .3s ease-in infinite;
  animation: lstarshine .3s ease-in infinite;
}

@-webkit-keyframes lstarshine {
  0% { box-shadow: 0px 0px 13px 11px rgba(120, 140, 155, .1); }
  50% { box-shadow: 0px 0px 5px 5px rgba(120, 140, 155, .1); }
  100% { box-shadow: 0px 0px 13px 11px rgba(120, 140, 155, .1); }
}

.lsContainer {
  position: relative;
}

#lsFirst {
  top: 11%;
  left: 28%;
  -webkit-animation: lsPosFirst 160s linear infinite;
  -moz-animation: lsPosFirst 160s linear infinite;
  -o-animation: lsPosFirst 160s linear infinite;
  animation: lsPosFirst 160s linear infinite;
}

@-webkit-keyframes lsPosFirst {
  from { top: -15%; left: 26%; }
  to { top: 102%; left: -34%;}
}
@-moz-keyframes lsPosFirst {
  from { top: -15%; left: 26%; }
  to { top: 102%; left: -34%;}
}
@-o-keyframes lsPosFirst {
  from { top: -15%; left: 26%; }
  to { top: 102%; left: -34%;}
}
@keyframes lsPosFirst {
  from { top: -15%; left: 26%; }
  to { top: 102%; left: -34%;}
}

#lsSecond {
  top: 69%;
  left: 71%;
  -webkit-animation: lsPosSecond 130s linear infinite;
  -moz-animation: lsPosSecond 130s linear infinite;
  -o-animation: lsPosSecond 130s linear infinite;
  animation: lsPosSecond 130s linear infinite;
}

@-webkit-keyframes lsPosSecond {
  from { top: -10%; left: 69%; }
  to { top: 105%; left: 9%; }
}
@-moz-keyframes lsPosSecond {
  from { top: -10%; left: 69%; }
  to { top: 105%; left: 9%; }
}
@-o-keyframes lsPosSecond {
  from { top: -10%; left: 69%; }
  to { top: 105%; left: 9%; }
}
@keyframes lsPosSecond {
  from { top: -10%; left: 69%; }
  to { top: 105%; left: 9%; }
}

#lsThird {
  top: 39%;
  left: 39%;
  -webkit-animation: lsPosThird 180s linear infinite;
  -moz-animation: lsPosThird 180s linear infinite;
  -o-animation: lsPosThird 180s linear infinite;
  animation: lsPosThird 180s linear infinite;
}

@-webkit-keyframes lsPosThird {
  from { top: -15%; left: 55%; }
  to { top: 115%; left: -5%; }
}
@-moz-keyframes lsPosThird {
  from { top: -15%; left: 55%; }
  to { top: 115%; left: -5%; }
}
@-o-keyframes lsPosThird {
  from { top: -15%; left: 55%; }
  to { top: 115%; left: -5%; }
}
@keyframes lsPosThird {
  from { top: -15%; left: 55%; }
  to { top: 115%; left: -5%; }
}

#lsFourth {
  top: 2%;
  left: 5%;
  -webkit-animation: lsPostFourth 145s linear infinite;
  -moz-animation: lsPostFourth 145s linear infinite;
  -o-animation: lsPostFourth 145s linear infinite;
  animation: lsPostFourth 145s linear infinite;
}
@-webkit-keyframes lsPostFourth {
  from { top: -15%; left: 120%; }
  to { top: 130%; left: 60%; }
}
@-moz-keyframes lsPostFourth {
  from { top: -15%; left: 120%; }
  to { top: 130%; left: 60%; }
}
@-o-keyframes lsPostFourth {
  from { top: -15%; left: 120%; }
  to { top: 130%; left: 60%; }
}
@keyframes lsPostFourth {
  from { top: -15%; left: 120%; }
  to { top: 130%; left: 60%; }
}

#lsFifth {
  top: 27%;
  left: 95%;
  -webkit-animation: lsPostFifth 130s linear infinite;
  -moz-animation: lsPostFifth 130s linear infinite;
  -o-animation: lsPostFifth 130s linear infinite;
  animation: lsPostFifth 130s linear infinite;
}
@-webkit-keyframes lsPostFifth {
  from { top: -25%; left: 95%; }
  to { top: 120%; left: 35%;}
}
@-moz-keyframes lsPostFifth {
  from { top: -25%; left: 95%; }
  to { top: 120%; left: 35%;}
}
@-o-keyframes lsPostFifth {
  from { top: -25%; left: 95%; }
  to { top: 120%; left: 35%;}
}
@keyframes lsPostFifth {
  from { top: -25%; left: 95%; }
  to { top: 120%; left: 35%;}
}
#lsSixth {
  top: 62%;
  left: 59%;
}
#lsSeventh {
  top: 18%;
  left: 7%;
}
#lsEighth {
  top: 2%;
  left: 81%;
}
#lsNinth {
  top: 52%;
  left: 31%;
}
#lsTenth {
  top: 40%;
  left: 56%;
}
#lsEleventh {
  top: 95%; 
  left: 85%;
}
#lsTwelfth {
  top: 82%; 
  left: 90%;
} 
</style>