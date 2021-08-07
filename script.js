function menuVisibility() {

    const contentLink = document.getElementById("contentLink")
    if (contentLink.classList.contains("slidemenu")) {
        contentLink.classList.remove("slidemenu");
        setTimeout(() => {
            contentLink.classList.add("displayNone");
        }, 1100)
    } else if (contentLink.classList.contains("displayNone")) {
        contentLink.classList.add("displayBlock");
        setTimeout(() => {
            contentLink.classList.add("slidemenu");
            contentLink.classList.remove("displayNone");
        }, 10)
    }
    else {
        contentLink.classList.add("slidemenu");
    }
}

