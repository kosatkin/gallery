/**
 * Created by STAS on 23.11.13.
 */

$(document).ready(function(){

    var gallery = new Gallery({
        containerId : 'item-container',
        template : '<div class="image-item">' +
                   '<div class="image"><img src="/" width="100%" /></div>' +
                   '<div class="title"></div>' +
                   '<div class="property"></div>' +
                   '</div>'
    });

//    var template = '<div class="image-item">' +
//                   '<div class="image"><img src="/" width="100%" /></div>' +
//                   '<div class="title"></div>' +
//                   '<div class="property"></div>' +
//                   '</div>';
//
//    $.ajax({
//        url: "/board/index/list",
//        type: "GET",
//        dataType: "json"
//    }).success(function(response) {
//            if(typeof response.status != "undefined") {
//                if(response.status == 'OK') {
//                    var window_width = $(window).width() - 80;
//                    var max_col = Math.floor(window_width/210);
//                    var offset_left = Math.floor((window_width - 210*max_col + 80) / 2);
//                    var col = [];
//                    var margin = 10;
//
//                    for(var i = 0; i < response.data.length; i++) {
//
//                        var el = $(template);
//
//                        el.find('.image img').attr(
//                            "src", response.data[i].public + response.data[i].filename
//                        );
//
//                        el.find('.title').text(response.data[i].filename);
//                        el.find('.property').text('Size: '+response.data[i].size);
//
//                        el.appendTo('#item-container');
//
//                        var el_height=el.height();
//                        var min_t = 0;
//                        for(var j = 0; j < max_col; j++ ) {
//                            if (typeof col[j] == "undefined") {
//                                col.push(0);
//                                min_t = j;
//                                break;
//                            }
//
//                            if (col[min_t] > col[j])
//                                min_t = j;
//                        }
//
//                        el.css({
//                            "position" : "absolute",
//                            "top" : col[min_t] + margin,
//                            "left" : min_t*el.width() + margin*min_t + offset_left
//                        });
//
//                        col[min_t] += el_height + margin;
//                    }
//                }
//            }
//
//    })
//    .fail(function(response){
//        alert('Request failed');
//    });

});