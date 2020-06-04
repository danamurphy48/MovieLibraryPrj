(function($){ //this isn't useful? can delete and (jQuery)
    function processForm( e ){
        var dict = {    //grabbing stuff from object dict, then stringify object into JSON @data, like appending/putting data in the body of the request like we do in postman
            Title : this["title"].value,
            Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict), //only have to do that for post and put
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                console.log("Movie added!");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm ); //jQuery go look at this. .submit is an event listener waiting for this to be clicked
})(jQuery);

function getAllMovies(){
    //console.log("Clicked"); use to test that it works - shows up in html and is clickable check inspect page
    //good search terms ajax get methods
    //as soon as this ajax runs it's going to make a request to the api
    //if api runs successfully status 200 then runs success
    //otherwise 
    $("#displayMovieData").html(""); //doesn't allow it to continuually multiply itself
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        contentType: 'application/json', 
        type: 'get',
       // data: //when doing a get request, you don't need a data part
        success: function( data, textStatus, jQxhr ){ 
           // $('#response pre').html( data );
            //test using console.log
            console.log("Success!");
            console.log(data);
            for( let i = 0; i <data.length; i++){
            $("#displayMovieData").append(`<tr> <input value=${i+1} type="hidden" id="movieId" />
            <td> <input type="text" value="${data[i]["title"]}" id="editTitle" /></td>
            <td> <input type="text" value= "${data[i]["genre"]}" id="editGenre" /></td> 
            <td> <input type="text" value= "${data[i]["director"]}"id="editDirector" /></td> </tr>`)



            }                            // $("#displayMoviesDiv").append(`<p>${data[0]["director"]}</p>`) would just get one director
  //we want to use a literal... something  //.val would overwrite everything
        },                                                                  //bc data is an array need to loop, for loop
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function getSingleMovie(){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + movieId,
        contentType: 'application/json', 
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            console.log("Change a movie!");
            $("#displayMovieData").append(`<tr><td>Title: ${data[movieId]["title"]}</td> <td>Genre: ${data[movieId]["genre"]}</td> <td> Director: ${data[movieId]["director"]}</td> </tr>`)
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function editMovie( e ){ 
        var dict = {    //grabbing stuff from object dict, then stringify object into JSON @data, like appending/putting data in the body of the request like we do in postman
            MovieId: document.getElementById("movieId").value,
            Title: document.getElementById("editTitle").value
         //   Genre: this["genre"].val(),
        //	Director: this["director"].val()
        };
 console.log (dict)
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        contentType: 'application/json', 
        type: 'put',
        data: JSON.stringify(dict), //only have to do that for post and put
        success: function( data, textStatus, jQxhr ){
            console.log("Edit a movie!");
            $('#response pre').html( data );
            $("#displayMovieData").append(`<tr> <td>Title: ${data[movieId]["title"]}</td> <td>Genre: ${data[movieId]["genre"]}</td> <td>Director: ${data[movieId]["director"]}</td></tr>`)
              $("#editTitle").val();
        
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    e.preventDefault();
}
    $('#my-Idform').submit( editMovie ); 






    //Notes from code along
   // function jqDemo(){
    //    let valueOfInput = $("#demoInput").val(); //use # to get an id
     //   console.log(valueOfInput);
    
       // $("demoInput").val("Mia") //how to change what is put in the value, put it in quotes in the value
    //}
    
    //$("demoInput").change(function() {  //event listener is working you just have to click out of the input area
    //    console.log($("demoInput").val());  //please listen to this "demoInput" and if it changes then do this. Event listener.
   // });
