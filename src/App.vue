<template>
  <div id="app">
    <v-app>
      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-toolbar-title>@marika_kitada</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col lg="10">
              <v-stage
                id="stage"
                ref="stage"
                :config="configStage"
              >
                <v-layer>
                  <v-group ref="backgounrd">
                    <v-rect
                      :config="{
                        x: 0,
                        y: 0,
                        width: 1280,
                        height: 780,
                        fill: '#f5f5f5'
                      }"
                    />
                    <v-image
                      ref="bg"
                      :config="{
                        image: backgroundImage,
                        width: 1280,
                        height: 780
                      }"
                    />
                  </v-group>
                  <v-group
                    ref="marikaGroup"
                    :config="configMarika"
                  >
                    <v-rect
                      ref="eyeBg"
                      :config="{
                        x: 600,
                        y: 450,
                        width: 500,
                        height: 300,
                        fill: '#fff'
                      }"
                    />
                    <v-image
                      ref="eyes"
                      :config="{
                        image: eyesImage,
                        x: eyeX,
                        y: eyeY
                      }"
                    />
                    <v-image
                      ref="body"
                      :config="{
                        image: bodyImage
                      }"
                    />
                  </v-group>
                  <v-group ref="subtitle">
                    <v-text
                      :config="configSubtitle"
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
                    <v-btn @click="toggleEyeTremble()">
                      Eye Tremble
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      marikaX: {{ marikaX }}
                    </v-list-item-title>
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
                    <v-list-item-title>
                      marikaY: {{ marikaY }}
                    </v-list-item-title>
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
                    <v-list-item-title>
                      marikaScale: {{ marikaScale }}
                    </v-list-item-title>
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
                    <v-list-item-title>
                      subtitle
                    </v-list-item-title>
                    <v-textarea v-model="subtitleText" />
                    <v-select
                      v-model="subtitleAlign"
                      :items="['left', 'center', 'right']"
                      label="Align"
                    />
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      録画 {{ recorderState }}
                    </v-list-item-title>
                    <v-btn
                      :disabled="isRecording"
                      @click="start"
                    >
                      start
                    </v-btn>
                    <v-btn
                      :disabled="!isRecording"
                      @click="stop"
                    >
                      stop
                    </v-btn>
                    <v-btn
                      v-if="movieData"
                      :href="movieData"
                      download="movie.webm"
                    >
                      download
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Filter
                    </v-list-item-title>
                    <v-checkbox
                      v-for="(name, index) in allFilters"
                      :key="index"
                      v-model="selectedFilters"
                      :label="name"
                      :value="name"
                    />

                    <v-btn
                      @click="applyFilter"
                    >
                      apply Filter
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer app>
        <a
          href="https://twitter.com/marika_kitada"
          target="_blank"
        >twitter</a>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Konva from 'konva'
const imageSrcPrefix = '/marika_kitada/images/'
function addImageProcess (src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = imageSrcPrefix + src
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
  data () {
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
      subtitleText: 'おはぎゃー、北田まりかです',
      subtitleAlign: 'left',
      selectedFilters: []
    }
  },
  computed: {
    configStage () {
      return {
        width: this.stageWidth,
        height: this.stageHeight,
        scale: {
          x: this.stageScale,
          y: this.stageScale
        }
      }
    },
    configMarika () {
      return {
        x: this.marikaX,
        y: this.marikaY,
        scale: { x: this.marikaScale, y: this.marikaScale }
      }
    },
    configSubtitle () {
      return {
        x: 60,
        y: 570,
        width: 1180,
        height: 110,
        text: this.subtitleText,
        align: this.subtitleAlign,
        fontSize: 42,
        fontStyle: 'bold',
        lineHeight: 1.2,
        fill: 'red',
        stroke: 'white',
        strokeWidth: 0.2,
        shadowEnabled: true,
        shadowColor: 'white',
        shadowBlur: 1,
        shadowOffset: { x: 2, y: 2 },
        shadowOpacity: 1
      }
    },
    isRecording () {
      return this.recorderState === 'recording'
    },
    allFilters () {
      return [
        'Pixelate',
        'Invert',
        'Blur',
        'Grayscale',
        'Sepia',
        'Solarize',
        'Noise'
      ]
    },
    filters () {
      return this.selectedFilters.map((v) => {
        return Konva.Filters[v]
      })
    }
  },
  async mounted () {
    this.backgroundImage = await addImageProcess('bg.jpg')
    this.eyesImage = await addImageProcess('hitomi.png')
    this.bodyImage = await addImageProcess('karada.png')
    this.$refs.eyes.getNode().moveToBottom()
    this.recoderInit()
    this.toggleEyeTremble()
  },
  created () {
    console.log(
      'MediaRecorder.isTypeSupported: ',
      MediaRecorder.isTypeSupported('video/mp4')
    )
  },
  methods: {
    start () {
      console.log('start')
      this.movieData = null
      this.recorder.start()
      this.updateRecorderState()
      console.log(this.recorder)
    },
    stop () {
      console.log('stop')
      this.recorder.stop()
      this.updateRecorderState()
      console.log(this.recorder)
    },
    recoderInit () {
      this.stream = document.getElementsByTagName('canvas')[0].captureStream()
      this.recorder = new MediaRecorder(this.stream, {
        mimeType: 'video/webm;codecs=vp9'
      })
      this.recorder.ondataavailable = e => {
        console.log('ondataavailable', e)
        const videoBlob = new Blob([e.data], { type: e.data.type })
        this.movieData = window.URL.createObjectURL(videoBlob)
      }
      this.updateRecorderState()
      console.log(this.stream)
    },
    updateRecorderState () {
      if (!this.recorder) {
        return
      }
      this.recorderState = this.recorder.state
    },
    toggleEyeTremble () {
      if (this.eyeTrembleIntervalId) {
        clearInterval(this.eyeTrembleIntervalId)
        this.eyeTrembleIntervalId = null
        return
      }
      this.eyeTrembleIntervalId = setInterval(() => {
        const max = DEFAULTS.eyeTremble
        const min = -DEFAULTS.eyeTremble
        this.eyeX += Math.random() * (max - min) + min
        this.eyeY += Math.random() * (max - min) + min
      }, 250)
    },
    updateSubtitle () {
      this.$refs.subtitle.getNode().draw()
    },
    applyFilter () {
      [
        this.$refs.eyes,
        this.$refs.body,
        this.$refs.eyeBg
      ].forEach((ref) => {
        ref.getNode().cache().filters(this.filters)
          .pixelSize(25)
          .blurRadius(25)
          .levels(0.5)
          .noise(0.7)
      })
    }
  }
}
</script>
