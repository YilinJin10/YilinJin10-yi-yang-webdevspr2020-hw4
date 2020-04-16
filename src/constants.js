const constants = {
    brandedPrefix: "http://localhost:3000/branded/",
    unbrandedPrefix: "http://localhost:3000/unbranded/",
    brandedEdit: "http://localhost:3000/edit/branded/",
    unbrandedEdit: "http://localhost:3000/edit/unbranded/",
    brandExits: "this brand has existed, please input a new one",
    validate : function (myURL) {
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(myURL);
    },
    checkKeyExits: function (key) {
        if (key === 'not found') {
            // alert("invalid brand")
            return true;
        }
        return false;
    }
}

export default constants