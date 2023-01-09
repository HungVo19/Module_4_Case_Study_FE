function startPostBlogPage() {
    // ClassicEditor
    //     .create(document.querySelector('#your-message'))
    //     .catch(error => {
    //         console.error(error);
    //     });

    // let editor;

    ClassicEditor
        .create( document.querySelector( '#your-message' ) )
        .then( newEditor => {
            editor = newEditor;
        } )
        .catch( error => {
            console.error( error );
        } );

    $("#alerttt").hide();

    let date = new Date().toDateString();
    $("#date").val(date);
}

let editor;



function getValueToCreateBog() {
    let privacy = true;
    if ($("input[name='privacy']:checked").val() === "false") {
        privacy = false;
    }

    let userId = sessionStorage.getItem("userId");
    let title = $("#title").val();
    let description = $("#description").val();
    let content = editor.getData();
    let newBlog = {
        title: title,
        description: description,
        image: "",
        privacy: privacy,
        content: content,
       user: {
            id: userId
       }
    };
    let formData =new FormData;
    formData.append("file", $("#imageee")[0].files[0]);
    formData.append("blog", new Blob([JSON.stringify(newBlog)],
        {type:'application/json'}))

    $.ajax({
        header:{

        },
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/blogs",
        data: formData,
        success: function (data) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
        }
    })
    event.preventDefault();
}

