<template>
    <div  class="AlarmText marquee" >
        <span  id="alarmText">{{text}}</span>
    </div>
</template>

<script>
//    clickable target="_blank" для q-item
import { defineComponent } from 'vue';
// import { serverMessageTry } from 'src/fun/websocket/websocket.js';

export default defineComponent({
  name: 'AlarmText',
  data() {
    return {
      text: '',
    };
  },
  props: {
    alarms: String,
  },
  mounted() {
    this.text = this.alarms;
  },
  watch: {
    // alarms: {
    //   handler(val) {
    //     if (val) {
    //       this.text = `Внимание!!!  ${val}`;
    //     }
    //   },
    //   deep: true,
    // },
    alarms() {
      this.text = this.alarms;
    },
  },
});
</script>
<style>
.AlarmText{
    color: red;
    font-size: x-large;
}
.marquee {

    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
}

.marquee span {
    display: inline-block;
    padding-left: 100%;
    text-indent: 0;
    animation: marquee 15s linear infinite;
}

.marquee span:hover {
    animation-play-state: paused
}

@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}
</style>
