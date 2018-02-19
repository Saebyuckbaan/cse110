describe("getFromCurrentUser", function() {
    it("User has logged in and could find username", function() {
        expect(getFromCurrentUser("gender")).toEqual("M");
    });
});


describe("displayCurrentServices", function() {
    it("Display dynamically allocated current service", function() {
        expect(displayCurrentServices()).toEqual(false);
    });
});