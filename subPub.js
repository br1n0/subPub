'use strict';

//Copyright (c) 2015 Bruno Trombi, publishe under The MIT License

app.factory("SubPub", function ($rootScope)
{
	//the idea came from http://becausejavascript.com/angularjs-pubsub-implementation-with-a-service/

	var aChannel= {}

	// for subscribe:     Parameters: callback and channelName (optionally)
    // when there will be new data on sChannel, the CallBack cb will  be called as cb(data)
    function fSubscribe(cb,sChannel)
    {
		if(!sChannel)
			sChannel= "globalEvent"

		aChannel[sChannel]=sChannel

        var unregisterCb=  $rootScope.$on( "SubPub."+sChannel ,function (e, data)
        {
            cb(data);
        });

        return unregisterCb
    }


    // for pubilsh on a channel    Parameters: data and Name of channel
    // it will publish the data on sChannel
    function fPublish (data,sChannel)
    {
    	//if the channel is not specified, the defualt global is setted
    	if( !sChannel )
    		sChannel= "globalEvent"

    	if( !aChannel[sChannel] ) 
    	{
    		console.log( "errorr: nobody is listening! ",sChannel )
        }

        $rootScope.$emit("SubPub." +sChannel, data);
    }


    // return an object of channels, defined k->k
	function fGetChannels()
	{
		return JSON.parse(JSON.stringify(aChannel));
	}


    return {
        subscribe: fSubscribe,
        publish:   fPublish,
        getChannels: fGetChannels
    };
});