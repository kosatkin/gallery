var Gallery = function(options){
    this.settings = $.extend(true, {}, {
        containerId : null,
        url : '/board/index/list',
        template : ''

    }, options || {});

    this.init();
};

Gallery.prototype.dirStack = [];
Gallery.prototype.settings = {};

Gallery.prototype.init = function(){
    this.load();
};

Gallery.prototype.load = function() {
    var self = this;

    $.ajax({
        url : this.getRequestUrl(),
        method : "GET"
    })
        .success(function(response) {
            if(typeof response.status != "undefined") {
                if(response.status == 'OK') {
                    self.render(response.data);
                }
            }
        })
        .fail(function(){
            alert('Request failed');
        })
};

Gallery.prototype.render = function(data) {
    var self = this;
    var window_width = $(window).width() - 80;
    var max_col = Math.floor(window_width/210);
    var offset_left = Math.floor((window_width - 210*max_col + 80) / 2);
    var col = [];
    var margin = 10;

    var container = $('#' + this.settings.containerId);
    container.html('');

    for(var i = 0; i < data.length; i++) {
        var row = data[i];
        if(row.path == null) continue;

        var el = $(this.settings.template);
        el.find('.title').text(row.filename);

        if(row.isDir) {
            el.bind('click', {dir : row.filename}, function(event) {
                event.preventDefault();
                self.dirStack.push(event.data.dir);

                // loading folder
                self.load();
            });
        } else {
            el.find('.image img').attr(
                "src", row.path
            );
            el.find('.property').text('Size: '+row.size);
        }

        container.append(el);

        var el_height=el.height();
        var min_t = 0;
        for(var j = 0; j < max_col; j++ ) {
            if (typeof col[j] == "undefined") {
                col.push(0);
                min_t = j;
                break;
            }

            if (col[min_t] > col[j])
                min_t = j;
        }

        el.css({
            "position" : "absolute",
            "top" : col[min_t] + margin,
            "left" : min_t*el.width() + margin*min_t + offset_left
        });

        col[min_t] += el_height + margin;
    }
};

Gallery.prototype.getRequestUrl = function() {
    return this.settings.url + '/?path=' + this.dirStack.join('/');
};