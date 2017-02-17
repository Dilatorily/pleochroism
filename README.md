# Pleochroism
[![Stories in Ready](https://badge.waffle.io/Dilatorily/pleochroism.svg?label=ready&title=Ready)](http://waffle.io/Dilatorily/pleochroism)
[![Build Status](https://travis-ci.org/Dilatorily/pleochroism.svg?branch=master)](https://travis-ci.org/Dilatorily/pleochroism) [![codecov](https://codecov.io/gh/Dilatorily/pleochroism/branch/master/graph/badge.svg)](https://codecov.io/gh/Dilatorily/pleochroism)

A cross-platform music player made with :heart:

## Features
- Works with all of your music files
- Automatically identifies your song and completes its metadata using [MusicBrainz](https://musicbrainz.org)
- Manages your library and your custom playlists
- Supports media keys
- Integrates seamlessly with your OS
- Scrobbles to [Last.fm](https://www.last.fm)

## Installing Pleochroism
Use the installers for your operating system located *~~here~~*. *Available soon!*

## Building Pleochroism
Make sure that [NPM](https://www.npmjs.com) and [Yarn](https://yarnpkg.com) are installed on your system.

1. Clone the project `git clone https://github.com/Dilatorily/pleochroism.git && cd pleochroism`.
2. Install the dependencies using `yarn`.
3. Build the application using `yarn run build`.

It should build the executable for every available platforms.

## Developing Pleochroism
To develop Pleochroism, the `yarn start` command will start an Electron process and a server process located at [http://0.0.0.0:8080](http://0.0.0.0:8080).

The renderer process will have hot-reloading enabled using [react-hot-loader](https://github.com/gaearon/react-hot-loader/tree/next), and the developer console will be available. [Devtron](http://electron.atom.io/devtron), [React Developer Tools](https://github.com/facebook/react-devtools) and [Redux DevTools](https://github.com/gaearon/redux-devtools) are installed in the developer console.

## Contributing
Contributions through pull requests are always welcome, no matter how large or small. Unit tests are appreciated!

## [License](LICENSE)
This repository is open source and distributed under the MIT License.
