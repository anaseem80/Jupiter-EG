<template lang="">
    <div class="container">
        <div class="row">
        <div class="col-md-12 text-center">
            <div class="section-title">
                <h2 class="ec-bg-title">New Arrivals</h2>
                <h2 class="ec-title">Are you ready to play?</h2>
                <p class="sub-title">Just press on press button and collect your prize!</p>
            </div>
        </div>
    </div>
    </div>
    <div class="position-relative d-flex justify-content-center">
    <div class="lucky-wheel">
      <div class="pointer-container">
        <!-- pointer -->
        <div class="pointer" ref="pointer" id="pointer" :style="{'transform':rotate_deg,'transition': prize_transition}" @click="rotateHandler(num)">
        </div>
      </div>
      <!-- lucky wheel -->
      <div :class="containerClass">
        <div v-for="(item,index) in wheelpoints" :key="item" ref="item" :class="itemClass">
          <div :class="contentClass">
            
            <span>
              <span :class="countClass">{{item.points}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    
      <!-- display results -->
      <transition name="slide-fade">
        <div class="prize" v-if="isShow==isClicked">
          <div class="prize-container">
            <div class="prize-title">WELL<br/> DONE!</div>
            <div class="prize-title">YOU GET A FREE...<br/>
              <span class="prize-item">{{prize_name}}</span>
            </div>
            <div class="prize-background">
              <template v-for="(prizeIcon,index) in 9">
                <i class="material-icons">
                  {{prize_icon}}
                </i>
              </template>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return{
            prizes: [],
            prizes_2017: [],
            prizes_2018: [],
            prize_name: "",
            prize_icon: "",
            prize_rotate: [],
            prize_transition: "",
            each_deg: 0,
            rotate_deg: 0,
            start_deg: 0,
            current_deg: 0,
            index: 0,
            current_year: 2017,
            duration: 3000,
            time_remaining: 20,
            num: 0,
            numbers: [], //紀錄還有獎品的編號
            isToggle: false, //顯示隱藏按鈕
            isClicked: false, //轉動中禁止觸發
            isShow: true
        }
    },
    mounted() {
      this.fetchGetWheelPoints();
      let vm = this;
      vm.initPrize();
    },
    watch: {
      current_year: {
        handler: "restart"
      }
    },
    computed: {
      ...mapState(['wheelpoints']),
      // 判斷轉盤 class
      containerClass() {
        let vm = this;
        return vm.current_year === 2017
          ? "container"
          : "container container-large";
      },
      itemClass() {
        let vm = this;
        return vm.current_year === 2017
          ? "item item-skew"
          : "item item-skew-large";
      },
      contentClass() {
        let vm = this;
        return vm.current_year === 2017
          ? "item-content"
          : "item-content item-content-large";
      },
      countClass() {
        let vm = this;
        return vm.current_year === 2017 ? "count" : "count count-large";
      }
    },
    methods: {
        ...mapActions(['GetWheelPoints']),
        async fetchGetWheelPoints() {
            await this.GetWheelPoints();
        },
      prizeActive(index) {
        let vm = this;
        setTimeout(() => {
            console.log(vm.itemClass)
            index.classList.value = `${vm.itemClass} active`;
        }, vm.duration);
      },

      initPrize() {
        let vm = this;
        vm.prizes_2017 = [
          {
            name: "Wish",
            icon: "cake",
            count: 5
          },
          {
            name: "Anything",
            icon: "stars",
            count: 5
          },
          {
            name: "Child",
            icon: "child_care",
            count: 4
          },
          {
            name: "Flight",
            icon: " flight",
            count: 1
          },
          {
            name: "Wifi",
            icon: "wifi",
            count: 5
          },
          {
            name: "Movie",
            icon: "movie_filter",
            count: 0
          }
        ];
        vm.num = this.wheelpoints.length;
        vm.degree(vm.num);
        vm.prizes = this.wheelpoints;
        vm.numberArray();
      },
      
      degree(num) {
        // 計算每個轉盤角度
        let vm = this;
        for (let i = 1; i <= num; i++) {
          let deg = 360 / num;
          vm.each_deg = deg;
          let eachDeg;
          eachDeg = i * deg;
          vm.prize_rotate.push(eachDeg);
        }
      },
      numberArray() {
        // 產生獎品 index 編號 => [0,1,2,3,4,5]
        let vm = this;
        vm.numbers = vm.prizes.map((prize, index) => {
          return index;
        });
      },
      rotateHandler(num) {
        let vm = this;
        // 刪去沒有獎品的 index
        vm.prizes.filter((prize, index) => {
          let filterArray;
          if (prize.count <= 0) {
            let filterArray = vm.numbers.filter((num) => {
              return num !== index;
            });
            vm.numbers = filterArray;
          }
        });

        if (vm.time_remaining > 0) {
          vm.$refs.item[vm.index].classList.value = vm.itemClass;
          // 執行旋轉
          vm.prize_draw(num);
        } else if (vm.time_remaining <= 0) {
          vm.$refs.item[vm.index].classList.value = vm.itemClass;
          vm.restart();
        }
      },
      prize_draw(num) {
        // 執行抽獎
        let vm = this;
        if (vm.isClicked) return;
        vm.isShow = vm.isClicked;

        // 取出 0-5之間隨機整數
        vm.index = vm.numbers[Math.floor(Math.random() * vm.numbers.length)];
        console.log("1.剩餘牌號", vm.numbers);

        // 預先旋轉四圈
        let circle = 4;
        let degree;
        //degree=初始角度 + 旋轉4圈 + 獎品旋轉角度[隨機數] - 餘數
        degree =
          vm.start_deg +
          circle * 360 +
          vm.prize_rotate[vm.index] -
          (vm.start_deg % 360);

        // 將初始角度 start_deg:0度 = 旋轉後的角度 degree，下次執行從當下角度開始
        vm.start_deg = degree;
        //綁定旋轉角度到指針
        vm.current_year === 2017
          ? (vm.rotate_deg = `rotate(${degree}deg)`)
          : (vm.rotate_deg = `rotate(${degree - vm.each_deg / 2}deg)`);

        vm.prize_transition = `all ${
          vm.duration / 1000
        }s cubic-bezier(0.42, 0, 0.2, 0.91)`;
        vm.time_remaining--;
        vm.isClicked = true;

        // 取當下開始角度的餘數，與輪盤角度比對(除錯用)
        let remainder = vm.start_deg % 360;
        if (remainder <= 0) {
          // 為了不產生負數或0，加360
          vm.current_year === 2017
            ? (vm.current_deg = remainder + 360)
            : (vm.current_deg = remainder + 360 - vm.each_deg / 2);
        } else if (remainder > 0) {
          vm.current_year === 2017
            ? (vm.current_deg = remainder)
            : (vm.current_deg = remainder - vm.each_deg / 2);
        }
        console.log("2.執行旋轉", degree, "index", vm.index);
        // 將vm.index設為抽中獎品索引數，獎品抽完的索引數將不再出現，直到獎品全數抽完，重新 RESET
        let prize = vm.prizes[vm.index];
        vm.prize_name = prize.points;
        setTimeout(() => {
            this.$store.dispatch('WheelUpdateUserPoint', prize.points)
        }, vm.duration);
        if (vm.current_year === 2018) {
          vm.prize_icon = "card_giftcard";
        }
        // vm.prizeActive(vm.$refs.item[vm.index]);
  
        setTimeout(() => {
          prize.count--;
          console.log(
            "3.旋轉角度:",
            vm.current_deg,
            "獎品:",
            prize.name,
            "剩餘數量:",
            prize.count,
            " index",
            vm.index
          );
        }, vm.duration);

        // 點選動畫結束後，將"已點選"改回"未點選"
        setTimeout(() => {
          if (vm.isClicked === true) {
            vm.isClicked = false;
          }
        }, vm.duration);
      }
    }
}
</script>
<style lang="css">

.toggle {
  display: flex;
  background-image: url("https://raw.githubusercontent.com/HuiyuLiz/vue-lucky-wheel/306abe15b78c71c3cd25ed8eaf97554101fd405e/svg/toggle.svg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100px;
  height: 120px;
  position: absolute;
  left: calc;
  top: -3%;
  transition: all 0.3s ease-in;
  filter: drop-shadow(-3px 5px 0px #343baa);
  cursor: pointer;
}
.toggle:hover {
  transform: rotate(360deg) scale(0.8);
}

.game-status {
  position: absolute;
  left: 2%;
  top: 4%;
  font-size: 2rem;
  color: #f0beff;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  margin: 0 auto;
  flex-direction: column-reverse;
  font-weight: 700;
  text-transform: uppercase;
  width: 250px;
  height: 600px;
}

button:focus {
  outline: 0;
}

.times {
  font-size: 2.5rem;
  line-height: 0.9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0px;
  position: relative;
  color: #1f1172;
}
.times::after {
  position: absolute;
  content: "x";
  font-size: 2.3rem;
  font-weight: normal;
  left: 150px;
  top: 3px;
  color: #f0beff;
}
.times > span {
  text-align: right;
  color: #1f1172;
  margin-left: 40px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


.lucky-wheel {
  display: flex;
  width: 550px;
  height: 550px;
  border-radius: 550px;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.lucky-wheel::after {
  content: "";
  width: 540px;
  height: 549px;
  background-image: url("https://raw.githubusercontent.com/HuiyuLiz/vue-lucky-wheel/306abe15b78c71c3cd25ed8eaf97554101fd405e/svg/wheel-outside.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
}
.lucky-wheel .container {
  display: block;
  width: 520px;
  height: 520px;
  border-radius: 520px;
  overflow: hidden;
  position: relative;
  transform: rotate(-30deg);
}
.lucky-wheel .container.container-large {
  transform: rotate(-18deg);
}

.pointer-container {
  display: flex;
  width: 128px;
  height: 208px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: absolute;
  color: #ff00ba;
  font-size: 2rem;
}
.pointer-container::after {
  display: block;
  content: "PRESS";
  width: 120px;
  height: 120px;
  border-radius: 120px;
  background-color: #1f1172;
  line-height: 120px;
  text-align: center;
  font-weight: bold;
}
.pointer-container .pointer {
  width: 128px;
  height: 208px;
  display: block;
  background-image: url("https://raw.githubusercontent.com/HuiyuLiz/vue-lucky-wheel/306abe15b78c71c3cd25ed8eaf97554101fd405e/svg/hand.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 39.7px;
  transform-origin: 64px 144px;
  cursor: pointer;
}

.item {
  position: absolute;
  display: flex;
  width: 50%;
  height: 50%;
  border: 1px solid #1f1172;
  top: 0;
  right: 0;
  transform-origin: 0% 100%;
  justify-content: center;
  align-items: center;
}

.item-skew:nth-child(1) {
  transform: rotate(60deg) skewY(-30deg);
}

.item-skew:nth-child(2) {
  transform: rotate(120deg) skewY(-30deg);
}

.item-skew:nth-child(3) {
  transform: rotate(180deg) skewY(-30deg);
}

.item-skew:nth-child(4) {
  transform: rotate(240deg) skewY(-30deg);
}

.item-skew:nth-child(5) {
  transform: rotate(300deg) skewY(-30deg);
}

.item-skew:nth-child(6) {
  transform: rotate(360deg) skewY(-30deg);
}

.item-skew-large:nth-child(1) {
  transform: rotate(18deg) skewY(-72deg);
}

.item-skew-large:nth-child(2) {
  transform: rotate(36deg) skewY(-72deg);
}

.item-skew-large:nth-child(3) {
  transform: rotate(54deg) skewY(-72deg);
}

.item-skew-large:nth-child(4) {
  transform: rotate(72deg) skewY(-72deg);
}

.item-skew-large:nth-child(5) {
  transform: rotate(90deg) skewY(-72deg);
}

.item-skew-large:nth-child(6) {
  transform: rotate(108deg) skewY(-72deg);
}

.item-skew-large:nth-child(7) {
  transform: rotate(126deg) skewY(-72deg);
}

.item-skew-large:nth-child(8) {
  transform: rotate(144deg) skewY(-72deg);
}

.item-skew-large:nth-child(9) {
  transform: rotate(162deg) skewY(-72deg);
}

.item-skew-large:nth-child(10) {
  transform: rotate(180deg) skewY(-72deg);
}

.item-skew-large:nth-child(11) {
  transform: rotate(198deg) skewY(-72deg);
}

.item-skew-large:nth-child(12) {
  transform: rotate(216deg) skewY(-72deg);
}

.item-skew-large:nth-child(13) {
  transform: rotate(234deg) skewY(-72deg);
}

.item-skew-large:nth-child(14) {
  transform: rotate(252deg) skewY(-72deg);
}

.item-skew-large:nth-child(15) {
  transform: rotate(270deg) skewY(-72deg);
}

.item-skew-large:nth-child(16) {
  transform: rotate(288deg) skewY(-72deg);
}

.item-skew-large:nth-child(17) {
  transform: rotate(306deg) skewY(-72deg);
}

.item-skew-large:nth-child(18) {
  transform: rotate(324deg) skewY(-72deg);
}

.item-skew-large:nth-child(19) {
  transform: rotate(342deg) skewY(-72deg);
}

.item-skew-large:nth-child(20) {
  transform: rotate(360deg) skewY(-72deg);
}

.item-content {
  display: flex;
  width: 100px;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: bold;
  transform-origin: center center;
  transform: skewY(30deg) rotate(30deg) translate(-95px, 62px);
  position: absolute;
  right: 0;
  bottom: 0;
}
.item-content.item-content-large {
  transform: skewY(72deg) rotate(9deg) translate(-22px, -10px);
  position: absolute;
  left: 0;
  top: 200px;
}
.item-content .count {
  position: absolute;
  left: 12px;
  top: -47px;
  font-size: 1.2rem;
  text-align: center;
  width: 45px;
  line-height: 25px;
  border-radius: 30px;
  display: block;
}
.item-content .count.count-large {
  left: 39px;
  top: 40px;
  font-size: 1rem;
  width: 25px;
  line-height: 25px;
  border-radius: 25px;
}
.item-content > i {
  font-size: 4rem;
}

.item:nth-child(odd) {
  background-color: #343baa;
}
.item:nth-child(odd) .item-content {
  color: #f0beff;
}
.item:nth-child(odd) .count {
  color: #343baa;
  background-color: #f0beff;
}

.item:nth-child(even) {
  background-color: #f0beff;
}
.item:nth-child(even) .item-content {
  color: #343baa;
}
.item:nth-child(even) .count {
  color: #f0beff;
  background-color: #343baa;
}

.item.active {
  background-color: #ff00ba;
  transition: 0.2s ease-in;
}
.item.active .item-content {
  color: white;
  transition: 0.2s ease-in;
}

.prize {
  display: flex;
  position: absolute;
  width: 100%;
  height: 237px;
  background-color: #343baa;
  overflow: hidden;
  z-index: -5;
  top: 97px;
}
.prize .prize-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  margin: 0 auto;
  position: relative;
}
.prize .prize-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  height: 157px;
  font-size: 72px;
  color: white;
  font-weight: bold;
  padding-left: 11%;
  z-index: 999;
}
.prize .prize-title:nth-child(2) {
  width: 26%;
  padding-left: 0px;
  font-size: 32px;
}
.prize .prize-item {
  font-size: 72px;
  color: #ff00ba;
  text-decoration: underline;
}

.prize-background {
  width: 1280px;
  height: 237px;
  position: absolute;
}
.prize-background i {
  font-size: 4rem;
  color: #22299b;
  position: absolute;
}
.prize-background i:nth-child(1) {
  bottom: 30px;
  left: -40px;
  transform: rotate(0deg);
}
.prize-background i:nth-child(2) {
  top: 40px;
  left: 30px;
  transform: rotate(20deg);
}
.prize-background i:nth-child(3) {
  bottom: -40px;
  left: 130px;
  transform: rotate(-20deg);
}
.prize-background i:nth-child(4) {
  top: -25px;
  left: 270px;
  transform: rotate(-30deg);
}
.prize-background i:nth-child(5) {
  bottom: 20px;
  left: 340px;
  transform: rotate(0deg);
}
.prize-background i:nth-child(6) {
  top: -20px;
  right: 300px;
  transform: rotate(0deg);
}
.prize-background i:nth-child(7) {
  bottom: -35px;
  right: 260px;
  transform: rotate(40deg);
}
.prize-background i:nth-child(8) {
  bottom: 35px;
  right: 50px;
  transform: rotate(-20deg);
}
.prize-background i:nth-child(9) {
  top: 10px;
  right: -25px;
  transform: rotate(20deg);
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 0.2s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 0.4s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 0.6s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 0.8s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 1s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 1.2s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 1.4s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 1.6s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

.prize-background i:nth-child(odd) {
  animation: move 3s alternate infinite ease-in-out;
  animation-delay: 1.8s;
}

.prize-background i:nth-child(even) {
  animation: move 2s alternate-reverse infinite ease-in-out;
}

@keyframes move {
  10% {
    transform: rotate(8deg) scale(0.8);
  }
  20% {
    transform: rotate(8deg) scale(0.8);
  }
  30% {
    transform: rotate(8deg) scale(0.8);
  }
  40% {
    transform: rotate(7deg) scale(0.8);
  }
  50% {
    transform: rotate(2deg) scale(0.8);
  }
  60% {
    transform: rotate(7deg) scale(0.8);
  }
  70% {
    transform: rotate(2deg) scale(0.8);
  }
  80% {
    transform: rotate(6deg) scale(0.8);
  }
  90% {
    transform: rotate(5deg) scale(0.8);
  }
}
.slide-fade-enter-active {
  transition: all 1s ease;
  transition-delay: 2s s;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@media(min-width:992px){
    .prize{
        height: 277px;
    }
}
@media(max-width: 992px) {
    .lucky-wheel{
        transform: scale(1);
    }
    .prize .prize-title{
        font-size: 28px;
    }
    .prize .prize-title:nth-child(2){
        font-size: 22px;
    }
    .prize-item{
        font-size: 31px !important;
    }
}
@media(max-width: 776px) {
    .lucky-wheel{
        transform: scale(.44);
    }
}
</style>