import { supabase, successNotification, errorNotification } from "../main";

const user_login = document.getElementById("user_login");


user_login.onsubmit = async (e) => {
    e.preventDefault();

    // Disable the submit Button
    document.querySelector("#user_login button").disabled = true;
    document.querySelector(
        "#user_login button"
    ).innerHTML = `<div class="spinner-border me-2" role="status">
                 </div>
                 <span>Loading...</span>`;

    const formData = new FormData(user_login);


    let { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    let session = data.session;
    let user = data.user;
    console.log(session);


    if (session != null) {

        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("refresh_token", session.refresh_token);


        // let { data: users_table, error } = await supabase
        //    .from('users_table')
        //    .select('*')
        //     .eq('user_id', 'user_id');

        //   console.log(users_table);
        // localStorage.setItem("role", users_table.role);

    }

    if (error == null) {
        successNotification("Login successfully!");
        window.location.pathname = '/login.html';
    }
    else {
        errorNotification("Something wrong happened. Cannot login account", 10);
        console.log(error);
    }


    user_login.reset();

    // Enable Submit Button
    document.querySelector("#user_login button").disabled = false;
    document.querySelector("#user_login button").innerHTML = `LogIn`;

    // window.location.pathname = '/login.html';
};
