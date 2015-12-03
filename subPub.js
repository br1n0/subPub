'use strict';
app.factory("SubPub", function ($rootScope)
{
	//the idea came from http://becausejavascript.com/angularjs-pubsub-implementation-with-a-service/

	var aChannel= {}

	//for subscribe, parameter: callback and channelName (optionally)
    function fSubscribe (fn ,sChannel )
    {
		if(!sChannel)
			sChannel= "globalEvent"

		aChannel[sChannel]=sChannel

        var unregisterCb=  $rootScope.$on( "SubPub."+sChannel ,function (e, data)
        {
            fn(data);
        });

        return unregisterCb
    }


    // for pubilsh on a channel, parameter: data and Name of channel
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


    //return an object of channels, defined k->k
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