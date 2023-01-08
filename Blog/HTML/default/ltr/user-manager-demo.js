const LOCAL_URL = "http://localhost:8080/admin/";

function run123() {
    showListUsers();
}


function showListUsers() {
    $.ajax({
        type: "GET",
        url: LOCAL_URL,
        success: function (data) {

            let count = 1;
            let content = `<thead>
                                    <tr>
                                        <th class="checkbox-column text-center"> Record Id </th>
                                        <th class="align-center">Avatar</th>
                                        <th>Full name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone number</th>
                                        <th>Role</th>
                                        <th class="align-center">Status</th>
                                    </tr>
                                    </thead>`
            $('#customer-info-detail-3 tbody').empty();
            $.each(data.content, (i, user) => {
                let html = user.status ? `<span class="shadow-none badge badge-success">${user.status}</span>` : `<span class="shadow-none badge badge-danger">${user.status}</span>`
                let userRow = `<tr>
        <td class="checkbox-column text-center"> ${count++} </td>
        <td class="align-center">
            <span><img src="assets/img/90x90.jpg" class="" alt="profile"></span>
        </td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.role.name}</td>
        <td class="align-center">
            <button style="background-color: transparent; border: none" onclick="setStatus(${user.id})">` + html + `</button>
        </td>
    </tr>`;
                $('#customer-info-detail-3 tbody').append(userRow);
            })

            //         for(let i =0; i <data.content.length; i++) {
            //             content += `<tr>
            //     <td class="checkbox-column text-center">${count++}</td>
            //      <td class="align-center">
            //          <span><img src="assets/img/90x90.jpg" class="" alt="profile"></span>
            //      </td>
            //      <td>${data.content[i].name}</td>
            //      <td>${data.content[i].username}</td>
            //      <td>${data.content[i].email}</td>
            //      <td>${data.content[i].phoneNumber}</td>
            //      <td>${data.content[i].role.name}</td>
            //     <td class="align-center">
            //          <button style="background-color: transparent; border: none" onclick="setStatus(${data.content[i].id})"></button>
            //      </td>
            // </tr>`
            //         }
            //
            //         $('#customer-info-detail-3').html(content);

            drawDT();
        }
    })
    // Event.preventDefault();
}

function setStatus(id) {
    $.ajax({
        type: "POST",
        url: LOCAL_URL + id,
        success: function () {
            location.reload();
            // showListUsers();
            // showListUsers();
        }
    })
    // Event.preventDefault();
}


function drawDT() {
    var c3 = $('#customer-info-detail-3').DataTable({
        serverSide: false,
        paging: true,
        "lengthMenu": [2, 10, 20, 50, 100],
        "language": {
            "paginate": {
                "previous": "<i class='flaticon-arrow-left-1'></i>",
                "next": "<i class='flaticon-arrow-right'></i>"
            },
            "info": "Showing page _PAGE_ of _PAGES_"
        },
        retrieve: true,
    });
    multiCheck(c3);
}