# FilesFromYou

This repository contains code for an Electron client application under the directory _client-app/_, an Angular web application and a Node express server.

The Angular web application is accessible using the following url: https://hive-files-from-you.herokuapp.com/

![client](/imgs/client-app.png)

The client application simulates file transfer to another client and reports measurements to the Node express server.

![web-app](/imgs/web-app.png)

The web application lists all transfers and visualizes the cpu usage for each client involved in a file transfer.

## System Architecture

![system](/imgs/system.png)

## Prerequisites

Install the following npm packages.

`npm install @angular/cli -g`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
