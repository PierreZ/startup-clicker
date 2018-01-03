<!--/* eslint-disable */-->
<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column col-1 col-ml-auto">
          <a v-on:click="showAssetsModal = true" href="#"><i class="icon icon-plus icon-2x"></i></a>
        </div>
        <div class="column col-2">
          <a v-on:click="showUpgradesModal = true" href="#"><i class="icon icon-upload icon-2x"></i></a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div v-on:click="connectWS()" class="column">
          <h1 class="centered">{{money}} euros</h1>
          <h4>per second: {{totalRate}} euros/sec</h4>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <a href="#"><img class="money centered img-responsive" v-on:click="clickCounter += 1;money += 1" src="../assets/money.png"></a>
        </div>
      </div>
    </div>
    <!-- upgrade part -->
    <div class="modal" v-bind:class="{ active: showAssetsModal }" id="modal-id">
      <a v-on:click="showAssetsModal = false" href="#" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a v-on:click="showAssetsModal = false" href="#" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">Buy assets ({{money}} euros available)</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="card" v-for="asset in assets">
              <!--<div class="card-image">
    <img src="img/osx-el-capitan.jpg" class="img-responsive">
  </div>-->
              <div class="card-header">
                <div class="card-title h5">{{asset.name}}</div>
                <!--<div class="card-subtitle text-gray">Software and hardware</div>-->
              </div>
              <div class="card-body">
                {{asset.description}}
                <br/>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary badge btn-error" v-bind:class="{ 'btn-success': asset.price > money }" v-on:click="buy(asset.name)"
                  :data-badge="`${asset.number}`">Buy for {{ asset.price }} euros</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          ...
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
        ws: {},
        assets: [],
        totalRate: 0,
        showAssetsModal: false,
        showUpgradesModal: false,
      }
    },
    methods: {
      refreshAssets: function () {
        console.log('refreshing assets...')
        fetch('https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io/api/v0/assets')
          .then(response => response.json())
          .then(json => {
            this.assets = json.sort(function (a, b) {
              let idA = a.id
              let idB = b.id
              if (idA < idB) {
                return -1
              }
              if (idA > idB) {
                return 1
              }
              // names must be equal
              return 0
            })
            let rates = this.assets.map(function(obj){
              let ob = Object.assign({}, obj);
                return obj.rate * obj.number
            })
            this.totalRate = (rates.reduce((accumulator, currentValue) => accumulator + currentValue))

          })
      },
      buy: function (asset) {
        fetch('https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io/api/v0/assets/' + asset, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        this.refreshAssets()
      },
      parseMessage: function (gts) {
        let classname = gts.data.split(" ")[1].split("{")[0]
        switch (classname) {
          case 'money':
            this.money = parseInt(gts.data.split(" ")[2], 10)
            break;
          case 'asset':
            this.refreshAssets()
            break;
          default:
            break;
        }

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
      this.refreshAssets()
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
    transition: transform .2s;
    margin-top: 50px;
    max-height:400px;
    /* Animation */
  }

  .money:hover {
    transform: scale(0.95);
    /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

</style>
