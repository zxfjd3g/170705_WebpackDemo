import $ from 'jquery'
import {cube} from './js/math'
import lessons from './assets/json/lessons.json'
import './assets/css/style.css'

console.log(cube(3))

$(() => {
  const $app = $('#app')
  const $ul = $('<ul>')
  lessons.forEach(lesson => {
    $ul.append(`<li>课程名: <span class="lesson-name">${lesson.name}</span>, 时间: ${lesson.days}天</li>`)
  })
  $app.append($ul)
})