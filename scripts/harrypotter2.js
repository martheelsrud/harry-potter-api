(function() {
    
    //HTML object
    var $mainContent;
    var $searchHPBtn;
    var $searchTxt;
    
    //Google Books API
    var harryPotterAPI = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
    
    var init = function(){
        
        //set HTML objects
        var setHTMLObjects = function(){
            $mainContent = $("#mainContent");
            $searchHPBtn = $("#searchHPBtn");
            $searchTxt = $("#searchTxt");
        }(); //end set html objects
        
        //set events
        var setEvents = function(){
            $searchHPBtn.on("click", function(){
                
                var searchTerm = $searchTxt.val();
                getHarryPotterBooks(searchTerm);
            });
        }(); //end set events

    }();
    
    function getHarryPotterBooks(searchTerm){
        
          $.getJSON(harryPotterAPI, {
            tags: searchTerm,
            tagmode: "any",
            format: "json"
        })
            .done(function(feed) {
                $.each(feed.items, function(i, item) {
                var title = item.volumeInfo.title;
                var author = item.volumeInfo.authors;
                var publisher = item.volumeInfo.publisher;
                var description = item.volumeInfo.description;
                var imgUrl = item.volumeInfo.imageLinks.thumbnail;
                
          
                var $newArticle = $("<article>")
                    .addClass("col-md-4 clearfix")
                    
                    .append(
                        $("<u>").html(title).addClass("lead"),
                        $("<img>").attr({src: imgUrl, alt: title}).addClass("img-responsive"),
                        $("<p>").html(author),
                        $("<small>").html(description).addClass("small"),
                        $("<p>").html(publisher)
                    );
                
            
                $("#mainContent").append($newArticle);

      });
    });   
    };
    
})();