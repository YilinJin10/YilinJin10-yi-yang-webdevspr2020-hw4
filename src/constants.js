const constants = {
    brandedPrefix: "https://morning-scrubland-17060.herokuapp.com/branded/",
    unbrandedPrefix: "https://morning-scrubland-17060.herokuapp.com/unbranded/",
    brandedEdit: "https://morning-scrubland-17060.herokuapp.com/edit/branded/",
    unbrandedEdit: "https://morning-scrubland-17060.herokuapp.com/edit/unbranded/",
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