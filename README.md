# subPub

This is a simple channel based publish subscribe, that relay on Angular, 
that provide a publish subscribe mechanism, but only from parent and childeren 
this overcome implementing the publish subscribe paradigm.
Is simple extend it to implement content type filtering.


The Api provides just:
publish 
subscribe
getChannels

subscribe return a function to unsubscribed the channel, like angular whath do,
don't forget to free resources, otherwise you got memory leaks.

Because the order of execution matter, when you publish on channel where are no lister
a message in console is given to prevent typing error or execution order error.

The demo show how publish to global channel, with specific channel, 
and how deSubscrbe/freed a channel


-------

```javascript
	//HOW SUBSCRIBE a channel
	// pass the function used to process the data, and optionally the channel name

	// subscribe channel B, with aggiorna function
	// so any data recived on channel, will be passed to aggiorna
	var channelBUnsubscribe= SubPub.subscribe( aggiorna, "B" )

	// subscribe the default shared channel, with aggiorna function
	// so any data recived on channel, will be passed to aggiorna
	var channelSharedUnsubscribe=  SubPub.subscribe( aggiorna )
```


-------

```javascript
	//HOW  UnSUBSCRIBE a channel

	//just fire the function that was returned when you subscribed a channel
	var channelSharedUnsubscribe()
```