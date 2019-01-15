# Demo Aplestro App Backend

Each app in Aplestro ecosystem should serve under https. Use [Aplestro Tunnel](https://github.com/aplestro/TunnelClient) for this purpose

## use ##

```
npm i

```

You need to add a new app to Aplestro in the [Developer console](https://aplestro.com/developer). You need to obtain "YourAppId" and "YourAppAuthKey"

![](http://about.aplestro.com/content/new-app1-in-list.png)

Put the values to /src/configs

```
const APLESTRO_APP_ID = "YourAppId";
const APLESTRO_SECRET_ID = "YourAppAuthKey";

```

If you don't use Aplestro Tunnel you may change "thisURL" to your own domain.

run the Demo App

```
node app.js
```

Now the Demo App is ready to open in Aplestro. Or it is available on http://localhost:3101

## License ##
MIT
