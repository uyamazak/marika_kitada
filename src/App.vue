<template>
  <div id="app">
    <v-stage :config="configKonva">
      <v-layer ref="body">
        <v-image :config="{
          image: bodyImage,
          scaleX:0.2,
          scaleY:0.2,
        }"/>
      </v-layer>

        
        <v-layer ref="eyes">
          <v-image :config="{
            image: eyesImage,
            scaleX:0.2,
            scaleY:0.2,
            x:20,
          }"/>
        </v-layer>


    </v-stage>
  </div>
</template>

<script>

function addImageProcess(src){
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      bodyImage: null,
      eyesImage: null,
      configKonva: {
        width: 1920,
        height: 1080,
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "black",
        stroke: "black",
        strokeWidth: 4
      }
    };
  },
  async mounted() {
    /*
    const bodyImg = new window.Image();
    bodyImg.src = "/images/karada.png";
    bodyImg.onload = () => {
      this.bodyImage = bodyImg;
      console.log(bodyImg.width, bodyImg.height)
    };
    const eyesImg = new window.Image();
    eyesImg.src = "/images/hitomi.png";
    eyesImg.onload = () => {
      this.eyesImage = eyesImg;
    };
    */
    
   this.bodyImage = await addImageProcess('/images/karada.png')
   this.eyesImage = await addImageProcess('/images/hitomi.png')
  
  }
}
</script>

<style>
#app {
}
</style>
