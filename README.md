## Main Technologies/Concepts
#### - Angular DI
#### - RXJS
#### - Reactive Programming
***
## About
Trying to use a pure reactive approach, this project seeks to solve two very common problems we encounter when managing a collection of data retrieved from the backend. Those are:
### Checkbox Filter List
A full loaded list that needs to be filtered in memory. This was achieved by combining three streams of observables together and some very handy RXJS operators.
### Infinity Scroll List
A list loaded page by page as the scroll reaches the bottom of the window. This was achieved by combining a stream connected to the scroll event and another connected to the mocked backend service. Also, it uses the Angular DI system in a way any backend service could integrate with the infinity scroll list stream.
***
## Run
### Docker command:
```
docker run --name angular-native-reactive-approach --rm --network host -it -w /usr/src/app -v ${PWD}/:/usr/src/app node:18 bash
```
### Angular commands:
```
npm install
```
```
npm run start
```
### See the result at:
[http://localhost:4200/](http://localhost:4200/)
