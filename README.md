# Movies

This is a project aimed to learn and catch up on the latest React development (^16.2) where the hooks are introduced

Also, in this repo, there is a circle ci setup to deploy to github pages where the react app is able to run perfectly without paid hosting

## Getting started

First, clone this repo.

If you are not a yarn user, simply replace the yarn commands with `npm run` instead

### Build
```shell
$> yarn install
$> yarn build
```

This does not create a running application. To have a running application, please see Serve build below

### Develop
```shell
$> yarn install
$> yarn dev
```

Application will be hosted at the default port, `localhost:1234`

### Serve build

This uses docker for zero time development on server to serve the built assets using nginx. Please install docker prior to running this.

```shell
docker run --rm -p 8080:80 -v $PWD/build:/usr/share/nginx/html:ro -d nginx
```

Visit `localhost:8080` to see the application