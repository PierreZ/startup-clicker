<!--/* eslint-disable */-->
<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div v-on:click="connectWS()" class="column col-6 col-mx-auto">
          <h1>{{money}} euros</h1> 
        </div>
      </div>
      <div class="columns">
        <div class="column col-6 col-mx-auto">
          <a href="#/"><img class="money" v-on:click="clickCounter += 1;money += 1" src="../assets/money.png" height="300px"></a>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        money: 0,
        clickCounter: 0,
        timer: '',
        ws: {}
      }
    },
    methods: {
      parseMessage: function (gts) {
        this.money = parseInt(gts.data.split(" ")[2], 10)
      },
      flushClick: function () {
        if (this.clickCounter > 0) {
          fetch('https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io/api/v0/money', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'click': this.clickCounter
            })
          })
          this.clickCounter = 0
        }
      }
    },
    created: function () {
      this.ws = new WebSocket('wss://warp.pierrezemb.org/api/v0/plasma')
      
      // Connection opened
      this.ws.addEventListener('open', function (event) {
        this.send(
          'SUBSCRIBE DlkMIXbwIKIw9Q25BP.o4G7zDibiURUEc1ATjqah2rNQgMys2SbuoXEwG6nPaCi5K61LhtnXRKSjt3EavUJW84r9FG.O1bo6upi.WrKDEj2fQ0hwto4tYk ~.*{} SUBSCRIPTIONS'
        )
      });
      
      this.ws.addEventListener('message', this.parseMessage);

      this.timer = setInterval(this.flushClick, 1000)
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.money {
    transition: transform .2s; /* Animation */
}
.money:hover {
    transform: scale(0.95); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
