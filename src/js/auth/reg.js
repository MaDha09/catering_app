import { supabase, successNotification, errorNotification } from "../main";


const user_form = document.getElementById("user_form");

user_form.onsubmit = async (e) => {
    e.preventDefault();

    // Disable the submit Button
    document.querySelector("#user_form button").disabled = true;
    document.querySelector(
        "#user_form button"
    ).innerHTML = `<div class="spinner-border me-2" role="status">
                    </div>
                    <span>Loading...</span>`;


    const formData = new FormData(user_form);



    if (formData.get("password") == formData.get("conf")) {

        const { data, error } = await supabase.auth.signUp({
            email: formData.get("email"),
            password: formData.get("password"),
        })


        let user_id = data.user.id;


        if (user_id != null) {


            const { data, error } = await supabase
                .from('users_table')
                .insert([
                    {
                        fname: formData.get("fname"),
                        lname: formData.get("lname"),
                        email: formData.get("email"),
                        password: formData.get("password"),
                        user_id: user_id,
                    },
                ])
                .select();

            if (error == null) successNotification("Registered successfully <a href='./index.html'>Click to Login!</a>", 20);
            else {
                errorNotification("Something wrong happened. Cannot register account", 10);
                console.log(error);
            }



            user_form.reset();

            // Enable Submit Button
            document.querySelector("#user_form button").disabled = false;
            document.querySelector("#user_form button").innerHTML = `Signup Now`;
        }

    }
    else {
        errorNotification("Password does not match.", 10);
    }

};  