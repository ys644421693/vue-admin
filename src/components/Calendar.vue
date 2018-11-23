<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
        <li class="year-month" @click="pickYear(currentYear,currentMonth)">
          <span class="choose-year">{{ currentYear }}</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="font-weight: bold;text-decoration-line: underline">六</li>
      <li style="font-weight: bold;text-decoration-line: underline">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li @click="pick(day.date)" v-for="day in days" :key="day.id">
        <!--本月-->
        <span v-if="day.date.getMonth()+1 != currentMonth" class="other-month">{{ day.date.getDate() }}</span>
        <span v-else>
          <!--今天-->
          <span v-if="day.date.getFullYear() == new Date().getFullYear() && day.date.getMonth() == new Date().getMonth() && day.date.getDate() == new Date().getDate()" class="active">{{ day.date.getDate() }}</span>
          <span v-else>{{ day.date.getDate() }}</span>
        </span>
         <br/>
         <br/>
        <span v-if="day.date.getMonth()+1 != currentMonth" class="other-month">{{ day.lunar }}</span>
        <span v-else class="lunarStyle" >{{day.lunar}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {dateToLunar} from '../util/lunar'
export default {
  name: 'Calendar',
  data: function () {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: []
    }
  },
  created: function () {
    this.initData(null)
  },
  methods: {
    initData: function (cur) {
      var date
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
        date = new Date(this.formatDate(date.getFullYear(), date.getMonth() + 1, 1))
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay() // 1...6,0

      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      this.days.length = 0
      var obj
      // 今天是周日，放在第一行第7个位置，前面6个
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str)
        d.setDate(d.getDate() - i)
        var lunarDt = dateToLunar(d)
        obj = {'date': d, 'lunar': lunarDt[2] === 1 ? lunarDt[5] : lunarDt[6]}
        this.days.push(obj)
      }
      for (i = 1; i <= 35 - this.currentWeek; i++) {
        d = new Date(str)
        d.setDate(d.getDate() + i)
        lunarDt = dateToLunar(d)
        obj = {'date': d, 'lunar': lunarDt[2] === 1 ? lunarDt[5] : lunarDt[6]}
        this.days.push(obj)
      }
    },
    pick: function (date) {
      console.log(dateToLunar(date))
      alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    },
    pickPre: function (year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear: function (year, month) {
      alert(year + ',' + month)
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function (year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  body {
    font-family: Verdana, sans-serif;
    background: #E8F0F3;
  }

  #calendar {
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .month {
    width: 100%;
    background: #00B8EC;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }

  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }

  .arrow {
    padding: 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    color: #000;
    font-size: 12px;
  }

  .days li .active {
    padding: 10px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }

  .days li:hover {
    background: #e1e1e1;
  }
  .lunarStyle{
    font-size: 6px;
    color: #909399;
  }
</style>
