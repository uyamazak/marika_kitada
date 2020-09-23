<template>
  <div id="app">
    <v-stage :config="configKonva" ref='stage' id='stage'>
        <v-layer ref='marika' id='marika'>
          <v-group ref="marikaGroup">
            <v-image
            ref='eyes'
            :config="{
            image: eyesImage,
            scaleX:allScale,
            scaleY:allScale,
            x: eyeX,
            y: eyeY,
          }"/>
          <v-image
          ref='body'
          :config="{
            image: bodyImage,
            scaleX:allScale,
            scaleY:allScale,
          }"
          />


           </v-group>
        </v-layer>
    </v-stage>
    <button @click='start'>start</button>
    <button @click='stop'>stop</button>
    <a v-if='movieData' :href='movieData' download='movie.webm'>download</a>
  </div>
</template>

<script>

function addImageProcess(src){
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = reject
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
        background: 'red',
      },
      eyeX: 5,
      eyeY: 1,
      allScale: 0.2,
      stream: null,
      recorder: null,
      movieData: null,
    };
  },
  methods:{
    start(){
      console.log('start')
      this.movieData = null
      this.recorder.start()
      console.log(this.recorder)
    },
    stop(){
      console.log('stop')
      this.recorder.stop()
      console.log(this.recorder)
    },
  },
  async mounted() {
    this.eyesImage = await addImageProcess('/images/hitomi.png')
    this.bodyImage = await addImageProcess('/images/karada.png')
    this.$refs.eyes.getNode().moveToBottom()
    this.stream = document.getElementsByTagName('canvas')[0].captureStream()
    this.recorder = new MediaRecorder(this.stream, {mimeType:'video/webm;codecs=vp9'});
    this.recorder.ondataavailable = (e) => {
      console.log('ondataavailable')
      const videoBlob = new Blob([e.data], { type: e.data.type })
      this.movieData = window.URL.createObjectURL(videoBlob)
    }
    console.log(this.stream)
    /**/
  },
  created() {
    setInterval(()=>{
      this.eyeX *=-1
      this.eyeY *=-1
    }, 100)
  }
}
</script>

<style>
#app {
}
</style>
