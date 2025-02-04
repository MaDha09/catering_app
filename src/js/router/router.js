
function setRouter() {
  switch (window.location.pathname) {
    // If you are logged in you cant access outside pages; redirect to dashboard
    case "/index.html":
      if (localStorage.getItem("access_token")) {
        window.location.pathname = "/login.html";
      }
      break;
    case "/sign.html":
      if (localStorage.getItem("access_token")) {
        window.location.pathname = "/login.html";
      }
      break;

    // If you are not logged in you cant access dashboard pages; redirect to /

    case "/login.html":
      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;
    case "/profile.html":
      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;
    case "/rec.html":
      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;
    case "/recipe.html": // add more case if there are more pages
      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;

    //   // For Admin Users only; redirect to /dashboard
    //   case "/users.html": // Change this to a page where admin has access; add more case if there are more pages
    //     if (localStorage.getItem("role") != "Admin") {
    //       window.location.pathname = "/login.html";
    //     }
    //     break;

    default:
      break;
  }
}

export { setRouter };
