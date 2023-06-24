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

// to remove the specific element from the array
function removeEle(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

// to replace the specific element from the array
function replaceEle(array, index, element) {
    return [...array.slice(0, index), element, ...array.slice(index + 1)];
}

function ErrorMsg({ error }) {
    return (
        <div className="alert error alert-danger alert-dismissible fade show" role="alert">
            <strong>Error : </strong>
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

function SuccessMsg({ msg }) {
    return (
        <div className="alert success alert-success alert-dismissible fade show" role="alert">
            <strong>Woohoo!</strong>, {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

function PrimaryMsg({ msg }) {
    return (
        <div className="alert primary alert-primary alert-dismissible fade show" role="alert">
            <strong>Loading...</strong>, {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

export { randNum, displayFlex, randBool, capitalize, ErrorMsg, SuccessMsg, PrimaryMsg, removeEle, replaceEle };
