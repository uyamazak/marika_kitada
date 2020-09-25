<template>
<div id="app">
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>@marika_kitada</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col lg="10">
            <v-stage :config="configStage" ref='stage' id='stage'>
              <v-layer>
                <v-group>
                  <v-rect
                    :config="{
                      x: 0,
                      y: 0,
                      width: 1280,
                      height: 780,
                      fill: '#f5f5f5',
                    }"
                  />
                  <v-image
                    ref='bg'
                    :config="{
                      image: backgroundImage,
                      width: 1280,
                      height: 780,
                    }"
                  />
                </v-group>
                <v-group ref="marikaGroup" :config="configMarika">
                  <v-rect
                    :config="{
                      x: 600,
                      y: 450,
                      width: 500,
                      height: 300,
                      fill: '#fff',
                    }"
                  />
                  <v-image
                    ref='eyes'
                    :config="{
                      image: eyesImage,
                      x: eyeX,
                      y: eyeY,
                    }"
                  />

                  <v-image
                    ref='body'
                    :config="{
                      image: bodyImage,
                    }"
                  />

                </v-group>
              </v-layer>
            </v-stage>
          </v-col>

          <v-col lg="2">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>eyeX: {{ eyeX }}</v-list-item-title>
                    <v-slider
                      v-model="eyeX"
                      class="align-center"
                      :max="60"
                      :min="-70"
                      step="0.1"
                    />

                  <v-list-item-title>eyeY: {{ eyeY }}</v-list-item-title>
                  <v-slider
                    v-model="eyeY"
                    class="align-center"
                    :max="70"
                    :min="-70"
                    step="0.1"
                  />
                  <v-btn @click="toggleEyeTremble()">Eye Tremble</v-btn>
                </v-list-item-content>
              </v-list-item>



              <v-list-item>
                <v-list-item-content>
                <v-list-item-title>marikaX: {{ marikaX }}</v-list-item-title>
                <v-slider
                  v-model="marikaX"
                  class="align-center"
                  :max="1400"
                  :min="-400"
                  step="1"
                />
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                <v-list-item-title>marikaY: {{ marikaY }}</v-list-item-title>
                <v-slider
                  v-model="marikaY"
                  class="align-center"
                  :max="800"
                  :min="-800"
                  step="1"
                />
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                <v-list-item-title>marikaScale: {{ marikaScale }}</v-list-item-title>
                <v-slider
                  v-model="marikaScale"
                  class="align-center"
                  :max="1"
                  :min="0.1"
                  step="0.01"
                />
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>録画 {{ recorderState }}</v-list-item-title>
                  <v-btn @click='start' :disabled="isRecording">start</v-btn>
                  <v-btn @click='stop' :disabled="!isRecording">stop</v-btn>
                  <v-btn v-if='movieData' :href='movieData' download='movie.webm'>download</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <a href="https://twitter.com/marika_kitada" target="_blank">twitter</a>
    </v-footer>
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
const DEFAULTS = {
  marikaX: 240,
  marikaY: 43,
  marikaScale: 0.46,
  eyeX: 0,
  eyeY: 0,
  eyeTremble: 0.9
}
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: true,
      bodyImage: null,
      eyesImage: null,
      backgroundImage: null,
      stageWidth: 1280,
      stageHeight: 720,
      stageScale: 1,
      marikaX: DEFAULTS.marikaX,
      marikaY: DEFAULTS.marikaY,
      marikaScale: DEFAULTS.marikaScale,
      eyeX: DEFAULTS.eyeX,
      eyeY: DEFAULTS.eyeY,
      stream: null,
      recorder: null,
      recorderState: null,
      movieData: null,
      eyeTrembleIntervalId: null,
    };
  },
  computed: {
    configStage() {
      return {
        width: this.stageWidth,
        height: this.stageHeight,
        scale: {
          x: this.stageScale,
          y: this.stageScale
        },
      }
    },
    configMarika() {
      return {
        x: this.marikaX,
        y: this.marikaY,
        scale: {x: this.marikaScale, y: this.marikaScale},
      }
    },
    isRecording() {
      return this.recorderState === 'recording'
    }
  },
  methods: {
    start() {
      console.log('start')
      this.movieData = null
      this.recorder.start()
      this.updateRecorderState()
      console.log(this.recorder)
    },
    stop() {
      console.log('stop')
      this.recorder.stop()
      this.updateRecorderState()
      console.log(this.recorder)
    },
    recoderInit() {
      this.stream = document.getElementsByTagName('canvas')[0].captureStream()
      this.recorder = new MediaRecorder(this.stream, {mimeType:'video/webm;codecs=vp9'});
      this.recorder.ondataavailable = (e) => {
        console.log('ondataavailable', e)
        const videoBlob = new Blob([e.data], { type: e.data.type })
        this.movieData = window.URL.createObjectURL(videoBlob)
      }
      this.updateRecorderState()
      console.log(this.stream)
    },
    updateRecorderState() {
      if (!this.recorder) {
        return
      }
      this.recorderState = this.recorder.state
    },
    toggleEyeTremble() {
      if (this.eyeTrembleIntervalId) {
        clearInterval(this.eyeTrembleIntervalId)
        this.eyeTrembleIntervalId = null
        return
      }
      this.eyeTrembleIntervalId = setInterval(()=>{
        const max = DEFAULTS.eyeTremble
        const min = - DEFAULTS.eyeTremble
        this.eyeX = this.eyeX + (Math.random() * (max - min) + min);
        this.eyeY = this.eyeY + (Math.random() * (max - min) + min);
      }, 250)
    }
  },
  async mounted() {
    this.backgroundImage = await addImageProcess('/marika_kitada/images/bg.jpg')
    this.eyesImage = await addImageProcess('/marika_kitada/images/hitomi.png')
    this.bodyImage = await addImageProcess('/marika_kitada/images/karada.png')
    this.$refs.eyes.getNode().moveToBottom()
    this.recoderInit()
    this.toggleEyeTremble()
  },
  created() {

  }
}
</script>

<style>
#app {

}
</style>
