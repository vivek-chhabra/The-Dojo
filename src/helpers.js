import "./helpers.css";

function randNum(max, min = 0) {
    let rand = Math.floor(Math.random() * (max + 1 - min)) + min;
    return rand;
}

function displayFlex(boolean) {
    return boolean ? { display: "flex" } : { display: "none" };
}

function randBool() {
    return randNum(1) == 1 ? true : false;
}

// this method takes a string and returns a capitalized version of the string
function capitalize(string) {
    let newStr = "";
    string
        .split(" ")
        .map((ele) => {
            ele.split("");
            return ele.replace(ele.charAt(0), ele.charAt(0).toUpperCase()).replace(ele.slice(1), ele.slice(1).toLowerCase());
        })
        .forEach((ele) => {
            newStr += " " + ele;
        });
    return newStr.trim();
}

function ErrorMsg({ error }) {
    return (
        <div className="alert error alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

export { randNum, displayFlex, randBool, capitalize, ErrorMsg };
