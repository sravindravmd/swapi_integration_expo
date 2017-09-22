#The Star Wars API integration


## Installation

All required packages are marked in "package.json" file
and same locked with yarn.lock file.

Use below command to install all dependency packages.

```bash
npm install
or
yarn 
```
##Features.

Below mentioned feature are implemented in this application using `Start Wars API's`.

1) User Login.

    Both `username` and `password` is required to authenticate user. `username ` is case insensitive.
        
2) Search Planets.
    1. Search functionality implemented using `swapi api` with search field `name` 
    2. Search is triggered every key entry and search is limited to 15 times/min, except user `Luke Skywalker`.   
    3. Search results are displayed using React native `<FlatList />` component.
    4. `Animating` component of planet with larger population.
3) Custom Components are created with `ES6  JSX Syntax` and using both `state` and `stateless` pattrens . 
4) `Redux` used for managing data madel.
5) `React-native-router-flux` used for app Routing and mapped to Redux-actions.