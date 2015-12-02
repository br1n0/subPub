
/*
'use strict';
var angularPubSub = angular.module('PubSubModule', []);
angularPubSub.provider('pubSub', function () {

*/

app.factory("SubPub", function ($rootScope)
//angularSubPub.factory("SubPub", function ($rootScope)
{
	//thanks to http://becausejavascript.com/angularjs-pubsub-implementation-with-a-service/

	var aChannel= {}

	//bisogna fare subscribe sia piu semplice nel controller 
    function fSubscribe (fn ,desiredEvent )
    {
		if(!desiredEvent)
			desiredEvent= "globalEvent"

		aChannel[desiredEvent]=desiredEvent

        var unregister=  $rootScope.$on("SubPub." +desiredEvent ,function (e, data) {
        	//console.log( "rootScope on" ,e, data ) //e e' l'evento, e.name e' il nome dell'evento
            fn(data);
        });

        return unregister
    }



    function fPublish (data,e)
    {
    	//se manca evento specifico pubblica datii sul canale generico
    	if( !e )
    		e= "globalEvent"

    	if( !aChannel[e] ) 
    	{
    		console.log( "errore nessuno ascolta il canale",e )
    		//return
        }

        $rootScope.$emit("SubPub." +e, data);
    }

    //!!! perche' slice non funzica?
    //ritorna l'elenco dei canali, questo array e' clonato per proteggerlo
	function fGetChannels()
	{
		return JSON.parse(JSON.stringify(aChannel));

		return aChannel //aChannel.slice()
	}

    return {
        subscribe: fSubscribe,
        publish:   fPublish,
        getChannels: fGetChannels

    };
});
