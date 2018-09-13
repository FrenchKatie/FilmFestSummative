console.log("JS is loaded into the page");

$.ajax({
    url: 'http://192.168.33.10:3000/',
    type: 'GET',
    dataType: 'json',
    success:function(data){
        console.log(data);
    },
    error:function(error){
        console.log('ERROR');
        console.log(error);
    }
})
