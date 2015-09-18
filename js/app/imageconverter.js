/**
 * Created by Damian Simon Peter on 9/17/2015.
 */


var ImageConverter = {

    fetchImg: function(){

        if(localStorage.img) {

            var span = document.createElement('span');
            span.innerHTML += ['<img class="thumb" src="', localStorage.img,
                '" title="test"/>'].join('');

            document.getElementById('list').insertBefore(span, null);

        }
    },


    onFileUpload:function(){

        document.getElementById('files').addEventListener('change', this.handleFileSelect, false);

    },
    handleFileSelect:function(evt) {

        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    var span = document.createElement('span');
                    span.innerHTML = ['<img class="thumb" src="', e.target.result,
                        '" title="', escape(theFile.name), '"/>'].join('');

                    document.getElementById('list').insertBefore(span, null);
                    localStorage.setItem('img', e.target.result);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }


};
//Uncomment to taste!
//ImageConverter.fetchImg();
//ImageConverter.onFileUpload();
//ImageConverter.handleFileSelect(evt);