$(document).ready(function(){

    //Creating buttons
    var item;
    var buttons=["cat","dog funny","car funny","funny gifs"];
    var i;
    for (i=0 ;i<buttons.length ;i++){
        $(".buttons").prepend('<button style="margin:0 0 15px 10px;;" id="'+i+'" type="button" class="btn btn-dark gif">' +buttons[i]+ '</button>')
    }

    //function for gif search button
    $(".sgiff").on("click",function(){
    var gif= $("#gifname").val();

    //If empty display alert
    if (gif.trim()=== ""){
        alert("Enter something in the search bar to get results");
        return false;
    }

    //Create buttons for what is typed in the search bar
    buttons.push(gif.trim());
    $(".buttons").prepend('<button style="margin:0 0 15px 10px;;" id="'+i+'" type="button" class="btn btn-dark gif">' +gif.trim() + '</button>')
    $("#gifname").val();
});


    $('.buttons').on('click','.gif',function(){
    $('.results').empty();
    if($(this).text().includes(" ")){
        item = $(this).text().replace(/\s/g,'+');
    } else{
        item = $(this).text();
    }

    //API link 
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + item + '&api_key=dc6zaTOxFJmzC';
    console.log(queryURL);

    //Deploying Ajax function
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(response);
        for(var i =0; i<12; i++){
            $('.results').append('<div class="imgdiv"> <img class="images" alt="true" id="'+i+'"'+'src="' + response.data[i].images.fixed_height_still.url + '"/> <h4 class="text-center">Rating: '+response.data[i].rating+'</h4></div>');
        }

        //Animation pause and play function 
        $('img').click(function(){
            var id = parseInt($(this).attr('id'));
            var alt = $(this).attr('alt');
            if(alt == "true"){
                alt = "false";
                $(this).attr('alt','false');
                x = response.data[id].images.fixed_height.url;
            }
            else{
                alt = "true";
                $(this).attr('alt','true');
                x = response.data[id].images.fixed_height_still.url;
            }
            $(this).attr('src', x);
        });
    



    });
});

});
