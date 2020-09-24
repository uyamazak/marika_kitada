<template>
<div id="app">
  <v-app>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-stage :config="configKonva" ref='stage' id='stage'>
          <v-layer ref='marika' id='marika'>
            <v-group ref="marikaGroup">
              <v-rect
                :config="{
                  x: 0,
                  y: 0,
                  width: 1280,
                  height: 780,
                  fill: '#EEE',
                }"
              />
              <v-image
                ref='eyes'
                :config="{
                  image: eyesImage,
                  scaleX:allScale,
                  scaleY:allScale,
                  x: eyeX,
                  y: eyeY,
                }"
              />
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
      </v-container>
    </v-main>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>@marika_kitada</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      right
    >
    <v-list>
      <v-list-item>
        <v-list-item-content>
            <v-list-item-title>eyeX: {{ eyeX }}</v-list-item-title>
              <v-slider
                v-model="eyeX"
                class="align-center"
                :max="12"
                :min="-14"
                step="0.1"
              />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
        <v-list-item-title>eyeY: {{ eyeY }}</v-list-item-title>
        <v-slider
          v-model="eyeY"
          class="align-center"
          :max="14"
          :min="-14"
          step="0.1"
        />
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>録画</v-list-item-title>
          <v-btn @click='start'>start</v-btn>
          <v-btn @click='stop'>stop</v-btn>
          <v-btn v-if='movieData' :href='movieData' download='movie.webm'>download</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
  </v-app>
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
  components: {},
  data() {
    return {
      bodyImage: null,
      eyesImage: null,
      configKonva: {
        width: 1280,
        height: 780,
      },
      eyeX: 0,
      eyeY: 0,
      allScale: 0.23,
      stream: null,
      recorder: null,
      movieData: null,
    };
  },
  methods: {
    start() {
      console.log('start')
      this.movieData = null
      this.recorder.start()
      console.log(this.recorder)
    },
    stop() {
      console.log('stop')
      this.recorder.stop()
      console.log(this.recorder)
    },
    recoderInit() {
      this.stream = document.getElementsByTagName('canvas')[0].captureStream()
      this.recorder = new MediaRecorder(this.stream, {mimeType:'video/webm;codecs=vp9'});
      this.recorder.ondataavailable = (e) => {
        console.log('ondataavailable')
        const videoBlob = new Blob([e.data], { type: e.data.type })
        this.movieData = window.URL.createObjectURL(videoBlob)
      }
      console.log(this.stream)
    }
  },
  async mounted() {
    this.eyesImage = await addImageProcess('/images/hitomi.png')
    this.bodyImage = await addImageProcess('/images/karada.png')
    this.$refs.eyes.getNode().moveToBottom()
    this.recoderInit()
  },
  created() {
    /*setInterval(()=>{
      this.eyeX *=-1
      this.eyeY *=-1
    }, 100)
    */
  }
}
</script>

<style>
#app {
}
</style>
