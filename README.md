# gulp-sample
#### Commands
```sh
$ gulp
```
or
```sh
$ gulp serve
```
The development command compiles _.scss_ files into one _.css_ file, transpiles and bundles _.js_ files into single one. Runs _browser-sync_ and watches for changes in _.html_, _.scss_ and _.js_ files.
```sh
$ gulp build
```
The deploy command takes _.html_, _.css_ and _.js_ files and places them in _/dist_ directory. Additionally optimizes image (_.jpg_, _.jpeg_, _.png_, _.svg_, _.gif_) files.
___
#### Setting up new project
```sh
$ git clone https://github.com/lajtof/gulp-sample.git
$ cd gulp-sample
$ rm -rf .git
$ npm i
$ git init
```
