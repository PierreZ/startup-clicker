<!--/* eslint-disable */-->
<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div v-on:click="connectWS()" class="column">
          <h1 class="centered">{{money.valueOf().toLocaleString()}} euros</h1>
          <h4>{{computeClick()}} euros/clic</h4>
          <h4>{{totalRate.toLocaleString()}} euros/sec</h4>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <a href="#"><img class="money centered img-responsive" v-on:click="clickCounter += 1;money = money.add(computeClick())" src="../assets/money.png"></a>
        </div>
      </div>
    </div>
    <!-- upgrade part -->
    <div class="modal" v-bind:class="{ active: showAssetsModal }" id="modal-id">
      <a v-on:click="showAssetsModal = false" href="#" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a v-on:click="showAssetsModal = false" href="#" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">Buy assets ({{money.valueOf().toLocaleString()}} euros available)</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="card" v-for="asset in assets">
              <div class="card-header">
                <!--<button class="btn btn-primary float-right"><i class="icon icon-plus"></i></button>-->
                <div class="card-title h5" :data-badge="`${asset.number}`">{{asset.name}}</div>
                <div class="card-subtitle text-gray">Base profit: {{(asset.rate).toLocaleString()}} euros/sec</div>
                <div class="card-subtitle text-gray">Total: {{(asset.rate*asset.number).toLocaleString()}} euros/sec</div>
              </div>
              <div class="card-body">
                {{asset.description}}
              </div>
              <div class="card-footer">
                <button class="btn badge float-right" :data-badge="`${asset.number}`" v-bind:class="{ 'disabled': asset.price > money, 'btn-success': asset.price < money }"
                  v-on:click="buy(asset.label)">Buy for {{ asset.price.toLocaleString() }} euros</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          ...
        </div>
      </div>
    </div>
    <!-- upgrade part -->
    <div class="modal" v-bind:class="{ active: showUpgradesModal }" id="modal-id">
      <a v-on:click="showUpgradesModal = false" href="#" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a v-on:click="showUpgradesModal = false" href="#" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">Fundraise ({{money.valueOf().toLocaleString()}} euros available)</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="card">
              <div class="card-header">
                <!--<button class="btn btn-primary float-right"><i class="icon icon-plus"></i></button>-->
                <div class="card-title h5">Fundraise</div>
                <div class="card-subtitle text-gray">Clicking gains +1% of your euros/sec</div>
              </div>
              <div class="card-body">
                c
              </div>
              <div class="card-footer">
                <button class="btn badge float-right" :data-badge="`${fundRaise.number}`" v-bind:class="{ 'disabled': fundRaise.price > money, 'btn-success': fundRaise.price < money }"
                  v-on:click="upgrade()">Buy for {{ fundRaise.price.toLocaleString() }} euros</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          ...
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column col-2 col-mx-auto"><button v-on:click="showAssetsModal = true" class="btn btn-success">Buy assets</button></div>
        <div class="column col-2 col-mx-auto"><button v-on:click="showUpgradesModal = true" class="btn btn-success">Do a fundraise</button></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        money: window.bigInt(),
        endpoint: 'https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io',
        //endpoint: 'http://localhost:8082',
        clickCounter: 0,
        timer: '',
        ws: {},
        assets: [],
        totalRate: 0,
        showAssetsModal: false,
        showUpgradesModal: false,
        fundRaise: {
          "BasePrice": 0,
          "number": 0,
          "price": 0
        },
      }
    },
    methods: {
      computeClick: function () {
        return Math.ceil(this.totalRate / 100.0 * this.fundRaise.number + 1)
      },
      refreshUpgrades: function () {
        fetch(this.endpoint + '/api/v0/upgrade')
          .then(response => response.json())
          .then(json => {
            this.fundRaise = json
          })
      },
      refreshAssets: function () {
        console.log('refreshing assets...')
        fetch(this.endpoint + '/api/v0/assets')
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
            let rates = this.assets.map(function (obj) {
              let ob = Object.assign({}, obj);
              return obj.rate * obj.number
            })
            this.totalRate = (rates.reduce((accumulator, currentValue) => accumulator + currentValue))
          })
      },
      upgrade: function () {
        console.log('Buying an upgrade')
        fetch(this.endpoint + '/api/v0/upgrade', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        //this.refreshUpgrades()
      },
      buy: function (asset) {
        console.log('Buying ' + asset)
        fetch(this.endpoint + '/api/v0/assets/' + asset, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        this.refreshAssets()
      },
      pushNotification: function (message) {
        this.$toasted.show(message, {
          theme: "primary",
          position: "top-right",
          duration: 5000
        });
      },
      parseMessage: function (gts) {
        let classname = gts.data.split(" ")[1].split("{")[0]
        switch (classname) {
          case 'fundraising':
            this.pushNotification('an fundraising has been made!')
            this.refreshUpgrades()
            break;
          case 'money':
            let stri = gts.data.split(" ")[2]
            this.money = window.bigInt(stri)
            break;
          case 'asset':
            console.log(gts.data)
            let labels = gts.data.split(" ")[1].split("{")[1].split("}")[0].split(",")
            let assetName = ''
            labels.forEach(function (label) {
              if (label.includes('name=')) {
                assetName = label.split("=")[1]
              }
            })
            this.pushNotification('an ' + assetName + ' has been bought!')
            this.refreshAssets()
            break;
          default:
            break;
        }

      },
      flushClick: function () {
        if (this.clickCounter > 0) {
          fetch(this.endpoint + '/api/v0/money', {
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
      this.refreshUpgrades()
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
    max-height: 400px;
    /* Animation */
  }

  .money:hover {
    transform: scale(0.95);
    /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

</style>

