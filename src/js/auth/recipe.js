import { supabase } from "../main";

const user_recipe = document.getElementById("user_recipe");
const fileInput = document.getElementById("imageInput");
const notification = document.getElementById("notification");

user_recipe.onsubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    const formData = new FormData(user_recipe);
    const file = fileInput.files[0];
    let imageUrl = null;

    if (file) {
        // Get the recipe name and sanitize it for use in the file name
        const recName = formData.get("rec_name").replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const newFileName = `${recName}`;

        // Upload file to Supabase bucket with sanitized recipe name
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('recipe-img')
            .upload(`public/${newFileName}`, file);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            notification.textContent = 'Error uploading file.';
            notification.classList.remove('d-none');
            return;
        }

        // Get the URL of the uploaded file
        imageUrl = supabase.storage.from('recipe-img').getPublicUrl(`public/${newFileName}`).data.publicUrl;
    }

    // Insert form data into Supabase table
    const { data, error } = await supabase
        .from('recipe')
        .insert([
            {
                rec_name: formData.get("rec_name"),
                user_name: formData.get("user_name"),
                date_cre: formData.get("date_cre"),
                categ: formData.get("categ"),
                ingredients: formData.get("ingredients"),
                instruction: formData.get("instruction"),
                image_url: imageUrl  // Add image URL to the data
            },
        ])
        .select();

    if (error == null) {
        notification.textContent = 'Recipe submitted successfully.';
        notification.classList.remove('d-none');
    } else {
        notification.textContent = 'Something went wrong. Cannot register recipe.';
        notification.classList.remove('d-none');
        console.log(error);
    }

    user_recipe.reset();
    fileInput.value = '';  // Clear file input
};
