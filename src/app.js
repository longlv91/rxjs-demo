import $ from 'jquery';
import { fromEvent } from 'rxjs';


const btn = $('#btn');
const btnStream = fromEvent(btn, 'click');

btnStream.subscribe(
  event => {
    console.log("click");
  },
  error => {
    conole.log(error);
  },
  () => {
    console.log("Completed");
  }
)
