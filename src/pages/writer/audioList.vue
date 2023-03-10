<template>
  <div class="q-pa-md main-wrapper">
    <div class="datefilter_box">
      <q-btn color="primary" @click="calender = true" :label="
        dateRange?.from
          ? dateRange.from + ' to ' + dateRange.to
          : dateRange ?? 'Select Date'
      " />
      <q-btn v-if="dateRange" @click="clearFilter" icon="la la-times" />
    </div>
    <q-infinite-scroll @load="onLoadAudioList" :offset="250" scroll-target="body" ref="scrollList">
      <q-card class="q-pa-lg" v-if="audioList.length !== 0">
        <div class="audio_list_head">
          <div class="col1">
            <div class="td_col1">Audio Name</div>
            <div class="td_col2">Patient Name</div>
            <div class="td_col3">Hospital Name</div>
          </div>
          <div class="col2">Action</div>
        </div>
        <div class="audio_list_body">
          <div class="audio_list_bg caption" v-for="item in audioList" :key="item">
            <div class="audio_list_item">
              <div class="audio_list_col1">
                <div class="audioplayer_col">
                  <span class="play_icon"><i class="las la-play"></i></span>
                  <div class="audio_info">
                    <p class="audio_heading">{{ item.audio_name }}</p>
                    <div class="audio_meta">
                      <ul class="audio_meta_list">
                        <li>
                          Duration: <b>{{ item.audio_duration }}</b>
                        </li>
                        <li>
                          Created at: <b>{{ date.formatDate(item.created_at, 'DD-MM-YYYY') }}</b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="audo_patient_name">
                    <p><b>{{ item.patient_name }}</b></p>

                  </div>
                  <div class="audo_hospital_name">
                    <p>{{ item.hospital_name }}</p>
                  </div>
                </div>
              </div>
              <div class="audio_list_action">
                <q-btn v-if="item.name == 'Published'" round color="primary" icon="las la-download" class="q-ml-sm"
                  padding="sm" @click="downloadPDF(item)" />
                <q-btn v-if="item.name == 'Confirmed'" color="green" label="Publish" class="q-ml-sm"
                  @click="publishAudio(item)" />
                <q-btn round color="secondary" icon="las la-edit" class="q-ml-sm" padding="sm"
                  :disable="item.name !== 'Pending'" @click="setTranscription(item)" />
              </div>
            </div>
          </div>
        </div>
      </q-card>
      <q-card class="q-pa-lg" v-else-if="!loading">
        <div class="text-center">
          <q-btn class="not_found_icon" outline color="primary">
            <i class="las la-exclamation-triangle"></i>
          </q-btn>
          <h5>Data Not Found</h5>
        </div>
      </q-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>


  </div>
  <!-- style="display: none" -->
  <div style="display: none">
    <pdfComponent v-if="showPDF" :items="pdfData" id="downloadPDF" />
  </div>
  <q-dialog v-model="calender">
    <q-date v-model="dateRange" range>
      <q-btn label="Submit" @click="selectDate" v-close-popup type="submit" color="primary" />
    </q-date>
  </q-dialog>
</template>

<script setup>
import AudioPlayer from "vue3-audio-player";
import api from "src/apis/index";
import { TRANSCRIPTION, DOCTOR } from "src/apis/constant";
import { ref, computed, defineAsyncComponent } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useWriterStore } from "src/stores/writer";
import { Loading, QSpinnerGears, date, LocalStorage } from "quasar";
import moment from "moment";
import html2pdf from "html2pdf.js";

const pdfComponent = defineAsyncComponent(() =>
  import("src/components/dowloadPDF.vue")
);
const router = useRouter();
const route = useRoute();
const showPDF = ref(false);
const pdfData = ref([]);
const calender = ref(false);
const dateRange = ref(null);
const store = useWriterStore();

Loading.show({
  spinner: QSpinnerGears,
  message: "Loading...",
});
const audioList = computed(() => store.getAudioList)
const scrollList = ref(null);
const currentPage = ref(1);
const limit = ref(6);
const loading = ref(true);

function fetchAudio() {
  const data = {
    from_date: dateRange.value?.from,
    to_date: dateRange.value?.to,
    limit: limit.value,
    page: currentPage.value,
    userId: route.params.slug.split('/')[0],
    statusId: route.params.slug.split('/')[1]
  };
  return store.fetchAudioList(data)
}
function onLoadAudioList(index, done) {
  fetchAudio().then((res) => {
    if (res.success && res.data.data.length > 0) {
      currentPage.value = currentPage.value + 1;
      done();
    } else {
      loading.value = false;
      done(true);
    }
  }).catch((err) => {
    done(true);
  }).finally(() => {
    Loading.hide();
  });
}
function setTranscription(item) {
  store.draft = item.draft;
  store.data = item;
  LocalStorage.set("data", item);
  router.push({ name: "write-script", params: { slug: item.id } });
}

function publishAudio(item) {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  api
    .post(api.resolveApiUrl(TRANSCRIPTION.SAVE, { id: item.id }), {
      status_id: "4",
    })
    .then((res) => {

      audioList.value.forEach((element, index, object) => {
        if (element.id == item.id) {
          element.name = "Published";
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      Loading.hide();
    });
}

async function downloadPDF(res) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  showPDF.value = true;
  fetchPdf(res);
}

async function fetchPdf(res) {
  pdfData.value.push(res);
  setTimeout(() => {
    exportToPDF(document.getElementById("downloadPDF"));
    Loading.hide();
  }, 4000);
}

function exportToPDF(data) {
  html2pdf(data, {
    margin: 0,
    filename: `${pdfData.value[0].patient_name}_${date.formatDate(pdfData.value[0].date_of_service, 'DD-MM-YYYY')}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  });
}

function selectDate() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  currentPage.value = 1;
  loading.value = true;
  store.audioList = []
  onLoadAudioList()
}
function clearFilter() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  dateRange.value = null;
  store.audioList = []
  currentPage.value = 1;
  loading.value = true;
  scrollList.value.reset();
  scrollList.value.resume();
  scrollList.value.trigger();
}

onBeforeRouteLeave((to, from, next) => {
  console.log("leave");
  store.resetList()
  next();
});
</script>

<style lang="scss">
@import "vue3-audio-player/dist/style.css";

h3.comman-title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 33px;
  padding-top: 20px;
}

.audio_list_item {
  background: $white;
  border: 1px solid #ccc;
  padding: $value-15;
  margin-bottom: $value-10;
  border-radius: $value-15;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.audio_list_col1 {
  display: flex;

  .play_btn {
    flex: 0 0 auto;
  }

  .audio_name {
    .name {
      margin: 0;
      font-weight: 500;
      color: #2398c8;
    }

    .time {
      color: #666;
    }
  }
}

.audio_list_col1 {
  width: 70%;
}

.audioplayer_col {
  width: 100%;
  display: flex;

  .audio__player {
    flex-direction: column;
    align-items: flex-start;

    .audio__player-play-and-title {
      flex: 0 0 auto;

      .audio__player-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 600px;
      }

      .audio__player-play>img {
        width: $value-50;
        height: $value-50;
        display: none;
      }

      .audio__player-play-icon {
        top: $value-0;
        left: $value-0;
        background: $blue;
      }

      .audio__player-play-icon>img {
        width: $value-20;
        height: $value-20;
      }

      .audio__player-title {
        padding-left: $value-50;
      }
    }

    .audio__player-progress-container {
      padding-left: 54px;
      position: relative;
      align-items: center;
      margin-top: $value-5;
      flex-direction: row;
    }

    .audio__player-time {
      flex: 0 0 auto;
      padding-left: 10px;
      margin: 0;

      span {
        font-weight: 500;
        color: #666;
      }
    }

    .audio__player-progress-wrap {
      width: 100%;
      margin: 0;

      .audio__player-progress-point {
        box-shadow: none !important;
      }
    }
  }

  .play_icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #5d9ebc;
    display: inline-flex;
    color: #fff;
    font-size: 22px;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }

  .audio_info {
    width: 42%;
    padding-left: 15px;

    .audio_meta_list {
      margin: 0;
      padding: 0;
      list-style-type: none;

      li {
        display: inline-flex;
        font-size: 12px;
        color: #454545;
        margin-right: $value-10;

        b {
          padding-left: 2px;
        }
      }
    }

  }
}

.not_found_icon {
  padding: 0;
  margin-bottom: 20px;

  i {
    font-size: 60px;
  }

  &:before {
    height: 80px;
    border-radius: 50%;
    width: 80px;
    border-width: 2px;
  }

  .q-btn__content {
    padding: 10px 0 0 11px;
  }
}

.audo_patient_name {
  padding-left: 58px;

  display: flex;
  align-items: center;
  min-width: 150px;

  p {
    margin: 0;
    text-transform: capitalize;
  }
}

.audio_heading {
  margin-bottom: 0;
}

.datefilter_box {
  margin-bottom: 15px;
  margin-top: 10px;
  text-align: right;
}

.audio_list_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #32667e;

  .col1 {
    display: flex;
    width: 80%;

    .td_col1 {
      width: 44%;
    }

    .td_col3 {
      padding-left: 60px;
    }
  }

  .col2 {
    width: 14%;
    text-align: center;
  }
}

.audo_hospital_name {
  padding-left: 56px;

  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
}
</style>
