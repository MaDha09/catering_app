import { supabase, successNotification, errorNotification, doLogout } from "../main";

const btn_logout = document.getElementById("btn_logout");

// Assign Logout Functionality
btn_logout.onclick = doLogout;

// const form_items =document.getElementById("form_items");

// form_items.onsubmit = async (e) => {
//     e.preventDefault();
//     alert("HELLO");
// };