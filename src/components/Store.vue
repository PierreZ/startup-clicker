<!--/* eslint-disable */-->
<template>
  <div class="store">

    <div class="column col-12">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title h6">Store</div>
        </div>
        <div v-for="asset in assets" class="panel-body">
          <div class="tile">
            <!--<div class="tile-icon">
              <figure class="avatar">
                <img src="img/avatar-1.png" alt="Avatar">
              </figure>
            </div>-->
            <div class="tile-content">
              <p class="tile-title"> {{asset.name}} </p>
              <p class="tile-subtitle">{{asset.description}}</p>
              <button class="btn btn-primary badge" :data-badge="`${asset.number}`">Buy for {{ asset.price }} euros</button>
            </div>
            
          </div>
        </div>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
  export default {
    name: 'Store',
    data() {
      return {
        assets: []
      }
    },
    created: function () {
      fetch('https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io/api/v0/assets')
        .then(response => response.json())
        .then(json => {
          this.assets = json
        })

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .money {
    transition: transform .2s;
    /* Animation */
  }

  .money:hover {
    transform: scale(0.95);
    /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }

</style>
