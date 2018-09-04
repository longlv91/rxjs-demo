import $ from 'jquery';
import { fromEvent, from, Observable, of, interval, timer, range, merge, concat } from 'rxjs';
import { filter, map, takeUntil, catchError, take, pluck,/*, merge*/ 
mergeMap,
switchMap} from 'rxjs/operators';


const btn = $('#btn');
const input = $('#input');
const output = $('#output');
const postsEle = $('#posts');
const btnStream = fromEvent(btn, 'click');
/* Observables From Events */
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

const inputStream = fromEvent(input, 'keyup');

let sub = inputStream.subscribe(
  event => {
    output.html('<h1>' + event.target.value + '</h1>');
  },
  error => {
    console.log(error);
  },
  () => {
    console.log('Completed');
  }
)

/* Observables From Arrays */

const numbers = [33, 44, 55, 66, 77];

const numberStream = from(numbers);

numberStream.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

const posts = [
  {title: 'Post One', body: 'This is the body'},
  {title: 'Post Two', body: 'This is the body'},
  {title: 'Post Three', body: 'This is the body'}
];

const postStream = from(posts);
postStream
.pipe(
      takeUntil(btnStream),
      filter(item => item.title.indexOf('Two') !== -1),// Operator filter
      map(item => { // Operator map
        item.body = "This is custom body";
        return item;
      }))
.subscribe(
  post => {
    postsEle.append('<li>' + post.title + '</li>');
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

const set = new Set(['Hello', 44, {title: 'My Title'}]);

const set$ = from(set);
set$.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

/* Observables From Scratch */
const source$ = new Observable(observer => {
  console.log('Creating an Observable');

  observer.next('Hello World');

  observer.next("Another value");

  observer.error(new Error('Something went wrong'));

  setTimeout(() => {
    observer.next('A new value');
    observer.complete();
  },3000);
})

source$
.pipe(catchError(error => {
    return of(error);
  })
)
.subscribe(
  value => {
    console.log(value);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

/* Observables From A Promise */

const myPromise = new Promise((resolve, reject) => {
  console.log('Creating Promise');
  setTimeout(() => {
    resolve('Hello from promise');
  }, 3000);
})

const myPromise$ = from(myPromise);

myPromise$.subscribe(
  v => {
    console.log(v);
  }
)

/* Interval, Timer,& Range */
/*const interval$ = interval(1000);

interval$
.pipe(
  take(5)
)
.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

const timer$ = timer(5000, 2000);

timer$
.pipe(
  take(5)
)
.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)


const range$ = range(25, 100);

range$.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)
*/
/* Map & Pluck */

/*const map$ = interval(1000);

map$
.pipe(
  take(10),
  map(v => v * 2)
)
.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

const name$ = from(['John', 'Tom', 'Shawn']);

name$
.pipe(
  map(v => v.toUpperCase()),
  map(v => 'I am ' + v)
)
.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)

const pluck$ = from([
  {name: 'John', age: 8, child: {name: 'Dave'}},
  {name: 'Tom', age: 9},
  {name: 'Shawn', age: 10}]);

pluck$
.pipe(
  pluck('name')
)
.subscribe(
  v => {
    console.log(v);
  },
  error => {
    console.log(error);
  },
  complete => {
    console.log('Completed');
  }
)
*/

/* Merge and Concat */
/*
of('Hello')
.pipe(
  merge(of('Everyone'))
)
.subscribe(
  v => {
    console.log(v);
  }
)

const source1$ = interval(2000).pipe(
  map(v => 'Merge 1: ' + v)
)

const source2$ = interval(500).pipe(
  map(v => 'Merge 2: ' + v)
)

merge(source1$, source2$)
.pipe(take(10))
.subscribe(
  v => console.log(v)
)

const source3$ = range(0, 5).pipe(
  map(v => 'Source 3: ' + v)
)

const source4$ = range(6, 5).pipe(
  map(v => 'Source 4: ' + v)
)

concat(source3$, source4$)
.subscribe(
  v => console.log(v)
)
*/

/* MergeMap & SwitchMap */
of('Hello')
.pipe(
  mergeMap(v => {
    return of(v + ' Everyone');
  })
)
.subscribe(
  v => console.log(v)
)

inputStream
.pipe(
  map(e => e.target.value),
  switchMap(v => {
    console.log(v);
    return from(myPromise);
  })
)
.subscribe(
  v => {
    postsEle.append('<h1>' + v + '</h1>');
  }
)