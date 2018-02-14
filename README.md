# Dash Gong

## Setup

```
$ npm install
```

Copy config.json.sampl to config.json and update with your info.

Follow the [node-dash-button](https://github.com/hortinstein/node-dash-button) instructions to find your dash-button id.

Add you slack web hook info and giphy key.

run it.

```
$ sudo node index.js
```

or install it globally and run

```
$ cd path/to/dashgong
$ sudo npm install . -g
$ sudo dashgong
```

press your dash button and watch your slack channel.


## Route types.
Dashgong supports a couple different route types via the action setting.

### Slack

```
{
  "name": "myName",
    "id": "da:sh:bu:tt:on:id",
    "action": "gong",
    "slack": {
      "webhook": "https://hooks.slack.com/services/SERVIXEXXX/IDOFSLACKHOOKXXXYYYYZZZZ",
      "channel": "#general",
      "username": "Dash-button",
      "message": "From amazon dash."
    },
    "giphy": {
      "url": "http://api.giphy.com/v1/gifs/search",
      "key": "GIPHYKEYXXX",
      "searchTerms": ["amazon", "dash","button","node"]
    }
}
```



### Posting

Dashgong uses [request](https://github.com/request/request) to post. All post options are past in config via the post section.

```
{
  "name": "Post to a url",
    "id": "da:sh:bu:tt:on:id",
    "action": "post",
    "post": {
      "url": "http://site.com/to/post/to",
      "auth": {
        "user": "username",
        "pass": "password",
        "sendImmediately": false
      },
      "headers": {
        "User-Agent": "request"
      }
    }
}
```


### Sending a text

Dashgong uses [twilio](https://twilio.com) to text, sign up for a aaccount and get your API token and ID

```
{
  "name": "Send a text",
    "id": "da:sh:bu:tt:on:id",
    "action": "text",
    "messages": ["hey, i was sent from a dash button."]
}
```
